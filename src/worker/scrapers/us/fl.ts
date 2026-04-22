import { PlateResult } from "../base";
import { generateCandidates } from "../candidates";

// Florida HSMV — services.flhsmv.gov/MVCheckWeb/
// Plain HTTP POST form, returns HTML with "AVAILABLE" or "NOT AVAILABLE" text.
// No CAPTCHA on the plate check endpoint. No browser needed.

export async function scrapeFlorida(): Promise<PlateResult[]> {
  const results: PlateResult[] = [];
  const candidates = generateCandidates();

  for (const plate of candidates) {
    try {
      const available = await checkPlateFL(plate);
      if (available) results.push({ plateString: plate, stateCode: "FL" });
      await sleep(300);
    } catch {
      // skip on error
    }
  }

  return results;
}

async function checkPlateFL(plate: string): Promise<boolean> {
  const body = new URLSearchParams({
    plateNumber: plate,
    plateType: "PAS",
    submit: "Check Availability",
  });

  const res = await fetch("https://services.flhsmv.gov/MVCheckWeb/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      Referer: "https://services.flhsmv.gov/MVCheckWeb/",
    },
    body: body.toString(),
  });

  const html = await res.text();
  return html.toLowerCase().includes("is available");
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
