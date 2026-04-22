import { PrismaClient } from "@prisma/client";
import { computeRarityScore, scoreToTier } from "../src/lib/rarity";

const db = new PrismaClient();

const SAMPLE_PLATES = [
  "1", "2", "3", "A", "B", "C",
  "007", "123", "321", "ACE", "VIP", "GOD", "PRO",
  "1234", "ABCD", "BOSS", "FIRE", "GOLD", "KING",
  "12345", "SPEED", "TURBO", "BEAST",
  "AA", "BB", "CC", "AB", "AZ",
  "99", "10", "42", "69", "77",
  "101", "111", "222", "333", "555", "777", "999",
  "ABA", "MOM", "DAD", "LOL", "WOW",
];

async function main() {
  const us = await db.country.upsert({
    where: { code: "US" },
    update: {},
    create: { code: "US", name: "United States", isActive: true },
  });

  console.log(`Seeding ${SAMPLE_PLATES.length} plates...`);

  for (const plate of SAMPLE_PLATES) {
    const score = computeRarityScore(plate);
    const tier = scoreToTier(score);

    await db.availablePlate.upsert({
      where: {
        countryId_stateCode_plateString: {
          countryId: us.id,
          stateCode: "TX",
          plateString: plate.toUpperCase(),
        },
      },
      update: {},
      create: {
        countryId: us.id,
        stateCode: "TX",
        plateString: plate.toUpperCase(),
        rarityScore: score,
        rarityTier: tier,
        isAvailable: true,
      },
    });
  }

  console.log("Seed complete.");
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
