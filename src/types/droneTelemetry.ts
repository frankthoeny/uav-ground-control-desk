export const STATUS = {
  IN_FLIGHT: "In Flight",
  RTL: "RTL (Returning)",
  LANDED: "Landed",
  ALERT: "Alert",
} as const;

export type DroneStatus = (typeof STATUS)[keyof typeof STATUS];

export type FlightPath = [number, number][];

export interface DroneTelemetry {
  callsign: string;
  model: string;
  status: DroneStatus;
  battery: number;
  altitude: number;
  airspeed: number;
  lat: number;
  lng: number;
  heading: number;
  flightPath: FlightPath;
  // Communications & perf metrics (mocked)
  rssi?: number; // dBm (negative values)
  latency?: number; // ms
  packetLoss?: number; // percent
}
