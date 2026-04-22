import { PlateResult } from "../base";

// Tennessee (TN) — personalized plate availability scraper
// Status: NOT YET IMPLEMENTED
// TODO: Find the availability check endpoint at the Tennessee DMV/SOS website,
// reverse-engineer the request in DevTools, then implement similar to FL or TX scraper.

export async function scrapeTN(): Promise<PlateResult[]> {
  console.log("[TN] Scraper not yet implemented");
  return [];
}
