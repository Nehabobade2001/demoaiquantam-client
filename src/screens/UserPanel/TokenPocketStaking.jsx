import React, { useEffect, useState } from "react";
import {
    Wallet,
    TrendingUp,
    Lock,
    Unlock,
    ArrowUpRight,
    CheckCircle,
    AlertCircle,
    DollarSign,
    Clock,
    Shield
} from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
    connectTokenPocketWallet,
    getWalletStatus,
    initiateStaking,
    getStakingStatus,
    unstakeAmount,
    disconnectWallet
} from "../../api/staking.api";
import { setLoading } from "../../redux/slices/loadingSlice";

const TokenPocketStaking = () => {
    const [walletConnected, setWalletConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState("");
    const [stakeAmount, setStakeAmount] = useState("");
    const [stakingType, setStakingType] = useState("Flexible");
    const [lockPeriod, setLockPeriod] = useState(0);
    const [apy, setApy] = useState(0);
    const [currency, setCurrency] = useState("USDT");
    const [stakingHistory, setStakingHistory] = useState([]);
    const [totalStaked, setTotalStaked] = useState(0);
    const [totalEarned, setTotalEarned] = useState(0);
    const dispatch = useDispatch();

    // Lock period options with APY
    const lockPeriodOptions = [
        { days: 0, label: "Flexible", apy: 5 },
        { days: 30, label: "30 Days", apy: 7 },
        { days: 60, label: "60 Days", apy: 9 },
        { days: 90, label: "90 Days", apy: 12 },
        { days: 180, label: "180 Days", apy: 16 },
        { days: 365, label: "1 Year", apy: 20 },
    ];

    // Load wallet status on mount
    useEffect(() => {
        loadWalletStatus();
        if (walletConnected) {
            loadStakingStatus();
        }
    }, [walletConnected]);

    const loadWalletStatus = async () => {
        try {
            const res = await getWalletStatus();
            if (res?.success && res?.data?.isConnected) {
                setWalletConnected(true);
                setWalletAddress(res.data.walletAddress);
            }
        } catch (error) {
            console.log("Error loading wallet status:", error);
        }
    };

    const loadStakingStatus = async () => {
        try {
            const res = await getStakingStatus();
            if (res?.success && res?.data) {
                setStakingHistory(res.data.stakingHistory || []);
                setTotalStaked(res.data.totalStaked || 0);
                setTotalEarned(res.data.totalEarnedRewards || 0);
            }
        } catch (error) {
            console.log("Error loading staking status:", error);
        }
    };

    const handleConnectWallet = async () => {
        // In production, this would trigger TokenPocket wallet connection
        // For now, we'll prompt for wallet address
        const address = prompt("Enter your TokenPocket wallet address:");
        if (!address) return;

        try {
            dispatch(setLoading(true));
            const res = await connectTokenPocketWallet({
                walletAddress: address,
                signature: "mock_signature" // In production, get actual signature
            });

            if (res?.success) {
                setWalletConnected(true);
                setWalletAddress(address);
                toast.success("TokenPocket wallet connected successfully!");
            } else {
                toast.error(res?.message || "Failed to connect wallet");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to connect wallet");
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleDisconnectWallet = async () => {
        try {
            dispatch(setLoading(true));
            const res = await disconnectWallet();

            if (res?.success) {
                setWalletConnected(false);
                setWalletAddress("");
                setStakingHistory([]);
                setTotalStaked(0);
                setTotalEarned(0);
                toast.success("Wallet disconnected successfully!");
            } else {
                toast.error(res?.message || "Failed to disconnect wallet");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to disconnect wallet");
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleStake = async () => {
        if (!stakeAmount || Number(stakeAmount) <= 0) {
            toast.error("Please enter a valid staking amount");
            return;
        }

        try {
            dispatch(setLoading(true));
            const res = await initiateStaking({
                amount: Number(stakeAmount),
                currency,
                stakingType,
                lockPeriod,
                apy
            });

            if (res?.success) {
                toast.success("Staking initiated successfully!");
                setStakeAmount("");
                loadStakingStatus(); // Reload staking status
            } else {
                toast.error(res?.message || "Failed to initiate staking");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to initiate staking");
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleUnstake = async (stakingId) => {
        if (!confirm("Are you sure you want to unstake this amount?")) return;

        try {
            dispatch(setLoading(true));
            const res = await unstakeAmount({ stakingId });

            if (res?.success) {
                toast.success(`Unstaked successfully! Earned: $${res.data.earnedRewards}`);
                loadStakingStatus(); // Reload staking status
            } else {
                toast.error(res?.message || "Failed to unstake");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to unstake");
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleLockPeriodChange = (days) => {
        setLockPeriod(days);
        const selectedOption = lockPeriodOptions.find(opt => opt.days === days);
        if (selectedOption) {
            setApy(selectedOption.apy);
            setStakingType(days === 0 ? "Flexible" : "Locked");
        }
    };

    const formatAmount = (amt) => {
        return amt ? Number(amt).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0.00";
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="relative bg-gradient-to-br from-neutral-white via-neutral-gray-50 to-neutral-white border border-light rounded-3xl p-8 shadow-large">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-gradient-to-br from-primary-green/20 to-accent-green/20 border border-primary-green/30 rounded-2xl">
                            <TrendingUp className="w-8 h-8 text-primary-green" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-primary mb-1">TokenPocket Staking</h2>
                            <p className="text-secondary">Earn passive income by staking your assets</p>
                        </div>
                    </div>

                    {walletConnected && (
                        <button
                            onClick={handleDisconnectWallet}
                            className="px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl hover:bg-red-500/20 transition-all"
                        >
                            Disconnect
                        </button>
                    )}
                </div>
            </div>

            {!walletConnected ? (
                /* Wallet Connection Screen */
                <div className="relative bg-gradient-to-br from-neutral-white via-neutral-gray-50 to-neutral-white border border-light rounded-3xl p-12 shadow-large text-center">
                    <div className="max-w-md mx-auto space-y-6">
                        <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-3xl flex items-center justify-center">
                            <Wallet className="w-12 h-12 text-blue-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-primary">Connect TokenPocket Wallet</h3>
                        <p className="text-secondary">
                            Connect your TokenPocket wallet to start staking and earning rewards
                        </p>
                        <button
                            onClick={handleConnectWallet}
                            className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl font-bold text-lg transition-all shadow-xl shadow-blue-500/25 hover:scale-[1.02]"
                        >
                            <div className="flex items-center justify-center gap-3">
                                <Wallet className="w-5 h-5" />
                                <span>Connect Wallet</span>
                            </div>
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="relative bg-gradient-to-br from-neutral-white via-neutral-gray-50 to-neutral-white border border-light rounded-2xl p-6 shadow-large">
                            <div className="flex items-center gap-3 mb-2">
                                <Shield className="w-5 h-5 text-blue-500" />
                                <span className="text-sm text-secondary">Total Staked</span>
                            </div>
                            <p className="text-3xl font-bold text-primary">${formatAmount(totalStaked)}</p>
                        </div>

                        <div className="relative bg-gradient-to-br from-neutral-white via-neutral-gray-50 to-neutral-white border border-light rounded-2xl p-6 shadow-large">
                            <div className="flex items-center gap-3 mb-2">
                                <TrendingUp className="w-5 h-5 text-green-500" />
                                <span className="text-sm text-secondary">Total Earned</span>
                            </div>
                            <p className="text-3xl font-bold text-success">${formatAmount(totalEarned)}</p>
                        </div>

                        <div className="relative bg-gradient-to-br from-neutral-white via-neutral-gray-50 to-neutral-white border border-light rounded-2xl p-6 shadow-large">
                            <div className="flex items-center gap-3 mb-2">
                                <Wallet className="w-5 h-5 text-cyan-500" />
                                <span className="text-sm text-secondary">Connected Wallet</span>
                            </div>
                            <p className="text-sm font-mono text-primary truncate">
                                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                            </p>
                        </div>
                    </div>

                    {/* Staking Form */}
                    <div className="relative bg-gradient-to-br from-neutral-white via-neutral-gray-50 to-neutral-white border border-light rounded-3xl p-8 shadow-large">
                        <h3 className="text-2xl font-bold text-primary mb-6">New Staking</h3>
                        <div className="space-y-6">
                            {/* Amount Input */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
                                    <DollarSign className="w-4 h-4 text-green-400" />
                                    Staking Amount
                                </label>
                                <input
                                    type="number"
                                    value={stakeAmount}
                                    onChange={(e) => setStakeAmount(e.target.value)}
                                    placeholder="Enter amount"
                                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl py-4 px-5 text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    min="0"
                                />
                            </div>

                            {/* Currency Selection */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-3">Currency</label>
                                <select
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl py-4 px-5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="USDT">USDT</option>
                                    <option value="SafePalCoin">SafePal Coin</option>
                                </select>
                            </div>

                            {/* Lock Period Selection */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-3">Lock Period & APY</label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {lockPeriodOptions.map((option) => (
                                        <button
                                            key={option.days}
                                            onClick={() => handleLockPeriodChange(option.days)}
                                            className={`p-4 rounded-xl border transition-all ${lockPeriod === option.days
                                                ? "bg-blue-500/20 border-blue-500 text-blue-400"
                                                : "bg-slate-800/30 border-slate-700/30 text-slate-400 hover:border-blue-500/50"
                                                }`}
                                        >
                                            <div className="font-semibold">{option.label}</div>
                                            <div className="text-sm text-green-400">{option.apy}% APY</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Stake Button */}
                            <button
                                onClick={handleStake}
                                disabled={!stakeAmount || Number(stakeAmount) <= 0}
                                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all ${!stakeAmount || Number(stakeAmount) <= 0
                                    ? "bg-slate-700/50 text-slate-500 cursor-not-allowed"
                                    : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-xl shadow-blue-500/25 hover:scale-[1.02]"
                                    }`}
                            >
                                <div className="flex items-center justify-center gap-3">
                                    {lockPeriod === 0 ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                                    <span>Stake Now ({apy}% APY)</span>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Staking History */}
                    <div className="relative bg-gradient-to-br from-neutral-white via-neutral-gray-50 to-neutral-white border border-light rounded-3xl p-8 shadow-large">
                        <h3 className="text-2xl font-bold text-primary mb-6">Staking History</h3>
                        {stakingHistory.length === 0 ? (
                            <div className="text-center py-12 text-secondary">
                                <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <p>No staking history yet</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {stakingHistory.map((staking) => (
                                    <div
                                        key={staking.id}
                                        className="flex items-center justify-between p-5 bg-slate-800/30 border border-slate-700/30 rounded-xl"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-lg font-bold text-white">${formatAmount(staking.amount)}</span>
                                                <span className={`px-2 py-1 rounded text-xs font-semibold ${staking.status === "Active" ? "bg-green-500/20 text-green-400" :
                                                    staking.status === "Completed" ? "bg-blue-500/20 text-blue-400" :
                                                        "bg-slate-500/20 text-slate-400"
                                                    }`}>
                                                    {staking.status}
                                                </span>
                                                <span className="text-sm text-slate-400">{staking.stakingType}</span>
                                            </div>
                                            <div className="text-sm text-slate-400 space-y-1">
                                                <div>APY: <span className="text-green-400">{staking.apy}%</span></div>
                                                <div>Earned: <span className="text-green-400">${formatAmount(staking.earnedRewards)}</span></div>
                                                {staking.maturityDate && (
                                                    <div>Maturity: {new Date(staking.maturityDate).toLocaleDateString()}</div>
                                                )}
                                            </div>
                                        </div>
                                        {staking.canUnstake && staking.status === "Active" && (
                                            <button
                                                onClick={() => handleUnstake(staking.id)}
                                                className="px-4 py-2 bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl hover:bg-green-500/20 transition-all"
                                            >
                                                Unstake
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default TokenPocketStaking;
