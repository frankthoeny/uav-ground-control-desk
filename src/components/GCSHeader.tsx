import { useDroneContext } from '../context/DroneContext';

export default function GCSHeader() {
    const { drones } = useDroneContext();
    const airborneCount = drones.filter((drone) => drone.status !== 'Landed').length;
    const alertCount = drones.filter((drone) => drone.status === 'Alert').length;

    return (
        <header className="mb-6 flex flex-col justify-between gap-4 border-b border-slate-900 pb-5 sm:flex-row sm:items-center">
            <div>
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 animate-ping rounded-full bg-red-500" />
                    <h1 className="text-xl font-white tracking-wider uppercase text-white sm:text-2xl">
                        UAV Ground Control Desk
                    </h1>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Primary Link: Moorpark Field Terminal (34.2866, -118.8826)
                </p>
            </div>

            <div className="flex gap-4 bg-slate-900/50 px-4 py-2 rounded-xl border border-slate-900 font-mono text-xs">
                <div>
                    Airborne: <span className="text-indigo-400 font-bold">{airborneCount}</span>
                </div>
                <div>
                    Alert Flags: <span className="text-rose-400 font-bold">{alertCount}</span>
                </div>
            </div>
        </header>
    );
}
