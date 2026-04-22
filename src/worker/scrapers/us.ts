import { chromium } from "playwright";
import { BaseScraper, PlateResult } from "./base";

// Texas DMV vanity plate search — checks availability of plates
// URL: https://www.txdmv.gov/motorists/license-plates/specialty-license-plates
// Strategy: search for short/rare patterns via the public availability checker

export class USScraper extends BaseScraper {
  countryCode = "US";

  async scrape(): Promise<PlateResult[]> {
    const results: PlateResult[] = [];

    // TX scraper: enumerate rare patterns and check availability
    const txResults = await this.scrapeTX();
    results.push(...txResults);

    return results;
  }

  private async scrapeTX(): Promise<PlateResult[]> {
    const results: PlateResult[] = [];
    const browser = await chromium.launch({ headless: true });

    try {
      const page = await browser.newPage();

      // Generate candidate rare plates to check
      const candidates = this.generateCandidates();

      for (const plate of candidates) {
        try {
          await page.goto(
            `https://www.txdmv.gov/motorists/license-plates/personalized-license-plates`,
            { timeout: 10000 }
          );

          // Find the availability search form
          const input = await page.$('input[name="plateNumber"], input[id*="plate"]');
          if (!input) continue;

          await input.fill(plate);
          await page.keyboard.press("Enter");
          await page.waitForTimeout(1500);

          const available = await page.$('text=available, text=Available');
          if (available) {
            results.push({ plateString: plate, stateCode: "TX" });
          }
        } catch {
          // Skip plates that error out
        }
      }
    } finally {
      await browser.close();
    }

    return results;
  }

  private generateCandidates(): string[] {
    const candidates: string[] = [];

    // Single letters A-Z
    for (let c = 65; c <= 90; c++) {
      candidates.push(String.fromCharCode(c));
    }

    // Single digits 1-9
    for (let i = 1; i <= 9; i++) {
      candidates.push(String(i));
    }

    // Two-letter combinations (AA, AB, etc.) — sample top 50
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 10; j++) {
        candidates.push(letters[i] + letters[j]);
      }
    }

    // Low numbers 1–99
    for (let i = 1; i <= 99; i++) {
      candidates.push(String(i));
    }

    // Sequential patterns
    candidates.push("123", "1234", "12345", "321", "456", "789", "007", "001");

    return [...new Set(candidates)];
  }
}
