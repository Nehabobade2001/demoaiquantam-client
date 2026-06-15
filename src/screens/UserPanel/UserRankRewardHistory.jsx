import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import DataTable from "../../components/Screen/UserPanel/DataTable";
import { setLoading } from "../../redux/slices/loadingSlice";
import { getAllUserRankRewardHistory } from "../../api/user.api";

const UserRankRewardHistory = () => {
  const dispatch = useDispatch();
  const [allRankRewardHistory, setAllRankRewardHistory] = useState([]);
  const [currentRank, setCurrentRank] = useState('No Rank');
  const [nextRank, setNextRank] = useState(null);
  const [totalRewards, setTotalRewards] = useState(0);
  const [todayRewards, setTodayRewards] = useState(0);

  const fetchRankRewardHistory = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getAllUserRankRewardHistory();
      if (response?.success) {
        const history = response?.data?.history || [];
        setAllRankRewardHistory(history);
        setCurrentRank(response?.data?.currentRank || 'No Rank');
        setNextRank(response?.data?.nextRank);
        
        // Calculate totals
        const total = history.reduce((sum, item) => sum + (item.income || item.amount || 0), 0);
        setTotalRewards(total);
        
        // Calculate today's rewards
        const today = new Date().toDateString();
        const todayTotal = history
          .filter(item => new Date(item.createdAt).toDateString() === today)
          .reduce((sum, item) => sum + (item.income || item.amount || 0), 0);
        setTodayRewards(todayTotal);
      } else {
        toast.error(response?.message || "Failed to fetch rank reward history");
        setAllRankRewardHistory([]);
      }
    } catch (err) {
      console.error('Rank Reward History Error:', err);
      toast.error("Failed to fetch rank reward history");
      setAllRankRewardHistory([]);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchRankRewardHistory();
  }, []);

  const columns = [
    {
      header: "S/N",
      accessor: "_id",
      cell: (_, rowIndex) => (
        <span className="font-medium text-white">{rowIndex + 1}</span>
      ),
    },
    {
      header: "Transaction ID",
      accessor: "id",
      cell: (row) => (
        <span className="font-medium text-blue-400 font-mono text-sm">
          {row?.id || `RNK-${row?._id?.slice(-8)}`}
        </span>
      ),
    },
    {
      header: "Rank Achieved",
      accessor: "level",
      cell: (row) => (
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🏆</span>
          <span className="font-bold text-yellow-400">
            {row?.level || row?.rank || "N/A"}
          </span>
        </div>
      ),
    },
    {
      header: "Reward Amount",
      accessor: "amount",
      cell: (row) => (
        <span className="font-bold text-green-400 text-lg">
          ${(row?.income || row?.amount || 0).toFixed(2)}
        </span>
      ),
    },
    {
      header: "Achievement Details",
      accessor: "remark",
      cell: (row) => (
        <span className="text-slate-300 text-sm">
          {row?.remark || `Achieved ${row?.level || row?.rank} rank`}
        </span>
      ),
    },
    {
      header: "Date Achieved",
      accessor: "createdAt",
      cell: (row) => (
        <span className="text-slate-300">
          {row?.createdAt ? new Date(row?.createdAt).toLocaleString() : "N/A"}
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
          {row?.status || "Completed"}
        </span>
      ),
    },
  ];

  const rankCards = [
    {
      title: "Current Rank",
      value: currentRank,
      subtitle: "Your current achievement level",
      icon: "🏆",
      gradient: "from-yellow-400 via-orange-500 to-red-500",
      iconBg: "bg-yellow-500/20",
      textColor: "text-yellow-400",
    },
    {
      title: "Total Rewards",
      value: `$${totalRewards.toFixed(2)}`,
      subtitle: "Lifetime rank rewards earned",
      icon: "💰",
      gradient: "from-green-400 via-emerald-500 to-teal-500",
      iconBg: "bg-green-500/20",
      textColor: "text-green-400",
    },
    {
      title: "Today's Rewards",
      value: `$${todayRewards.toFixed(2)}`,
      subtitle: "Rewards earned today",
      icon: "📈",
      gradient: "from-blue-400 via-indigo-500 to-purple-500",
      iconBg: "bg-blue-500/20",
      textColor: "text-blue-400",
    },
  ];

  if (nextRank) {
    let subtitle = '';
    if (nextRank.rank === 'Z-1') {
      subtitle = `Need: 10 qualified directs + 30 team members`;
    } else {
      subtitle = `Need: ${nextRank.direct} directs + ${nextRank.reqCount} ${nextRank.reqRank} legs`;
    }

    rankCards.push({
      title: "Next Target",
      value: nextRank.rank,
      subtitle: subtitle,
      icon: "🎯",
      gradient: "from-purple-400 via-pink-500 to-red-500",
      iconBg: "bg-purple-500/20",
      textColor: "text-purple-400",
    });
  }

  return (
    <div className="space-y-6 mt-5">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700/50">
        <div className="flex items-center space-x-3 mb-2">
          <span className="text-3xl">🏆</span>
          <h1 className="text-2xl font-bold text-white">Rank Reward History</h1>
        </div>
        <p className="text-slate-400">
          Track your rank achievements and rewards earned through the ranking system
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {rankCards.map((card, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 shadow-xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 group"
          >
            {/* Gradient Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
            />

            {/* Decorative Elements */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
            <div className="absolute -left-4 -bottom-4 w-20 h-20 bg-purple-500/10 rounded-full blur-xl" />

            <div className="relative z-10">
              {/* Icon */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`${card.iconBg} w-14 h-14 rounded-xl flex items-center justify-center text-3xl transform group-hover:scale-110 transition-transform duration-300 border border-slate-600/30`}
                >
                  {card.icon}
                </div>
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              </div>

              {/* Title */}
              <h3 className="text-slate-400 text-sm font-medium mb-2 uppercase tracking-wide">
                {card.title}
              </h3>

              {/* Value */}
              <div className={`text-2xl font-bold ${card.textColor} mb-2`}>
                {card.value}
              </div>

              {/* Subtitle */}
              <p className="text-slate-500 text-xs leading-relaxed">{card.subtitle}</p>

              {/* Bottom Accent */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Rank System Info */}
      <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-6 border border-blue-500/20">
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-2xl">📊</span>
          <h2 className="text-xl font-bold text-white">Rank System Overview</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { rank: 'Z-1', reward: '$30', requirement: '10 Directs + 30 Team' },
            { rank: 'Z-2', reward: '$100', requirement: '3 Z-1 Legs' },
            { rank: 'Z-3', reward: '$250', requirement: '3 Z-2 Legs' },
            { rank: 'Z-4', reward: '$500', requirement: '3 Z-3 Legs' },
            { rank: 'Z-5', reward: '$1,250', requirement: '3 Z-4 Legs' },
          ].map((item, index) => (
            <div key={index} className="bg-slate-800/50 rounded-xl p-4 border border-slate-600/30">
              <div className="text-center">
                <div className="text-yellow-400 font-bold text-lg mb-1">{item.rank}</div>
                <div className="text-green-400 font-semibold mb-2">{item.reward}</div>
                <div className="text-slate-400 text-xs">{item.requirement}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 overflow-hidden">
        <DataTable
          title="Rank Achievement History"
          columns={columns}
          data={allRankRewardHistory}
          pageSize={10}
        />
      </div>
    </div>
  );
};

export default UserRankRewardHistory;