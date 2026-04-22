import { PlateResult } from "../base";

// New Mexico (NM) — personalized plate availability scraper
// Status: NOT YET IMPLEMENTED
// TODO: Find the availability check endpoint at the New Mexico DMV/SOS website,
// reverse-engineer the request in DevTools, then implement similar to FL or TX scraper.

export async function scrapeNM(): Promise<PlateResult[]> {
  console.log("[NM] Scraper not yet implemented");
  return [];
}
