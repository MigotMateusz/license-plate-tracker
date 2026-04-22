import { PlateResult } from "../base";
import { generateCandidates } from "../candidates";

// Texas — MyPlates.com JSON API
// MyPlates.com is the official TX DMV vendor for personalized plates.
// The search endpoint returns JSON with an `available` boolean. No CAPTCHA.

export async function scrapeTexas(): Promise<PlateResult[]> {
  const results: PlateResult[] = [];
  const candidates = generateCandidates();

  for (const plate of candidates) {
    try {
      const available = await checkPlateTX(plate);
      if (available) results.push({ plateString: plate, stateCode: "TX" });
      await sleep(300);
    } catch {
      // skip on error
    }
  }

  return results;
}

async function checkPlateTX(plate: string): Promise<boolean> {
  const res = await fetch(
    `https://www.myplates.com/api/personalized/passenger/${encodeURIComponent(plate)}/`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        Accept: "application/json",
        Referer: "https://www.myplates.com/design/personalized/passenger/",
      },
    }
  );

  if (!res.ok) return false;
  const data = await res.json();
  return data?.available === true;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
