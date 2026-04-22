import { PlateResult } from "../base";

// Louisiana (LA) — personalized plate availability scraper
// Status: NOT YET IMPLEMENTED
// TODO: Find the availability check endpoint at the Louisiana DMV/SOS website,
// reverse-engineer the request in DevTools, then implement similar to FL or TX scraper.

export async function scrapeLA(): Promise<PlateResult[]> {
  console.log("[LA] Scraper not yet implemented");
  return [];
}
