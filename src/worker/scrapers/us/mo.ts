import { PlateResult } from "../base";

// Missouri (MO) — personalized plate availability scraper
// Status: NOT YET IMPLEMENTED
// TODO: Find the availability check endpoint at the Missouri DMV/SOS website,
// reverse-engineer the request in DevTools, then implement similar to FL or TX scraper.

export async function scrapeMO(): Promise<PlateResult[]> {
  console.log("[MO] Scraper not yet implemented");
  return [];
}
