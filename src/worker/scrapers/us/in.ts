import { PlateResult } from "../base";

// Indiana (IN) — personalized plate availability scraper
// Status: NOT YET IMPLEMENTED
// TODO: Find the availability check endpoint at the Indiana DMV/SOS website,
// reverse-engineer the request in DevTools, then implement similar to FL or TX scraper.

export async function scrapeIN(): Promise<PlateResult[]> {
  console.log("[IN] Scraper not yet implemented");
  return [];
}
