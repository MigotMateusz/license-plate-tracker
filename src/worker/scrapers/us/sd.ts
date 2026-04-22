import { PlateResult } from "../base";

// South Dakota (SD) — personalized plate availability scraper
// Status: NOT YET IMPLEMENTED
// TODO: Find the availability check endpoint at the South Dakota DMV/SOS website,
// reverse-engineer the request in DevTools, then implement similar to FL or TX scraper.

export async function scrapeSD(): Promise<PlateResult[]> {
  console.log("[SD] Scraper not yet implemented");
  return [];
}
