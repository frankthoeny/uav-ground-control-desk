import { useDroneContext } from '../context/DroneContext';

export default function MissionStatsPanel() {
    const { drones, selectedDrone } = useDroneContext();
    const activeDrones = drones.filter((drone) => drone.status !== 'Landed').length;
    const alerts = drones.filter((drone) => drone.status === 'Alert').length;
    const avgBattery = Math.round(drones.reduce((sum, drone) => sum + drone.battery, 0) / drones.length);

    return (
        <div className="rounded-2xl border border-slate-900 bg-slate-900/30 p-5 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Mission Stats</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-950/80 p-4 text-sm text-slate-300">
                    <p className="text-xs uppercase tracking-wider text-slate-500">Airframes Active</p>
                    <p className="mt-2 text-2xl font-bold text-white">{activeDrones}</p>
                </div>
                <div className="rounded-2xl bg-slate-950/80 p-4 text-sm text-slate-300">
                    <p className="text-xs uppercase tracking-wider text-slate-500">Average Battery</p>
                    <p className="mt-2 text-2xl font-bold text-white">{avgBattery}%</p>
                </div>
                <div className="rounded-2xl bg-slate-950/80 p-4 text-sm text-slate-300">
                    <p className="text-xs uppercase tracking-wider text-slate-500">Alert Flags</p>
                    <p className="mt-2 text-2xl font-bold text-white">{alerts}</p>
                </div>
            </div>
            <div className="mt-5 rounded-2xl bg-slate-950/80 p-4 text-sm text-slate-300">
                <p className="text-xs uppercase tracking-wider text-slate-500">Focused Mission</p>
                <p className="mt-2 text-white font-semibold">{selectedDrone.callsign}</p>
                <p className="text-slate-500">Altitude: {selectedDrone.altitude} ft</p>
                <p className="text-slate-500">Speed: {selectedDrone.airspeed} kt</p>
                <p className="text-slate-500">Battery: {selectedDrone.battery}%</p>
            </div>
        </div>
    );
}
