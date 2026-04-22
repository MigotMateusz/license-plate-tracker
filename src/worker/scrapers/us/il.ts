import { PlateResult } from "../base";

// Illinois SOS — cyberdriveillinois.com
// IL offers personalized plate search at https://www.cyberdriveillinois.com/departments/vehicles/psnlzd_plates/home.html
// The availability check is a simple form POST with the plate string.
// Status: NOT YET IMPLEMENTED — needs endpoint verification.

export async function scrapeIllinois(): Promise<PlateResult[]> {
  // TODO: verify form action and field names at cyberdriveillinois.com
  // then implement similar to FL scraper (HTTP POST, parse HTML response).
  console.log("[IL] Scraper not yet implemented");
  return [];
}
