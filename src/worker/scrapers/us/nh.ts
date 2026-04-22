import { PlateResult } from "../base";

// New Hampshire (NH) — personalized plate availability scraper
// Status: NOT YET IMPLEMENTED
// TODO: Find the availability check endpoint at the New Hampshire DMV/SOS website,
// reverse-engineer the request in DevTools, then implement similar to FL or TX scraper.

export async function scrapeNH(): Promise<PlateResult[]> {
  console.log("[NH] Scraper not yet implemented");
  return [];
}
