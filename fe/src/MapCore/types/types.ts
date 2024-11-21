// Types
export type BusData = {
  lat: number;
  lon: number;
  lines: string;
  vehiclenumber: string;
  time: string;
  brigade: string;
};

export interface Filter<T> {
  filter: (data: T[]) => T[];
}
