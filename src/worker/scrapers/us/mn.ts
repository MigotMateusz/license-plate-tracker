import { PlateResult } from "../base";

// Minnesota (MN) — personalized plate availability scraper
// Status: NOT YET IMPLEMENTED
// TODO: Find the availability check endpoint at the Minnesota DMV/SOS website,
// reverse-engineer the request in DevTools, then implement similar to FL or TX scraper.

export async function scrapeMN(): Promise<PlateResult[]> {
  console.log("[MN] Scraper not yet implemented");
  return [];
}
