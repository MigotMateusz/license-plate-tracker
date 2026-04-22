import { PlateResult } from "../base";
import { generateCandidates } from "../candidates";

// California DMV — dmv.ca.gov/wasapp/ipp2/
// Multi-step form with session state and CSRF token.
// Requires Playwright — must load the first page to get a valid session cookie
// before submitting the availability check form.
// Status: NOT YET IMPLEMENTED — needs Playwright + session handling.

export async function scrapeCalifornia(): Promise<PlateResult[]> {
  // TODO: implement with Playwright
  // Step 1: GET https://www.dmv.ca.gov/wasapp/ipp2/initPers.do to get session cookie
  // Step 2: POST https://www.dmv.ca.gov/wasapp/ipp2/processPers.do with plate + cookie
  // Response: HTML containing "configuration is not available" or "is available"
  console.log("[CA] Scraper not yet implemented");
  return [];
}
