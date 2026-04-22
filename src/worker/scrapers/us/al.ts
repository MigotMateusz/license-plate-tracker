import { PlateResult } from "../base";

// Alabama (AL) — personalized plate availability scraper
// Status: NOT YET IMPLEMENTED
// TODO: Find the availability check endpoint at the Alabama DMV/SOS website,
// reverse-engineer the request in DevTools, then implement similar to FL or TX scraper.

export async function scrapeAL(): Promise<PlateResult[]> {
  console.log("[AL] Scraper not yet implemented");
  return [];
}
