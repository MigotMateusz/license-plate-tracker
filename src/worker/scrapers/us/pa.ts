import { PlateResult } from "../base";

// Pennsylvania PennDOT — personalizedplates.pa.gov
// PA has a dedicated personalized plates portal with plate availability search.
// Status: NOT YET IMPLEMENTED — needs endpoint reverse-engineering.

export async function scrapePennsylvania(): Promise<PlateResult[]> {
  // TODO: inspect https://personalizedplates.pa.gov in DevTools to find
  // the availability check endpoint, then implement here.
  console.log("[PA] Scraper not yet implemented");
  return [];
}
