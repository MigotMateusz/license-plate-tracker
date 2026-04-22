import { PlateResult } from "../base";

// North Carolina DMV — ncdot.gov
// NC has a personalized plate search via their online services portal.
// Status: NOT YET IMPLEMENTED — needs endpoint reverse-engineering.

export async function scrapeNorthCarolina(): Promise<PlateResult[]> {
  // TODO: inspect https://www.ncdot.gov/dmv/title-registration/license-plates/Pages/personalized.aspx
  // in DevTools to find the availability check endpoint, then implement here.
  console.log("[NC] Scraper not yet implemented");
  return [];
}
