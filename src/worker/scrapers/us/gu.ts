import { PlateResult } from "../base";

// Guam (GU) — personalized plate availability scraper
// Status: NOT YET IMPLEMENTED
// TODO: Find the availability check endpoint at the Guam DMV/SOS website,
// reverse-engineer the request in DevTools, then implement similar to FL or TX scraper.

export async function scrapeGU(): Promise<PlateResult[]> {
  console.log("[GU] Scraper not yet implemented");
  return [];
}
