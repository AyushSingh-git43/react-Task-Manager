export function TaskControls({ searchQuery, setSearchQuery, filterTab, setFilterTab }) {
    return (
        <>
            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    value={searchQuery}
                    placeholder="Search tasks..."
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm outline-none focus:border-violet-500 text-slate-200"
                />
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6 border-b border-slate-800 pb-4">
                {["all", "pending", "completed"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setFilterTab(tab)}
                        className={`rounded-lg px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                            filterTab === tab 
                                ? "bg-violet-600 text-white" 
                                : "bg-slate-900 text-slate-400 hover:bg-slate-800"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </>
    );
}