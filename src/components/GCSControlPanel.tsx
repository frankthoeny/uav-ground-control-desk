type GCSControlPanelProps = {
    onCommand: (command: 'rtl' | 'land') => void;
};

export default function GCSControlPanel({ onCommand }: GCSControlPanelProps) {
    return (
        <div className="rounded-xl border border-slate-900 bg-slate-900/30 p-4 shadow-lg">
            <h3 className="text-sm font-bold text-white tracking-tight mb-4">Command & Control Interface</h3>
            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={() => onCommand('rtl')}
                    className="flex-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 transition-colors"
                >
                    Return to Launch (RTL)
                </button>
                <button
                    onClick={() => onCommand('land')}
                    className="flex-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 transition-colors"
                >
                    Emergency Land
                </button>
            </div>
        </div>
    );
}
