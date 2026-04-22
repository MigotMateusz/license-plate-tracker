import { PlateResult } from "../base";

// Mississippi (MS) — personalized plate availability scraper
// Status: NOT YET IMPLEMENTED
// TODO: Find the availability check endpoint at the Mississippi DMV/SOS website,
// reverse-engineer the request in DevTools, then implement similar to FL or TX scraper.

export async function scrapeMS(): Promise<PlateResult[]> {
  console.log("[MS] Scraper not yet implemented");
  return [];
}
