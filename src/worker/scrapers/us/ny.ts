import { PlateResult } from "../base";
import { generateCandidates } from "../candidates";

// New York DMV — myDMV portal
// NY offers a custom plate search at https://dmv.ny.gov/plates/personalized-plates
// The availability check uses a fetch-based API call internally.
// Status: NOT YET IMPLEMENTED — needs endpoint reverse-engineering via DevTools.

export async function scrapeNewYork(): Promise<PlateResult[]> {
  // TODO: inspect https://dmv.ny.gov/plates/personalized-plates in DevTools
  // to find the XHR endpoint for availability check, then implement here.
  console.log("[NY] Scraper not yet implemented");
  return [];
}
