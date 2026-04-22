import { PlateResult } from "../base";

// New Jersey (NJ) — personalized plate availability scraper
// Status: NOT YET IMPLEMENTED
// TODO: Find the availability check endpoint at the New Jersey DMV/SOS website,
// reverse-engineer the request in DevTools, then implement similar to FL or TX scraper.

export async function scrapeNJ(): Promise<PlateResult[]> {
  console.log("[NJ] Scraper not yet implemented");
  return [];
}
