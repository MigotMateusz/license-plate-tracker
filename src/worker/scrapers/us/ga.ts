import { PlateResult } from "../base";

// Georgia DOR — drives.ga.gov
// GA offers personalized plate search via their online portal.
// Status: NOT YET IMPLEMENTED — needs endpoint reverse-engineering.

export async function scrapeGeorgia(): Promise<PlateResult[]> {
  // TODO: inspect https://drives.ga.gov in DevTools to find
  // the availability check endpoint, then implement here.
  console.log("[GA] Scraper not yet implemented");
  return [];
}
