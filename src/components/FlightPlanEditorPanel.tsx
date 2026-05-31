import { useDroneContext } from '../context/DroneContext';

export default function FlightPlanEditorPanel() {
    const { selectedDrone } = useDroneContext();
    return (
        <div className="rounded-2xl border border-slate-900 bg-slate-900/30 p-4 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Flight Plan Editor</h3>
            <div className="mt-3 text-sm text-slate-300">
                <p className="text-xs text-slate-500">Editing plan for <span className="font-semibold text-white">{selectedDrone.callsign}</span></p>
                <div className="mt-3 rounded bg-slate-950/60 p-3 text-sm">
                    <p className="text-slate-400">Waypoints editor placeholder</p>
                </div>
                <div className="mt-3 flex gap-2">
                    <button className="rounded bg-indigo-600 px-3 py-1 text-white">Upload Plan</button>
                    <button className="rounded bg-slate-800 px-3 py-1 text-slate-300">Save Draft</button>
                </div>
            </div>
        </div>
    );
}
