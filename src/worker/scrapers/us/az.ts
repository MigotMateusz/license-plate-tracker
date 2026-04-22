import { PlateResult } from "../base";

// Arizona (AZ) — personalized plate availability scraper
// Status: NOT YET IMPLEMENTED
// TODO: Find the availability check endpoint at the Arizona DMV/SOS website,
// reverse-engineer the request in DevTools, then implement similar to FL or TX scraper.

export async function scrapeAZ(): Promise<PlateResult[]> {
  console.log("[AZ] Scraper not yet implemented");
  return [];
}
