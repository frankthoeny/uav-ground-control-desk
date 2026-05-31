import { useState, useEffect } from "react";
import { STATUS } from "../types/droneTelemetry";
import type { DroneTelemetry, DroneStatus } from "../types/droneTelemetry";

export default function useMockTelemetry(
  initial: DroneTelemetry[],
  interval = 1200,
) {
  const [drones, setDrones] = useState<DroneTelemetry[]>(initial);

  useEffect(() => {
    const id = setInterval(() => {
      setDrones((prevDrones) =>
        prevDrones.map((drone) => {
          if (drone.status === STATUS.LANDED) return drone;

          // Homing / wandering behavior
          let nextLat = drone.lat;
          let nextLng = drone.lng;
          if (drone.status === STATUS.RTL) {
            const toHomeLat = 34.2866 - drone.lat;
            const toHomeLng = -118.8826 - drone.lng;
            const dist = Math.sqrt(
              toHomeLat * toHomeLat + toHomeLng * toHomeLng,
            );
            if (dist < 0.00012) {
              nextLat = 34.2866;
              nextLng = -118.8826;
            } else {
              const step = 0.0009;
              const factor = dist > 0 ? Math.min(1, step / dist) : 1;
              nextLat = drone.lat + toHomeLat * factor;
              nextLng = drone.lng + toHomeLng * factor;
            }
          } else {
            nextLat = drone.lat + (Math.random() - 0.45) * 0.0008;
            nextLng = drone.lng + (Math.random() - 0.5) * 0.0008;
          }

          // Battery and status
          const nextBattery = Math.max(
            0,
            drone.battery - (Math.random() > 0.7 ? 1 : 0),
          );
          let nextStatus: DroneStatus =
            nextBattery < 15 ? STATUS.ALERT : drone.status;
          if (drone.status === STATUS.RTL) {
            const reachedHome =
              Math.abs(nextLat - 34.2866) < 0.000001 &&
              Math.abs(nextLng + 118.8826) < 0.000001;
            if (reachedHome) nextStatus = STATUS.LANDED;
          }

          const nextHeading =
            (drone.heading + (Math.random() - 0.5) * 12 + 360) % 360;
          const nextAltitude = Math.max(
            0,
            drone.altitude + Math.round((Math.random() - 0.5) * 12),
          );
          const nextAirspeed = Math.max(
            5,
            drone.airspeed + Math.round((Math.random() - 0.5) * 4),
          );

          const newPath = [
            ...drone.flightPath,
            [nextLat, nextLng] as [number, number],
          ];
          if (newPath.length > 80) newPath.shift();

          const nextRssi = Math.round(
            (drone.rssi ?? -72) + (Math.random() - 0.5) * 2,
          );
          const nextLatency = Math.max(
            10,
            Math.round((drone.latency ?? 120) + (Math.random() - 0.5) * 80),
          );
          const nextPacketLoss = Math.max(
            0,
            Math.round(
              ((drone.packetLoss ?? 0.8) + (Math.random() - 0.5) * 1) * 10,
            ) / 10,
          );

          return {
            ...drone,
            lat: nextLat,
            lng: nextLng,
            battery: nextBattery,
            status: nextStatus,
            heading: Math.round(nextHeading),
            altitude: nextAltitude,
            airspeed: nextAirspeed,
            flightPath: newPath,
            rssi: nextRssi,
            latency: nextLatency,
            packetLoss: nextPacketLoss,
          };
        }),
      );
    }, interval);

    return () => clearInterval(id);
  }, [interval]);

  return [drones, setDrones] as const;
}
