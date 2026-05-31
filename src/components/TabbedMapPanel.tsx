import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { useDroneContext } from '../context/DroneContext';
import TabbedMenu from './TabbedMenu';

export default function TabbedMapPanel() {
    const { selectedDrone } = useDroneContext();
    const [activeTab, setActiveTab] = useState<'map' | 'satellite'>('satellite');
    const [showRoute, setShowRoute] = useState(true);
    const [showHud, setShowHud] = useState(true);
    const [showCompass, setShowCompass] = useState(true);
    const [showAltimeter, setShowAltimeter] = useState(true);

    const darkUrl = useMemo(
        () => 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
        []
    );
    const satelliteUrl = useMemo(
        () => 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        []
    );

    const baseUrl = activeTab === 'satellite' ? satelliteUrl : darkUrl;

    const compassStyle: React.CSSProperties = {
        width: 80,
        height: 80,
        borderRadius: '50%',
        background: 'linear-gradient(180deg,#0f172a,#081126)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 700,
        boxShadow: '0 2px 8px rgba(0,0,0,0.6)'
    };

    const arrowStyle: React.CSSProperties = {
        width: 0,
        height: 0,
        borderLeft: '8px solid transparent',
        borderRight: '8px solid transparent',
        borderBottom: '20px solid #ef4444',
        transform: `rotate(${selectedDrone.heading}deg)`,
        transformOrigin: 'center center'
    };

    const altPercent = Math.min(100, Math.max(0, Math.round((selectedDrone.altitude / 1000) * 100)));

    return (
        <div className={`overflow-hidden rounded-2xl border ${selectedDrone.status === 'Alert' ? 'border-rose-500 bg-rose-500/15 shadow-[0_0_0_18px_rgba(244,63,94,0.12)] animate-pulse' : 'border-[#556b2f] bg-[#161e12]/80 shadow-xl'}`}>
            <div className="border-b border-[#556b2f] bg-[#242e14]/80 p-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase font-mono">Map Controls</span>
                    <h3 className="text-base font-bold text-white tracking-tight">Geospatial Canvas</h3>
                </div>
                <div className="flex flex-1 min-w-0 flex-wrap items-center justify-center gap-4">
                    <TabbedMenu
                        tabs={[
                            { id: 'satellite', label: 'Satellite' },
                            { id: 'map', label: 'Map' }
                        ]}
                        activeTab={activeTab}
                        onChange={(id) => setActiveTab(id as any)}
                    />
                    <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-[#556b2f] bg-[#242e14]/80 px-3 py-2 text-xs text-slate-300 shadow-lg">
                        <label className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2">
                            <input
                                type="checkbox"
                                checked={showRoute}
                                onChange={(event) => setShowRoute(event.target.checked)}
                                className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-400"
                            />
                            <span>Route</span>
                        </label>
                        <label className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2">
                            <input
                                type="checkbox"
                                checked={showHud}
                                onChange={(event) => setShowHud(event.target.checked)}
                                className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-400"
                            />
                            <span>HUD</span>
                        </label>
                        <label className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2">
                            <input
                                type="checkbox"
                                checked={showCompass}
                                onChange={(event) => setShowCompass(event.target.checked)}
                                className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-400"
                            />
                            <span>Compass</span>
                        </label>
                        <label className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2">
                            <input
                                type="checkbox"
                                checked={showAltimeter}
                                onChange={(event) => setShowAltimeter(event.target.checked)}
                                className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-400"
                            />
                            <span>Altimeter</span>
                        </label>
                    </div>
                </div>
                <div className="text-left sm:text-right font-mono text-xs text-slate-400">
                    POS: <span className="text-white font-bold">{selectedDrone.lat.toFixed(5)}</span>,{' '}
                    <span className="text-white font-bold">{selectedDrone.lng.toFixed(5)}</span>
                </div>
            </div>

            <div className="relative h-[560px] w-full bg-[#11160d] z-10">
                <MapContainer
                    key={`${selectedDrone.callsign}-${activeTab}`}
                    center={[selectedDrone.lat, selectedDrone.lng]}
                    zoom={14}
                    scrollWheelZoom={false}
                    className="h-full w-full"
                >
                    <TileLayer attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors &copy; <a href="https://carto.com">CARTO</a>' url={baseUrl} />
                    {showRoute && (
                        <Polyline
                            positions={selectedDrone.flightPath}
                            pathOptions={{ color: 'rgba(99, 102, 241, 0.8)', weight: 4, dashArray: '6 8' }}
                        />
                    )}
                    <Marker position={[selectedDrone.lat, selectedDrone.lng]}>
                        <Popup>
                            <div className="text-sm font-bold">{selectedDrone.callsign}</div>
                            <div className="text-xs text-slate-400">{selectedDrone.model}</div>
                        </Popup>
                    </Marker>
                </MapContainer>


                {showHud && (
                    <div className="absolute left-4 bottom-4 z-[999] w-72 rounded-3xl border border-slate-800 bg-black/75 p-4 text-sm text-white backdrop-blur-xl">
                        <div className="font-semibold">{selectedDrone.callsign} — HUD</div>
                        <div className="mt-3 grid gap-2 text-xs text-slate-300">
                            <div>Battery: {selectedDrone.battery}%</div>
                            <div>Alt: {selectedDrone.altitude} ft</div>
                            <div>Speed: {selectedDrone.airspeed} kt</div>
                            <div>Heading: {selectedDrone.heading}°</div>
                        </div>
                    </div>
                )}

                {showCompass && (
                    <div className="absolute right-4 top-4 z-[999] flex flex-col items-center gap-2 rounded-3xl border border-slate-800 bg-black/70 p-3 text-sm text-slate-200 backdrop-blur-xl">
                        <div style={compassStyle}>
                            <div style={{ transform: `rotate(${selectedDrone.heading}deg)` }}>
                                <div style={arrowStyle} />
                            </div>
                        </div>
                        <div className="text-xs text-slate-300">Heading {selectedDrone.heading}°</div>
                    </div>
                )}

                {showAltimeter && (
                    <div className="absolute right-4 bottom-4 z-[999] flex items-center gap-3 rounded-3xl border border-slate-800 bg-slate-950/80 p-3 text-sm text-slate-200 backdrop-blur-xl">
                        <div className="w-12 h-40 rounded bg-slate-800/80 p-1 flex items-end">
                            <div className="w-full rounded-t bg-gradient-to-t from-rose-500 to-amber-300" style={{ height: `${altPercent}%` }} />
                        </div>
                        <div>
                            <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Altimeter</div>
                            <div className="text-base font-semibold text-white">{selectedDrone.altitude} ft</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
