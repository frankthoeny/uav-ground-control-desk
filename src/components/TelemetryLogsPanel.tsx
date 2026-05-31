import { useDroneContext } from '../context/DroneContext';

export default function TelemetryLogsPanel() {
    const { selectedDrone } = useDroneContext();
    return (
        <div className="rounded-2xl border border-slate-900 bg-slate-900/30 p-4 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Telemetry Logs</h3>
            <div className="mt-3 text-sm text-slate-300">
                <p className="text-xs text-slate-500">Live messages for <span className="font-semibold text-white">{selectedDrone.callsign}</span></p>
                <div className="mt-3 h-40 overflow-auto rounded bg-slate-950/60 p-3 font-mono text-xs text-slate-300">
                    <div>[12:00:01] POS {selectedDrone.lat.toFixed(5)},{selectedDrone.lng.toFixed(5)} ALT {selectedDrone.altitude} ft</div>
                    <div>[12:00:03] BAT {selectedDrone.battery}% RSSI -72 dBm</div>
                    <div className="text-slate-500 mt-2">(This is a placeholder log view.)</div>
                </div>
            </div>
        </div>
    );
}
