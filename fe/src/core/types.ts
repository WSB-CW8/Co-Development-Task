import { BasePlugin } from "./interfaces";

export type BusData = {
  lat: number;
  lon: number;
  lines: string;
  vehiclenumber: string;
  time: string;
  brigade: string;
};

export type GetPlugin = <T>(options: T) => BasePlugin;
