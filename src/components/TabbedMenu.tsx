type TabDefinition = {
    id: string;
    label: string;
};

type TabbedMenuProps = {
    tabs: TabDefinition[];
    activeTab: string;
    onChange: (tabId: string) => void;
};

export default function TabbedMenu({ tabs, activeTab, onChange }: TabbedMenuProps) {
    return (
        <div className="rounded-2xl border border-slate-900 bg-slate-900/30 p-3 shadow-sm">
            <div className="flex flex-wrap gap-2">
                {tabs.map((tab) => {
                    const isActive = tab.id === activeTab;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => onChange(tab.id)}
                            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${isActive
                                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                }`}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
