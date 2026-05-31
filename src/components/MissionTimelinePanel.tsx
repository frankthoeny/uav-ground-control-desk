import { useDroneContext } from '../context/DroneContext';

export default function MissionTimelinePanel() {
    const { selectedDrone } = useDroneContext();
    return (
        <div className="rounded-2xl border border-slate-900 bg-slate-900/30 p-4 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Mission Timeline</h3>
            <div className="mt-3 text-sm text-slate-300">
                <p className="text-xs text-slate-500">Event stream for <span className="font-semibold text-white">{selectedDrone.callsign}</span></p>
                <ol className="mt-3 list-decimal list-inside text-slate-400">
                    <li>Takeoff - T+00:00</li>
                    <li>Waypoint 1 reached - T+02:12</li>
                    <li>Battery check - T+05:22</li>
                </ol>
            </div>
        </div>
    );
}
