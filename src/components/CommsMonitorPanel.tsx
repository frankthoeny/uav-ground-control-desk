import { useDroneContext } from '../context/DroneContext';

export default function CommsMonitorPanel() {
    const { selectedDrone } = useDroneContext();
    return (
        <div className="rounded-2xl border border-slate-900 bg-slate-900/30 p-4 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Comms / Link Monitor</h3>
            <div className="mt-3 text-sm text-slate-300">
                <p className="text-xs text-slate-500">Link metrics for <span className="font-semibold text-white">{selectedDrone.callsign}</span></p>
                <div className="mt-3 rounded bg-slate-950/60 p-3 text-sm">
                    <p>RSSI: {selectedDrone.rssi ?? 'N/A'} dBm</p>
                    <p>Packet Loss: {selectedDrone.packetLoss ?? 'N/A'}%</p>
                    <p>Latency: {selectedDrone.latency ?? 'N/A'} ms</p>
                </div>
            </div>
        </div>
    );
}
