import { PlateResult } from "../base";

// Montana (MT) — personalized plate availability scraper
// Status: NOT YET IMPLEMENTED
// TODO: Find the availability check endpoint at the Montana DMV/SOS website,
// reverse-engineer the request in DevTools, then implement similar to FL or TX scraper.

export async function scrapeMT(): Promise<PlateResult[]> {
  console.log("[MT] Scraper not yet implemented");
  return [];
}
