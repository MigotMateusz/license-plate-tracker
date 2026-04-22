import { PlateResult } from "../base";

// Utah (UT) — personalized plate availability scraper
// Status: NOT YET IMPLEMENTED
// TODO: Find the availability check endpoint at the Utah DMV/SOS website,
// reverse-engineer the request in DevTools, then implement similar to FL or TX scraper.

export async function scrapeUT(): Promise<PlateResult[]> {
  console.log("[UT] Scraper not yet implemented");
  return [];
}
