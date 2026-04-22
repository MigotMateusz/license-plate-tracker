import { PlateResult } from "../base";

// Nevada (NV) — personalized plate availability scraper
// Status: NOT YET IMPLEMENTED
// TODO: Find the availability check endpoint at the Nevada DMV/SOS website,
// reverse-engineer the request in DevTools, then implement similar to FL or TX scraper.

export async function scrapeNV(): Promise<PlateResult[]> {
  console.log("[NV] Scraper not yet implemented");
  return [];
}
