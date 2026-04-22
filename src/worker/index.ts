import { scrapeQueue, startScrapeWorker } from "./jobs/scrape";
import { startNotifyWorker } from "./jobs/notify";

async function main() {
  console.log("Starting workers...");

  startScrapeWorker();
  startNotifyWorker();

  // Schedule US scrape every 6 hours
  await scrapeQueue.add(
    "scrape-us",
    { countryCode: "US" },
    {
      repeat: { every: 6 * 60 * 60 * 1000 },
      jobId: "scrape-us-recurring",
    }
  );

  console.log("Workers running. Scrape scheduled every 6h.");
}

main().catch(console.error);
