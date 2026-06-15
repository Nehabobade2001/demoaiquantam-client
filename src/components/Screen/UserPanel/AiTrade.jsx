import React, { useEffect, useState, useMemo } from "react";
import { fetchCoinMarkets } from "../../../api/extra.api";
import { setLoading } from "../../../redux/slices/loadingSlice";
import { getAllTradingIncomeHistory, tradeInAi, getAiTradeStatus } from "../../../api/user.api";
import { useDispatch, useSelector } from "react-redux";
import LiveMarketChart from "./LiveMarketChart";
import CoinListItem from "./CoinListItem";
import DataTable from "./DataTable";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

// Returns seconds remaining until 23:59:59 today
const getSecondsUntilMidnight = () => {
  const now = new Date();
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return Math.max(0, Math.floor((end - now) / 1000));
};

const AiTrade = () => {
  const [countdownTime, setCountdownTime] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [allCoins, setAllCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [timeframe, setTimeframe] = useState("30");
  const dispatch = useDispatch();

  const aiTradeActivatedToday = useSelector(
    (state) => state?.isLoggedUser?.data?.aiTradeActivatedToday
  );
  const [allTradingIncomeHistory, setAllTradingIncomeHistory] = useState([]);
  const location = useLocation();
  const data = location?.state;

  const fetchAllTradingIncomeHistory = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getAllTradingIncomeHistory();
      if (response?.success) {
        setAllTradingIncomeHistory(response?.data?.history);
      } else {
        setAllTradingIncomeHistory([]);
        toast.error(response?.message || "Something went wrong");
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchAllTradingIncomeHistory();
  }, []);

  const filteredIncomeHistory =
    data === "today"
      ? allTradingIncomeHistory.filter((item) => {
          const d = new Date(item.createdAt);
          const now = new Date();
          return d.toDateString() === now.toDateString();
        })
      : allTradingIncomeHistory;

  const columns = [
    { header: "S/N", accessor: "_id", cell: (row, rowIndex) => <span className="font-medium text-white">{rowIndex + 1}</span> },
    { header: "User ID", accessor: "id", cell: (row) => <span className="font-medium text-white">{row?.user?.username || "N/A"}</span>, searchValue: (row) => row?.user?.username },
    { header: "Package", accessor: "package.title", cell: (row) => <span className="font-medium text-white">{row?.package?.title || "N/A"}</span>, searchValue: (row) => row?.package?.title },
    { header: "Amount", accessor: "amount", cell: (row) => <span className="font-medium text-white text-nowrap">$ {row?.amount}</span> },
    { header: "Income", accessor: "income", cell: (row) => <span className="font-medium text-green-400">$ {row?.income?.toFixed(2)}</span> },
    { header: "Percentage", accessor: "percentage", cell: (row) => <span className="font-medium text-white">{row?.percentage?.toFixed(2)}%</span> },
    { header: "Reward Paid", accessor: "rewardPaid", cell: (row) => <span className="font-medium text-white">{row?.rewardPaid}</span> },
    { header: "Status", accessor: "status", cell: (row) => <span className={`font-medium ${row?.status === "Completed" ? "text-green-500" : "text-yellow-400"}`}>{row?.status}</span> },
    { header: "Created At", accessor: "createdAt", cell: (row) => <span className="text-slate-300">{new Date(row?.createdAt).toLocaleString()}</span> },
  ];

  // Countdown: tick every second, reset at midnight
  useEffect(() => {
    if (!isButtonDisabled) return;
    const interval = setInterval(() => {
      const remaining = getSecondsUntilMidnight();
      if (remaining <= 0) {
        setIsButtonDisabled(false);
        setCountdownTime(0);
        clearInterval(interval);
      } else {
        setCountdownTime(remaining);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isButtonDisabled]);

  const timeframeOptions = [
    { label: "24H", value: "1" },
    { label: "7D", value: "7" },
    { label: "1M", value: "30" },
    { label: "3M", value: "90" },
  ];

  const activeTimeframeLabel =
    timeframeOptions.find((opt) => opt.value === timeframe)?.label || `${timeframe} Days`;

  const fetchAllCoins = async () => {
    dispatch(setLoading(true));
    try {
      const coinData = await fetchCoinMarkets();
      setAllCoins(coinData);
      setSelectedCoin(coinData?.[0]);
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchAllCoins();
    const interval = setInterval(fetchAllCoins, 60000);
    return () => clearInterval(interval);
  }, []);

  // Fetch AI Trade Status — use remaining time until midnight if already traded today
  useEffect(() => {
    const fetchAiTradeStatus = async () => {
      try {
        const res = await getAiTradeStatus();
        console.log("[AiTrade] Status:", res);
        if (res?.success && !res?.data?.canTrade) {
          setIsButtonDisabled(true);
          // Use backend remainingTime but cap it at seconds until midnight
          const backendRemaining = res?.data?.remainingTime || 0;
          const untilMidnight = getSecondsUntilMidnight();
          setCountdownTime(Math.min(backendRemaining, untilMidnight));
        } else {
          setIsButtonDisabled(false);
          setCountdownTime(0);
        }
      } catch (error) {
        console.error("Error fetching AI trade status:", error);
      }
    };
    fetchAiTradeStatus();
  }, []);

  // Sync with Redux state
  useEffect(() => {
    if (aiTradeActivatedToday === true) {
      setIsButtonDisabled(true);
      setCountdownTime(getSecondsUntilMidnight());
    } else if (aiTradeActivatedToday === false) {
      setIsButtonDisabled(false);
      setCountdownTime(0);
    }
  }, [aiTradeActivatedToday]);

  const handleAiTradeClick = async () => {
    dispatch(setLoading(true));
    try {
      const res = await tradeInAi();
      if (res?.success) {
        toast.success(res?.message);
        setIsButtonDisabled(true);
        setCountdownTime(getSecondsUntilMidnight()); // countdown until midnight
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error trading in AI:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const formatCountdown = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const filteredCoins = useMemo(() => {
    return allCoins?.filter(
      (coin) =>
        coin?.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        coin?.symbol?.toLowerCase().includes(searchTerm?.toLowerCase())
    );
  }, [allCoins, searchTerm]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mt-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-800/40 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-4 gap-4">
              {selectedCoin && (
                <div className="flex items-center gap-3">
                  <img src={selectedCoin.image} alt={selectedCoin.name} className="w-8 h-8" />
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      {selectedCoin.name} ({selectedCoin.symbol.toUpperCase()})
                    </h2>
                    <p className="text-sm text-slate-400">Last {activeTimeframeLabel}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2 bg-slate-900/50 p-1 rounded-lg">
                {timeframeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setTimeframe(opt.value)}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                      timeframe === opt.value ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <LiveMarketChart coinId={selectedCoin?.id} days={timeframe} />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <button
              onClick={handleAiTradeClick}
              disabled={isButtonDisabled}
              className={`flex items-center justify-center gap-3 w-full p-4 rounded-xl font-semibold text-lg transition-colors shadow-lg focus:outline-none focus:ring-2 ${
                isButtonDisabled
                  ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-500 hover:to-emerald-500 shadow-green-600/20 focus:ring-green-400 cursor-pointer"
              }`}
            >
              <i className="fa-solid fa-robot"></i>
              <span>
                {isButtonDisabled
                  ? `Next trade in ${formatCountdown(countdownTime)}`
                  : "Start AI Trade"}
              </span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-1 bg-slate-800/40 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-4 flex flex-col h-[600px]">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search coin..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-full py-2 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
          </div>
          <div className="flex-1 overflow-y-auto pr-2">
            {filteredCoins?.map((coin, index) => (
              <CoinListItem key={`coin-${index}`} coin={coin} onSelect={setSelectedCoin} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiTrade;
