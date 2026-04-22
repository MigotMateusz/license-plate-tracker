export interface PlateResult {
  plateString: string;
  stateCode: string;
  category?: string;
}

export abstract class BaseScraper {
  abstract countryCode: string;
  abstract scrape(): Promise<PlateResult[]>;
}
