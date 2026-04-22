import { PlateResult } from "../base";

// Virginia (VA) — personalized plate availability scraper
// Status: NOT YET IMPLEMENTED
// TODO: Find the availability check endpoint at the Virginia DMV/SOS website,
// reverse-engineer the request in DevTools, then implement similar to FL or TX scraper.

export async function scrapeVA(): Promise<PlateResult[]> {
  console.log("[VA] Scraper not yet implemented");
  return [];
}
