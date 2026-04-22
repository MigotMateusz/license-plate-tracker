import { PlateResult } from "../base";

// Vermont (VT) — personalized plate availability scraper
// Status: NOT YET IMPLEMENTED
// TODO: Find the availability check endpoint at the Vermont DMV/SOS website,
// reverse-engineer the request in DevTools, then implement similar to FL or TX scraper.

export async function scrapeVT(): Promise<PlateResult[]> {
  console.log("[VT] Scraper not yet implemented");
  return [];
}
