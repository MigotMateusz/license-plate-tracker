import { PlateResult } from "../base";

// Rhode Island (RI) — personalized plate availability scraper
// Status: NOT YET IMPLEMENTED
// TODO: Find the availability check endpoint at the Rhode Island DMV/SOS website,
// reverse-engineer the request in DevTools, then implement similar to FL or TX scraper.

export async function scrapeRI(): Promise<PlateResult[]> {
  console.log("[RI] Scraper not yet implemented");
  return [];
}
