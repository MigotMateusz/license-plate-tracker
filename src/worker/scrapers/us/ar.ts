import { PlateResult } from "../base";

// Arkansas (AR) — personalized plate availability scraper
// Status: NOT YET IMPLEMENTED
// TODO: Find the availability check endpoint at the Arkansas DMV/SOS website,
// reverse-engineer the request in DevTools, then implement similar to FL or TX scraper.

export async function scrapeAR(): Promise<PlateResult[]> {
  console.log("[AR] Scraper not yet implemented");
  return [];
}
