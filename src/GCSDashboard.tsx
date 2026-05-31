import { useMemo, useState } from 'react';
import useMockTelemetry from './hooks/useMockTelemetry';
import L from 'leaflet';
import { renderToString } from 'react-dom/server';
import { Drone } from 'lucide-react';
import GCSHeader from './components/GCSHeader';
import DroneListSidebar from './components/DroneListSidebar';
import TabbedMapPanel from './components/TabbedMapPanel';
import GCSControlPanel from './components/GCSControlPanel';
import TabbedMenu from './components/TabbedMenu';
import HardwareConfigPanel from './components/HardwareConfigPanel';
import MissionStatsPanel from './components/MissionStatsPanel';
import TelemetryLogsPanel from './components/TelemetryLogsPanel';
import FlightPlanEditorPanel from './components/FlightPlanEditorPanel';
import SafetyGeofencePanel from './components/SafetyGeofencePanel';
import CommsMonitorPanel from './components/CommsMonitorPanel';
import PayloadControlsPanel from './components/PayloadControlsPanel';
import MaintenancePanel from './components/MaintenancePanel';
import MissionTimelinePanel from './components/MissionTimelinePanel';
import WeatherPanel from './components/WeatherPanel';
import AirspacePanel from './components/AirspacePanel';
import { DroneProvider } from './context/DroneContext';
import { STATUS } from './types/droneTelemetry';
import type { DroneTelemetry } from './types/droneTelemetry';

const iconHtml = renderToString(
    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500 text-white">
        <Drone size={16} />
    </div>
);
const droneIcon = L.divIcon({
    html: iconHtml,
    className: 'drone-marker',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15]
});
L.Marker.prototype.options.icon = droneIcon;

// --- Initial Mission Database (Centered around Torrance, CA) ---
// Moorpark, CA center + nearby sample drones
const INITIAL_DRONES: DroneTelemetry[] = [
    {
        callsign: 'NEXUS-01',
        model: 'Quadrotor Heavy Lift v4',
        status: STATUS.IN_FLIGHT,
        battery: 78,
        altitude: 350,
        airspeed: 24,
        lat: 34.2870,
        lng: -118.8830,
        heading: 45,
        flightPath: [[34.2855, -118.8840], [34.2863, -118.8835], [34.2870, -118.8830]],
        rssi: -72,
        latency: 120,
        packetLoss: 0.8
    },
    {
        callsign: 'VANGUARD-02',
        model: 'Fixed-Wing Recon Drone',
        status: STATUS.RTL,
        battery: 32,
        altitude: 500,
        airspeed: 42,
        lat: 34.2810,
        lng: -118.8890,
        heading: 180,
        flightPath: [[34.2900, -118.8850], [34.2850, -118.8870], [34.2810, -118.8890]],
        rssi: -65,
        latency: 180,
        packetLoss: 1.8
    },
    {
        callsign: 'SPECTER-03',
        model: 'Scout Micro-UAV',
        status: STATUS.ALERT,
        battery: 14,
        altitude: 120,
        airspeed: 12,
        lat: 34.2930,
        lng: -118.8780,
        heading: 290,
        flightPath: [[34.2890, -118.8790], [34.2930, -118.8780]],
        rssi: -80,
        latency: 220,
        packetLoss: 4.6
    }
];

export default function GCSDashboard() {
    const [drones, setDrones] = useMockTelemetry(INITIAL_DRONES);
    const [activeCallsign, setActiveCallsign] = useState<string>('NEXUS-01');
    const [activeTab, setActiveTab] = useState<'mission' | 'hardware' | 'telemetry' | 'flightplan' | 'safety' | 'comms' | 'payload' | 'maintenance' | 'timeline' | 'weather' | 'airspace'>('mission');

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId as 'mission' | 'hardware' | 'telemetry' | 'flightplan' | 'safety' | 'comms' | 'payload' | 'maintenance' | 'timeline' | 'weather' | 'airspace');
    };

    const selectedDrone = useMemo(
        () => drones.find((d) => d.callsign === activeCallsign) || drones[0],
        [activeCallsign, drones]
    );



    // Handler for emergency control triggers
    const triggerCommand = (command: string) => {
        alert(`CRITICAL GCS COMMAND sent to ${selectedDrone.callsign}: [${command.toUpperCase()}]`);
        setDrones(prev => prev.map(d => {
            if (d.callsign === selectedDrone.callsign) {
                return {
                    ...d,
                    status: command === 'rtl' ? STATUS.RTL : command === 'land' ? STATUS.LANDED : d.status
                };
            }
            return d;
        }));
    };

    return (
        <DroneProvider
            drones={drones}
            selectedDrone={selectedDrone}
            activeCallsign={activeCallsign}
            setActiveCallsign={setActiveCallsign}
        >
            <div className="min-h-screen p-4 font-sans text-[#e5e8c4] sm:p-6">
                <GCSHeader />

                <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
                    <DroneListSidebar />

                    <div className="space-y-6">
                        <TabbedMapPanel />
                        <div className="space-y-4">
                            <TabbedMenu
                                tabs={[
                                    { id: 'mission', label: 'Mission Stats' },
                                    { id: 'telemetry', label: 'Telemetry Logs' },
                                    { id: 'flightplan', label: 'Flight Plan' },
                                    { id: 'safety', label: 'Safety / Geofence' },
                                    { id: 'comms', label: 'Comms Monitor' },
                                    { id: 'payload', label: 'Payload Controls' },
                                    { id: 'maintenance', label: 'Maintenance' },
                                    { id: 'timeline', label: 'Mission Timeline' },
                                    { id: 'weather', label: 'Weather' },
                                    { id: 'airspace', label: 'Airspace' },
                                    { id: 'hardware', label: 'Hardware Config' }
                                ]}
                                activeTab={activeTab}
                                onChange={handleTabChange}
                            />

                            {activeTab === 'mission' && <MissionStatsPanel />}
                            {activeTab === 'telemetry' && <TelemetryLogsPanel />}
                            {activeTab === 'flightplan' && <FlightPlanEditorPanel />}
                            {activeTab === 'safety' && <SafetyGeofencePanel />}
                            {activeTab === 'comms' && <CommsMonitorPanel />}
                            {activeTab === 'payload' && <PayloadControlsPanel />}
                            {activeTab === 'maintenance' && <MaintenancePanel />}
                            {activeTab === 'timeline' && <MissionTimelinePanel />}
                            {activeTab === 'weather' && <WeatherPanel />}
                            {activeTab === 'airspace' && <AirspacePanel />}
                            {activeTab === 'hardware' && <HardwareConfigPanel />}
                        </div>
                        <GCSControlPanel onCommand={triggerCommand} />
                    </div>
                </div>
            </div>
        </DroneProvider>
    );
}

