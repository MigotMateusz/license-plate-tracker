import { PlateResult } from "../base";

// West Virginia (WV) — personalized plate availability scraper
// Status: NOT YET IMPLEMENTED
// TODO: Find the availability check endpoint at the West Virginia DMV/SOS website,
// reverse-engineer the request in DevTools, then implement similar to FL or TX scraper.

export async function scrapeWV(): Promise<PlateResult[]> {
  console.log("[WV] Scraper not yet implemented");
  return [];
}
