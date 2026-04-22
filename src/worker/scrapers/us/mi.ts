import { PlateResult } from "../base";

// Michigan (MI) — personalized plate availability scraper
// Status: NOT YET IMPLEMENTED
// TODO: Find the availability check endpoint at the Michigan DMV/SOS website,
// reverse-engineer the request in DevTools, then implement similar to FL or TX scraper.

export async function scrapeMI(): Promise<PlateResult[]> {
  console.log("[MI] Scraper not yet implemented");
  return [];
}
