import { PlateResult } from "../base";

// Kentucky (KY) — personalized plate availability scraper
// Status: NOT YET IMPLEMENTED
// TODO: Find the availability check endpoint at the Kentucky DMV/SOS website,
// reverse-engineer the request in DevTools, then implement similar to FL or TX scraper.

export async function scrapeKY(): Promise<PlateResult[]> {
  console.log("[KY] Scraper not yet implemented");
  return [];
}
