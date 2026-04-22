import { PlateResult } from "../base";

// Idaho (ID) — personalized plate availability scraper
// Status: NOT YET IMPLEMENTED
// TODO: Find the availability check endpoint at the Idaho DMV/SOS website,
// reverse-engineer the request in DevTools, then implement similar to FL or TX scraper.

export async function scrapeID(): Promise<PlateResult[]> {
  console.log("[ID] Scraper not yet implemented");
  return [];
}
