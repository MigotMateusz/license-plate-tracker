import { PlateResult } from "../base";

// Ohio BMV — ohiobmv.com
// OH has a personalized plate search at https://www.oplates.com (official vendor).
// Status: NOT YET IMPLEMENTED — needs endpoint reverse-engineering.

export async function scrapeOhio(): Promise<PlateResult[]> {
  // TODO: inspect https://www.oplates.com in DevTools to find
  // the availability check endpoint, then implement here.
  console.log("[OH] Scraper not yet implemented");
  return [];
}
