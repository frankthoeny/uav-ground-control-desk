import { useDroneContext } from '../context/DroneContext';

export default function SafetyGeofencePanel() {
    const { selectedDrone } = useDroneContext();
    return (
        <div className="rounded-2xl border border-slate-900 bg-slate-900/30 p-4 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Safety & Geofencing</h3>
            <div className="mt-3 text-sm text-slate-300">
                <p className="text-xs text-slate-500">Geofence settings for <span className="font-semibold text-white">{selectedDrone.callsign}</span></p>
                <div className="mt-3 rounded bg-slate-950/60 p-3 text-sm">
                    <p className="text-slate-400">Define soft & hard fences on the map.</p>
                </div>
                <div className="mt-3 flex gap-2">
                    <button className="rounded bg-blue-600 px-3 py-1 text-white">Set Soft Fence</button>
                    <button className="rounded bg-rose-600 px-3 py-1 text-white">Set Hard Fence</button>
                </div>
            </div>
        </div>
    );
}
