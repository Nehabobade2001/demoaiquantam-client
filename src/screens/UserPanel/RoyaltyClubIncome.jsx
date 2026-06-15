import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DataTable from "../../components/Screen/UserPanel/DataTable";
import { setLoading } from "../../redux/slices/loadingSlice";
import { Axios } from "../../constants/mainContent";

const RoyaltyClubIncome = () => {
    const dispatch = useDispatch();
    const [royaltyHistory, setRoyaltyHistory] = useState([]);
    const [royaltyStatus, setRoyaltyStatus] = useState(null);
    const [royaltyStats, setRoyaltyStats] = useState(null);

    // Fetch royalty income history
    const fetchRoyaltyHistory = async () => {
        try {
            dispatch(setLoading(true));
            const response = await Axios.get('/user/royalty-income/history');

            if (response?.data?.success) {
                setRoyaltyHistory(response.data.data || []);
            } else {
                toast.error(response?.data?.message || "Failed to fetch history");
                setRoyaltyHistory([]);
            }
        } catch (err) {
            console.error('Royalty History Error:', err);
            toast.error("Failed to fetch royalty income history");
            setRoyaltyHistory([]);
        } finally {
            dispatch(setLoading(false));
        }
    };

    // Fetch current royalty status
    const fetchRoyaltyStatus = async () => {
        try {
            const response = await Axios.get('/user/royalty-income/status');

            if (response?.data?.success) {
                setRoyaltyStatus(response.data.data);
            }
        } catch (err) {
            console.error("Failed to fetch royalty status:", err);
        }
    };

    // Fetch royalty stats
    const fetchRoyaltyStats = async () => {
        try {
            const response = await Axios.get('/user/royalty-income/stats');

            if (response?.data?.success) {
                setRoyaltyStats(response.data.data);
            }
        } catch (err) {
            console.error("Failed to fetch royalty stats:", err);
        }
    };

    useEffect(() => {
        fetchRoyaltyHistory();
        fetchRoyaltyStatus();
        fetchRoyaltyStats();
    }, []);

    const getTierName = (tier) => {
        const tierNames = {
            tier1: "Bronze ($5K-$20K) - 2%",
            tier2: "Silver ($20K-$50K) - 3%",
            tier3: "Gold ($50K-$100K) - 4%",
            tier4: "Platinum ($100K-$250K) - 5%",
            tier5: "Diamond ($250K+) - 6%",
            none: "No Tier",
        };
        return tierNames[tier] || tier;
    };

    const getTierColor = (tier) => {
        const colors = {
            tier1: "text-orange-400",
            tier2: "text-gray-400",
            tier3: "text-yellow-400",
            tier4: "text-cyan-400",
            tier5: "text-purple-400",
            none: "text-slate-400",
        };
        return colors[tier] || "text-slate-400";
    };

    const columns = [
        {
            header: "S/N",
            accessor: "_id",
            cell: (_, rowIndex) => (
                <span className="font-medium text-white">{rowIndex + 1}</span>
            ),
        },
        {
            header: "Month/Year",
            accessor: "month",
            cell: (row) => (
                <span className="font-medium text-white">
                    {String(row?.month).padStart(2, '0')}/{row?.year}
                </span>
            ),
        },
        {
            header: "Direct Business",
            accessor: "directBusinessVolume",
            cell: (row) => (
                <span className="font-medium text-green-400">
                    ${Number(row?.directBusinessVolume || 0).toLocaleString()}
                </span>
            ),
        },
        {
            header: "Tier",
            accessor: "tier",
            cell: (row) => (
                <div className="flex items-center space-x-2">
                    <span className="text-lg">👑</span>
                    <span className={`font-medium ${getTierColor(row?.tier)}`}>
                        {getTierName(row?.tier)}
                    </span>
                </div>
            ),
        },
        {
            header: "Percentage",
            accessor: "percentage",
            cell: (row) => (
                <span className="font-bold text-blue-400">{row?.percentage}%</span>
            ),
        },
        {
            header: "Royalty Income",
            accessor: "amount",
            cell: (row) => (
                <span className="font-bold text-green-500 text-lg">
                    ${Number(row?.amount || 0).toFixed(2)}
                </span>
            ),
        },
        {
            header: "Status",
            accessor: "status",
            cell: (row) => (
                <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                        row?.status === "Completed" 
                            ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                            : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                    }`}
                >
                    {row?.status}
                </span>
            ),
        },
        {
            header: "Date",
            accessor: "createdAt",
            cell: (row) => (
                <span className="text-slate-300">
                    {new Date(row?.createdAt).toLocaleDateString()}
                </span>
            ),
        },
    ];

    const cardData = [
        {
            title: "Total Royalty Income",
            value: `$${Number(royaltyStats?.totalEarned ?? 0).toLocaleString()}`,
            icon: "👑",
            gradient: "from-yellow-400 to-orange-500",
        },
        {
            title: "Current Month Business",
            value: `$${Number(royaltyStatus?.directBusinessVolume ?? 0).toLocaleString()}`,
            icon: "💼",
            gradient: "from-green-400 to-emerald-500",
        },
        {
            title: "Current Tier",
            value: getTierName(royaltyStatus?.currentTier || "none"),
            icon: "🏆",
            gradient: "from-purple-400 to-pink-500",
        },
        {
            title: "Projected Income",
            value: `$${Number(royaltyStatus?.projectedIncome ?? 0).toLocaleString()}`,
            icon: "📈",
            gradient: "from-blue-400 to-indigo-500",
        },
    ];

    return (
        <div className="space-y-6 mt-5">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-2xl p-6 border border-purple-500/30">
                <div className="flex items-center space-x-3 mb-4">
                    <span className="text-4xl">👑</span>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Royalty Club Income</h1>
                        <p className="text-purple-200">Earn monthly royalty income based on your team referrals' business volume</p>
                    </div>
                </div>

                {/* Tier Information Grid */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
                    {[
                        { tier: 'Bronze', range: '$5K-$20K', percentage: '2%', color: 'border-orange-500/30 bg-orange-500/10' },
                        { tier: 'Silver', range: '$20K-$50K', percentage: '3%', color: 'border-gray-400/30 bg-gray-400/10' },
                        { tier: 'Gold', range: '$50K-$100K', percentage: '4%', color: 'border-yellow-500/30 bg-yellow-500/10' },
                        { tier: 'Platinum', range: '$100K-$250K', percentage: '5%', color: 'border-cyan-500/30 bg-cyan-500/10' },
                        { tier: 'Diamond', range: '$250K+', percentage: '6%', color: 'border-purple-500/30 bg-purple-500/10' },
                    ].map((item, index) => (
                        <div key={index} className={`rounded-xl p-4 border ${item.color} hover:scale-105 transition-transform duration-200`}>
                            <div className="text-center">
                                <div className="text-xs text-slate-400 mb-1">Tier {index + 1} - {item.tier}</div>
                                <div className="font-bold text-white text-sm mb-1">{item.range}</div>
                                <div className="text-2xl font-bold text-yellow-400">{item.percentage}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {royaltyStatus?.nextTier && (
                    <div className="mt-6 bg-blue-900/20 rounded-xl p-4 border border-blue-500/30">
                        <div className="flex items-center space-x-2">
                            <span className="text-2xl">🎯</span>
                            <div>
                                <p className="text-blue-300 font-medium">
                                    Next Tier: <strong>{getTierName(royaltyStatus.nextTier.tier)}</strong>
                                </p>
                                <p className="text-blue-200 text-sm">
                                    Required: ${Number(royaltyStatus.nextTier.required).toLocaleString()} more in business volume
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cardData.map((item, index) => (
                    <div key={index} className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 shadow-xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 group">
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                        <div className="absolute -right-8 -top-8 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
                        
                        <div className="relative z-10">
                            <div className="flex items-start justify-between mb-4">
                                <div className="text-4xl">{item.icon}</div>
                                <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                            </div>
                            
                            <h3 className="text-slate-400 text-sm font-medium mb-2 uppercase tracking-wide">
                                {item.title}
                            </h3>
                            
                            <div className="text-2xl font-bold text-white mb-2">
                                {item.value}
                            </div>
                            
                            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
                        </div>
                    </div>
                ))}
            </div>

            {/* History Table */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 overflow-hidden">
                <DataTable
                    title="Royalty Income History"
                    columns={columns}
                    data={royaltyHistory}
                    pageSize={10}
                />
            </div>
        </div>
    );
};

export default RoyaltyClubIncome;