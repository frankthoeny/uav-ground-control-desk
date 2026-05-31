import { STATUS } from '../types/droneTelemetry';
import { useDroneContext } from '../context/DroneContext';
import type { DroneStatus } from '../types/droneTelemetry';

const statusBadgeClasses: Record<DroneStatus, string> = {
    [STATUS.IN_FLIGHT]: 'bg-[#6e7d4c]/10 text-[#b0b77a] border-[#6e7d4c]/20',
    [STATUS.RTL]: 'bg-[#556b2f]/10 text-[#aec17d] border-[#556b2f]/20',
    [STATUS.ALERT]: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    [STATUS.LANDED]: 'bg-slate-600/10 text-slate-400 border-slate-600/20',
};

export default function DroneListSidebar() {
    const { drones, activeCallsign, setActiveCallsign } = useDroneContext();

    return (
        <div className="space-y-4 rounded-3xl border border-[#556b2f] bg-[#242e14]/80 p-4 shadow-xl">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#9aa46d] font-mono">
                Active Airframes
            </h2>
            <div className="space-y-3">
                {drones.map((drone) => {
                    const isActive = drone.callsign === activeCallsign;
                    return (
                        <div
                            key={drone.callsign}
                            onClick={() => setActiveCallsign(drone.callsign)}
                            className={`cursor-pointer overflow-hidden rounded-xl border transition-all ${isActive
                                ? 'border-[#8a9a5b] bg-[#293313] shadow-md shadow-[#8a9a5b]/15 ring-1 ring-[#8a9a5b]'
                                : 'border-[#25300e] bg-[#232c12]/60 hover:border-[#38461d] hover:bg-[#2d3714]/80'
                                }`}
                        >
                            <div className="p-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-black tracking-tight text-white">
                                        {drone.callsign}
                                    </span>
                                    <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold font-mono border ${statusBadgeClasses[drone.status]}`}>
                                        {drone.status}
                                    </span>
                                </div>
                                <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                                    {drone.model}
                                </p>
                                <div className="mt-3 flex items-center justify-between gap-3 text-xs font-mono">
                                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                                        <div
                                            className={`h-1.5 rounded-full transition-all ${drone.battery < 20 ? 'bg-rose-500' : 'bg-[#8a9a5b]'}`}
                                            style={{ width: `${drone.battery}%` }}
                                        />
                                    </div>
                                    <span className={drone.battery < 20 ? 'text-rose-400 font-bold' : 'text-slate-300'}>
                                        {drone.battery}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
