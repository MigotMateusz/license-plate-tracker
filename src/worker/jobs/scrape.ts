import { Queue, Worker, Job } from "bullmq";
import IORedis from "ioredis";
import { db } from "@/lib/db";
import { USScraper } from "../scrapers/us";
import { computeRarityScore, scoreToTier } from "@/lib/rarity";

const connection = new IORedis(process.env.REDIS_URL!, { maxRetriesPerRequest: null });

export const scrapeQueue = new Queue("scrape", { connection });

export function startScrapeWorker() {
  const worker = new Worker(
    "scrape",
    async (job: Job) => {
      const { countryCode } = job.data;

      if (countryCode === "US") {
        await scrapeUS();
      }
    },
    { connection, concurrency: 1 }
  );

  worker.on("failed", (job, err) => {
    console.error(`Scrape job ${job?.id} failed:`, err.message);
  });

  return worker;
}

async function scrapeUS() {
  const country = await db.country.findUnique({ where: { code: "US" } });
  if (!country) throw new Error("US country not seeded");

  const scraper = new USScraper();
  const plates = await scraper.scrape();

  for (const plate of plates) {
    const score = computeRarityScore(plate.plateString);
    const tier = scoreToTier(score);

    await db.availablePlate.upsert({
      where: {
        countryId_stateCode_plateString: {
          countryId: country.id,
          stateCode: plate.stateCode,
          plateString: plate.plateString.toUpperCase(),
        },
      },
      update: { lastSeenAt: new Date(), isAvailable: true },
      create: {
        countryId: country.id,
        stateCode: plate.stateCode,
        plateString: plate.plateString.toUpperCase(),
        rarityScore: score,
        rarityTier: tier,
        category: plate.category,
      },
    });
  }

  await db.country.update({
    where: { id: country.id },
    data: { lastScrapedAt: new Date() },
  });

  // Notify watchers of newly available plates
  await notifyWatchers(country.id, plates.map((p) => p.plateString.toUpperCase()));
}

async function notifyWatchers(countryId: string, plateStrings: string[]) {
  const notifyQueue = new Queue("notify", { connection });

  for (const plateString of plateStrings) {
    const watches = await db.watchedPlate.findMany({
      where: { countryId, plateString },
    });

    for (const watch of watches) {
      await notifyQueue.add("notify-user", {
        userId: watch.userId,
        watchedPlateId: watch.id,
        plateString,
        countryId,
      });
    }
  }
}
