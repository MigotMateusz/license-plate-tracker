import { PlateResult } from "../base";

// Wisconsin (WI) — personalized plate availability scraper
// Status: NOT YET IMPLEMENTED
// TODO: Find the availability check endpoint at the Wisconsin DMV/SOS website,
// reverse-engineer the request in DevTools, then implement similar to FL or TX scraper.

export async function scrapeWI(): Promise<PlateResult[]> {
  console.log("[WI] Scraper not yet implemented");
  return [];
}
