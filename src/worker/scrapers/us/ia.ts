import { PlateResult } from "../base";

// Iowa (IA) — personalized plate availability scraper
// Status: NOT YET IMPLEMENTED
// TODO: Find the availability check endpoint at the Iowa DMV/SOS website,
// reverse-engineer the request in DevTools, then implement similar to FL or TX scraper.

export async function scrapeIA(): Promise<PlateResult[]> {
  console.log("[IA] Scraper not yet implemented");
  return [];
}
