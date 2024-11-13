import { BaseDataFetcher } from "../interfaces";
import { BusData } from "../types";

export class DataFetcher implements BaseDataFetcher<BusData[]> {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async fetchData(path: string): Promise<BusData[]> {
    try {
      const response = await fetch(this.apiUrl + path);
      const data = await response.json();
      return data.result;
    } catch (e) {
      console.error("Failed to fetch data", e);
      throw e;
    }
  }
}
