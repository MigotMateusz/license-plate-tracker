import { BaseScraper, PlateResult } from "./base";
import { scrapeFlorida } from "./us/fl";
import { scrapeTexas } from "./us/tx";
import { scrapeCalifornia } from "./us/ca";
import { scrapeNewYork } from "./us/ny";
import { scrapeIllinois } from "./us/il";
import { scrapePennsylvania } from "./us/pa";
import { scrapeOhio } from "./us/oh";
import { scrapeGeorgia } from "./us/ga";
import { scrapeNorthCarolina } from "./us/nc";
import { scrapeAL } from "./us/al";
import { scrapeAK } from "./us/ak";
import { scrapeAZ } from "./us/az";
import { scrapeAR } from "./us/ar";
import { scrapeCO } from "./us/co";
import { scrapeCT } from "./us/ct";
import { scrapeDE } from "./us/de";
import { scrapeHI } from "./us/hi";
import { scrapeID } from "./us/id";
import { scrapeIN } from "./us/in";
import { scrapeIA } from "./us/ia";
import { scrapeKS } from "./us/ks";
import { scrapeKY } from "./us/ky";
import { scrapeLA } from "./us/la";
import { scrapeME } from "./us/me";
import { scrapeMD } from "./us/md";
import { scrapeMA } from "./us/ma";
import { scrapeMI } from "./us/mi";
import { scrapeMN } from "./us/mn";
import { scrapeMS } from "./us/ms";
import { scrapeMO } from "./us/mo";
import { scrapeMT } from "./us/mt";
import { scrapeNE } from "./us/ne";
import { scrapeNV } from "./us/nv";
import { scrapeNH } from "./us/nh";
import { scrapeNJ } from "./us/nj";
import { scrapeNM } from "./us/nm";
import { scrapeND } from "./us/nd";
import { scrapeOK } from "./us/ok";
import { scrapeOR } from "./us/or";
import { scrapeRI } from "./us/ri";
import { scrapeSC } from "./us/sc";
import { scrapeSD } from "./us/sd";
import { scrapeTN } from "./us/tn";
import { scrapeUT } from "./us/ut";
import { scrapeVT } from "./us/vt";
import { scrapeVA } from "./us/va";
import { scrapeWA } from "./us/wa";
import { scrapeWV } from "./us/wv";
import { scrapeWI } from "./us/wi";
import { scrapeWY } from "./us/wy";
import { scrapeDC } from "./us/dc";
import { scrapeAS } from "./us/as";
import { scrapeGU } from "./us/gu";
import { scrapeMP } from "./us/mp";
import { scrapePR } from "./us/pr";
import { scrapeVI } from "./us/vi";

const STATE_SCRAPERS: Record<string, () => Promise<PlateResult[]>> = {
  AL: scrapeAL,
  AK: scrapeAK,
  AZ: scrapeAZ,
  AR: scrapeAR,
  CA: scrapeCalifornia,
  CO: scrapeCO,
  CT: scrapeCT,
  DE: scrapeDE,
  FL: scrapeFlorida,
  GA: scrapeGeorgia,
  HI: scrapeHI,
  ID: scrapeID,
  IL: scrapeIllinois,
  IN: scrapeIN,
  IA: scrapeIA,
  KS: scrapeKS,
  KY: scrapeKY,
  LA: scrapeLA,
  ME: scrapeME,
  MD: scrapeMD,
  MA: scrapeMA,
  MI: scrapeMI,
  MN: scrapeMN,
  MS: scrapeMS,
  MO: scrapeMO,
  MT: scrapeMT,
  NE: scrapeNE,
  NV: scrapeNV,
  NH: scrapeNH,
  NJ: scrapeNJ,
  NM: scrapeNM,
  NY: scrapeNewYork,
  NC: scrapeNorthCarolina,
  ND: scrapeND,
  OH: scrapeOhio,
  OK: scrapeOK,
  OR: scrapeOR,
  PA: scrapePennsylvania,
  RI: scrapeRI,
  SC: scrapeSC,
  SD: scrapeSD,
  TN: scrapeTN,
  TX: scrapeTexas,
  UT: scrapeUT,
  VT: scrapeVT,
  VA: scrapeVA,
  WA: scrapeWA,
  WV: scrapeWV,
  WI: scrapeWI,
  WY: scrapeWY,
  DC: scrapeDC,
  AS: scrapeAS,
  GU: scrapeGU,
  MP: scrapeMP,
  PR: scrapePR,
  VI: scrapeVI,
};

export class USScraper extends BaseScraper {
  countryCode = "US";

  async scrape(): Promise<PlateResult[]> {
    const results: PlateResult[] = [];

    for (const [state, scraper] of Object.entries(STATE_SCRAPERS)) {
      try {
        console.log(`[US] Scraping ${state}...`);
        const plates = await scraper();
        console.log(`[US] ${state}: ${plates.length} plates found`);
        results.push(...plates);
      } catch (err) {
        console.error(`[US] ${state} scraper failed:`, (err as Error).message);
      }
    }

    return results;
  }
}
