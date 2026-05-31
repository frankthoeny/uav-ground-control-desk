import { useDroneContext } from '../context/DroneContext';

export default function MaintenancePanel() {
    const { selectedDrone } = useDroneContext();
    return (
        <div className="rounded-2xl border border-slate-900 bg-slate-900/30 p-4 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Maintenance & Health</h3>
            <div className="mt-3 text-sm text-slate-300">
                <p className="text-xs text-slate-500">Health overview for <span className="font-semibold text-white">{selectedDrone.callsign}</span></p>
                <div className="mt-3 rounded bg-slate-950/60 p-3 text-sm">
                    <p>Last boot: 2 days ago</p>
                    <p>Errors: 0</p>
                    <p>Firmware: v5.3.1</p>
                </div>
            </div>
        </div>
    );
}
