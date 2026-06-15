import React from "react";

// Level unlock requirements: Level N requires N directs (Level 1 = 1 direct, etc.)
const LEVEL_DATA = [
    { level: 1, roi: "7%", roiColor: "text-yellow-400", directs: 1 },
    { level: 2, roi: "5%", roiColor: "text-yellow-400", directs: 2 },
    { level: 3, roi: "4%", roiColor: "text-blue-400", directs: 3 },
    { level: 4, roi: "3%", roiColor: "text-blue-400", directs: 4 },
    { level: 5, roi: "2.5%", roiColor: "text-blue-400", directs: 5 },
    { level: 6, roi: "2%", roiColor: "text-orange-400", directs: 6 },
    { level: 7, roi: "1.5%", roiColor: "text-orange-400", directs: 7 },
];

// UnlockBadge: shows green "Unlocked" or gray "Locked" based on directCount
const UnlockBadge = ({ unlocked }) =>
    unlocked ? (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold border border-green-500/40">
            {/* checkmark icon */}
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Unlocked
        </span>
    ) : (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-600/40 text-slate-400 text-xs font-semibold border border-slate-500/30">
            {/* lock icon */}
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2.2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
            Locked
        </span>
    );

/**
 * LevelConditionsTable
 * @param {number} [directCount] - Optional number of active direct referrals the user has.
 *   When provided, the Level Unlock Conditions table will highlight unlocked/locked status per level.
 */
const LevelConditionsTable = ({ directCount }) => {
    const showStatus = directCount !== undefined && directCount !== null;

    return (
        <div className="space-y-6">
            <div className="bg-blue-900/40 border border-blue-500/50 rounded-lg p-4 flex items-start gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                </div>
                <div>
                    <h4 className="text-lg font-bold text-white mb-1">Criteria</h4>
                    <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
                        <li>Self Investment: <span className="text-blue-400 font-bold">$100 Min</span></li>
                        <li>Referral Investment: <span className="text-purple-400 font-bold">$100 Min</span></li>
                    </ul>
                    {showStatus && (
                        <p className="mt-2 text-xs text-slate-400">
                            Your direct referrals: <span className="font-bold text-white">{directCount}</span>
                        </p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Level ROI Dividend Table */}
                <div className="bg-slate-800 rounded-lg p-5 shadow-lg border border-slate-700">
                    <h3 className="text-xl font-bold text-white mb-4 border-b border-slate-600 pb-2">
                        Level ROI Dividend
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-300">
                            <thead className="bg-slate-700 text-xs uppercase text-slate-200">
                                <tr>
                                    <th className="px-4 py-3 rounded-tl-md">Levels</th>
                                    <th className="px-4 py-3 rounded-tr-md text-right">ROI %</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                                {LEVEL_DATA.map(({ level, roi, roiColor }) => (
                                    <tr key={level} className="hover:bg-slate-750 transition-colors">
                                        <td className="px-4 py-3 font-medium">Level {level}</td>
                                        <td className={`px-4 py-3 text-right font-bold ${roiColor}`}>{roi}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Level Unlock Conditions Table */}
                <div className="bg-slate-800 rounded-lg p-5 shadow-lg border border-slate-700">
                    <h3 className="text-xl font-bold text-white mb-4 border-b border-slate-600 pb-2">
                        Level Unlock Conditions
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-300">
                            <thead className="bg-slate-700 text-xs uppercase text-slate-200">
                                <tr>
                                    <th className="px-4 py-3 rounded-tl-md">Levels</th>
                                    <th className="px-4 py-3 text-right">Direct Required</th>
                                    {showStatus && (
                                        <th className="px-4 py-3 rounded-tr-md text-right">Status</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                                {LEVEL_DATA.map(({ level, directs }) => {
                                    const unlocked = showStatus && directCount >= directs;
                                    return (
                                        <tr
                                            key={level}
                                            className={`transition-colors ${showStatus && unlocked
                                                    ? "bg-green-900/10 hover:bg-green-900/20"
                                                    : "hover:bg-slate-750"
                                                }`}
                                        >
                                            <td className="px-4 py-3 font-medium">
                                                Level {level}
                                            </td>
                                            <td className="px-4 py-3 text-right font-bold text-white">
                                                {directs} {directs === 1 ? "Direct" : "Directs"}
                                            </td>
                                            {showStatus && (
                                                <td className="px-4 py-3 text-right">
                                                    <UnlockBadge unlocked={unlocked} />
                                                </td>
                                            )}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LevelConditionsTable;
