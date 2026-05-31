import { useDroneContext } from '../context/DroneContext';

export default function HardwareConfigPanel() {
    const { selectedDrone } = useDroneContext();
    return (
        <div className="rounded-2xl border border-slate-900 bg-slate-900/30 p-5 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Hardware Config</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-950/80 p-4 text-sm text-slate-300">
                    <p className="text-xs uppercase tracking-wider text-slate-500">Flight Computer</p>
                    <p className="mt-2 font-semibold text-white">FalconCore X2</p>
                    <p className="mt-1 text-slate-500">v5.3.1</p>
                </div>
                <div className="rounded-2xl bg-slate-950/80 p-4 text-sm text-slate-300">
                    <p className="text-xs uppercase tracking-wider text-slate-500">Sensors</p>
                    <p className="mt-2 font-semibold text-white">IMU2024 / LidarR2</p>
                    <p className="mt-1 text-slate-500">GPS / Magnetometer / Barometer</p>
                </div>
                <div className="rounded-2xl bg-slate-950/80 p-4 text-sm text-slate-300">
                    <p className="text-xs uppercase tracking-wider text-slate-500">Comm Link</p>
                    <p className="mt-2 font-semibold text-white">2.4GHz MESH</p>
                    <p className="mt-1 text-slate-500"><span className="font-bold">RSSI:</span> -72 dBm</p>
                </div>
                <div className="rounded-2xl bg-slate-950/80 p-4 text-sm text-slate-300">
                    <p className="text-xs uppercase tracking-wider text-slate-500">Powertrain</p>
                    <p className="mt-2 font-semibold text-white">Quad-Motor Hybrid</p>
                    <p className="mt-1 text-slate-500">Fuel cell / battery buffer</p>
                </div>
            </div>
            <div className="mt-5 rounded-2xl bg-slate-950/80 p-4 text-sm text-slate-300">
                <p className="text-xs uppercase tracking-widest text-slate-500">Active Drone</p>
                <p className="mt-2 font-semibold text-white">{selectedDrone.callsign}</p>
                <p className="text-slate-500">Model: {selectedDrone.model}</p>
                <p className="text-slate-500">Heading: {selectedDrone.heading}°</p>
            </div>
        </div>
    );
}
