import { createContext, useContext, type ReactNode } from 'react';
import type { DroneTelemetry } from '../types/droneTelemetry';

type DroneContextType = {
    drones: DroneTelemetry[];
    selectedDrone: DroneTelemetry;
    activeCallsign: string;
    setActiveCallsign: (callsign: string) => void;
};

const DroneContext = createContext<DroneContextType | undefined>(undefined);

export function DroneProvider({
    children,
    drones,
    selectedDrone,
    activeCallsign,
    setActiveCallsign,
}: {
    children: ReactNode;
    drones: DroneTelemetry[];
    selectedDrone: DroneTelemetry;
    activeCallsign: string;
    setActiveCallsign: (callsign: string) => void;
}) {
    return (
        <DroneContext.Provider
            value={{ drones, selectedDrone, activeCallsign, setActiveCallsign }}
        >
            {children}
        </DroneContext.Provider>
    );
}

export function useDroneContext() {
    const context = useContext(DroneContext);
    if (!context) {
        throw new Error('useDroneContext must be used within a DroneProvider');
    }
    return context;
}
