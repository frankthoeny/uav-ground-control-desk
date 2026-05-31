import { useDroneContext } from '../context/DroneContext';

export default function PayloadControlsPanel() {
    const { selectedDrone } = useDroneContext();
    return (
        <div className="rounded-2xl border border-slate-900 bg-slate-900/30 p-4 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Payload / Camera Controls</h3>
            <div className="mt-3 text-sm text-slate-300">
                <p className="text-xs text-slate-500">Controls for <span className="font-semibold text-white">{selectedDrone.callsign}</span></p>
                <div className="mt-3 flex gap-2">
                    <button className="rounded bg-indigo-600 px-3 py-1 text-white">Camera On</button>
                    <button className="rounded bg-slate-800 px-3 py-1 text-slate-300">Record</button>
                    <button className="rounded bg-slate-800 px-3 py-1 text-slate-300">Snapshot</button>
                </div>
            </div>
        </div>
    );
}
