import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import type { DroneTelemetry } from '../types/droneTelemetry';

type GCSMapPanelProps = {
    selectedDrone: DroneTelemetry;
};

export default function GCSMapPanel({ selectedDrone }: GCSMapPanelProps) {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-900 bg-slate-900/30 shadow-xl">
            <div className="border-b border-slate-900 bg-slate-900/60 p-4 flex flex-col sm:flex-row justify-between gap-2">
                <div>
                    <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase font-mono">
                        Telemetry Track View
                    </span>
                    <h3 className="text-base font-bold text-white tracking-tight">
                        {selectedDrone.callsign} Mission Path
                    </h3>
                </div>
                <div className="text-left sm:text-right font-mono text-xs text-slate-400">
                    POS: <span className="text-white font-bold">{selectedDrone.lat.toFixed(5)}</span>,{' '}
                    <span className="text-white font-bold">{selectedDrone.lng.toFixed(5)}</span>
                </div>
            </div>

            <div className="relative h-[380px] w-full bg-slate-950 z-10">
                <MapContainer
                    key={selectedDrone.callsign}
                    center={[selectedDrone.lat, selectedDrone.lng]}
                    zoom={14}
                    scrollWheelZoom={false}
                    className="h-full w-full"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors &copy; <a href="https://carto.com">CARTO</a>'
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
                    />

                    <Polyline
                        positions={selectedDrone.flightPath}
                        pathOptions={{ color: 'rgba(99, 102, 241, 0.7)', weight: 3, dashArray: '4 6' }}
                    />

                    <Marker position={[selectedDrone.lat, selectedDrone.lng]}>
                        <Popup>
                            <div className="text-sm font-bold">{selectedDrone.callsign}</div>
                            <div className="text-xs text-slate-400">{selectedDrone.model}</div>
                            <div className="mt-2 text-xs">
                                <div>Status: <span className="font-bold">{selectedDrone.status}</span></div>
                                <div>Battery: <span className="font-bold">{selectedDrone.battery}%</span></div>
                                <div>Altitude: <span className="font-bold">{selectedDrone.altitude} ft</span></div>
                                <div>Airspeed: <span className="font-bold">{selectedDrone.airspeed} knots</span></div>
                            </div>
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
}
