import { PlateResult } from "../base";

// Puerto Rico (PR) — personalized plate availability scraper
// Status: NOT YET IMPLEMENTED
// TODO: Find the availability check endpoint at the Puerto Rico DMV/SOS website,
// reverse-engineer the request in DevTools, then implement similar to FL or TX scraper.

export async function scrapePR(): Promise<PlateResult[]> {
  console.log("[PR] Scraper not yet implemented");
  return [];
}
