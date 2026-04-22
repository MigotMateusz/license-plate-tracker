import { PlateResult } from "../base";

// Delaware (DE) — personalized plate availability scraper
// Status: NOT YET IMPLEMENTED
// TODO: Find the availability check endpoint at the Delaware DMV/SOS website,
// reverse-engineer the request in DevTools, then implement similar to FL or TX scraper.

export async function scrapeDE(): Promise<PlateResult[]> {
  console.log("[DE] Scraper not yet implemented");
  return [];
}
