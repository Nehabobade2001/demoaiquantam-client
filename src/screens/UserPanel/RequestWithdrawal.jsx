import React, { useEffect, useState } from "react";
import { Wallet, DollarSign, ArrowDownLeft, AlertCircle, CheckCircle, Copy } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { verifyWithdrawalDetails, getAvailableIncomeBalance } from "../../api/user.api";
import { setLoading } from "../../redux/slices/loadingSlice";

const ADMIN_CHARGE_PERCENT = 10;
const MIN_WITHDRAWAL = 20;
const getMoneySymbol = () => "$";

const RequestWithdrawal = () => {
  const [amount, setAmount] = useState("");
  const [copied, setCopied] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const dispatch = useDispatch();

  const walletAddress = useSelector((state) => state?.isLoggedUser?.data?.account);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAvailableIncomeBalance();
        if (res?.success && res?.data) {
          setWithdrawalAmount(Number(res.data.totalIncome ?? 0));
        }
      } catch (error) {
        console.log("Error fetching withdrawal data:", error);
      }
    };
    fetchData();
  }, []);

  const formatAmount = (amt) => (amt ? Number(amt).toLocaleString() : "0");
  const formatVal = (amt) => {
    if (!amt || Number(amt) <= 0) return "0.00";
    return Number(amt).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const numAmount = Number(amount);
  const adminChargeAmount = numAmount > 0 ? (numAmount * ADMIN_CHARGE_PERCENT) / 100 : 0;
  const netAmount = numAmount - adminChargeAmount;
  const remainingAmount = withdrawalAmount - numAmount >= 0 ? withdrawalAmount - numAmount : 0;
  const isValid = amount && numAmount >= MIN_WITHDRAWAL && numAmount <= withdrawalAmount;

  const handleWithdrawalRequest = async () => {
    if (numAmount < MIN_WITHDRAWAL) { toast.error(`Minimum withdrawal amount is $${MIN_WITHDRAWAL}.`); return; }
    if (numAmount > withdrawalAmount) { toast.error("Amount exceeds available balance."); return; }
    try {
      dispatch(setLoading(true));
      const res = await verifyWithdrawalDetails({ amount: numAmount, walletAddress, currency: "USDT" });
      if (res?.success) {
        setWithdrawalAmount(withdrawalAmount - numAmount);
        toast.success(res?.message || "Withdrawal request submitted successfully");
        setAmount("");
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative bg-gradient-to-br from-neutral-white via-neutral-gray-50 to-neutral-white border border-light rounded-3xl p-8 shadow-large hover:shadow-green transition-all duration-500 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-green/5 via-transparent to-accent-green/5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-primary-green/10 via-transparent to-transparent rounded-full blur-3xl"></div>

        {/* Header */}
        <div className="relative flex items-center gap-4 mb-8">
          <div className="p-4 bg-gradient-to-br from-primary-green/20 to-accent-green/20 border border-primary-green/30 rounded-2xl shadow-lg shadow-primary-green/10">
            <ArrowDownLeft className="w-8 h-8 text-primary-green" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-primary mb-1">Withdrawal Request</h2>
            <p className="text-secondary">Withdraw your funds securely to your wallet</p>
          </div>
        </div>

        {/* Info Notice */}
        <div className="relative mb-8 p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <div>
              <span className="text-amber-700 font-semibold">Minimum Withdrawal: {getMoneySymbol()} {MIN_WITHDRAWAL}</span>
              <p className="text-amber-600 text-sm mt-1">
                Admin charges <strong>{ADMIN_CHARGE_PERCENT}%</strong> will be deducted from your withdrawal amount.
              </p>
            </div>
          </div>
        </div>

        <div className="relative space-y-6 mb-8">
          {/* Available Balance */}
          <div className="mb-2 text-sm text-secondary flex justify-between items-center">
            <span>Available to withdraw:</span>
            <span className="font-bold text-success">{getMoneySymbol()}{formatAmount(withdrawalAmount)}</span>
          </div>

          {/* Amount Input */}
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
              <DollarSign className="w-4 h-4 text-green-400" />
              Withdrawal Amount ({getMoneySymbol()})
            </label>
            <div className="relative">
              <input
                type="number"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount in USDT"
                className="remove-arrows w-full bg-slate-800/50 border border-slate-700/50 rounded-xl py-4 px-5 text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 transition-all duration-300"
                onKeyDown={(e) => ['ArrowUp', 'ArrowDown', 'e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
                onWheel={(e) => e.target.blur()}
                min="0"
              />
              {amount && (
                <div className="absolute right-5 top-1/2 -translate-y-1/2">
                  <span className="text-blue-400 font-bold text-sm">{getMoneySymbol()}{formatAmount(amount)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Remaining Balance */}
          {amount && (
            <div className="text-sm text-slate-400 flex justify-between items-center">
              <span>Remaining Balance:</span>
              <span className={`font-semibold ${numAmount > withdrawalAmount ? "text-red-400" : "text-yellow-400"}`}>
                {getMoneySymbol()}{formatAmount(remainingAmount)}
              </span>
            </div>
          )}

          {/* Wallet Address */}
          <div className="group mt-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
              <Wallet className="w-4 h-4 text-cyan-400" />
              Destination Wallet Address
            </label>
            <div className="relative">
              <input
                type="text"
                value={walletAddress}
                disabled
                className="w-full bg-slate-800/30 border border-slate-700/30 rounded-xl py-4 px-5 pr-12 text-slate-300 text-sm font-mono cursor-not-allowed"
              />
              <button
                onClick={copyToClipboard}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-700/50 rounded-lg transition-colors duration-200"
                title="Copy address"
              >
                {copied ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-slate-400 hover:text-blue-400" />}
              </button>
              {copied && (
                <div className="absolute -top-8 right-0 bg-green-500/20 border border-green-500/30 text-green-400 text-xs px-2 py-1 rounded-lg">Copied!</div>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              Funds will be sent to this wallet address
            </p>
          </div>
        </div>

        {/* Withdrawal Summary */}
        {isValid && (
          <div className="relative mb-8 p-5 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              Withdrawal Summary
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Requested Amount:</span>
                <span className="text-white font-semibold">{getMoneySymbol()}{formatAmount(amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-orange-300">Admin Charges ({ADMIN_CHARGE_PERCENT}%):</span>
                <span className="text-orange-400 font-semibold">-{getMoneySymbol()}{formatVal(adminChargeAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Destination:</span>
                <span className="text-cyan-400 font-mono text-xs">{walletAddress?.slice(0, 8)}...{walletAddress?.slice(-6)}</span>
              </div>
              <div className="flex justify-between border-t border-slate-600/30 pt-2 mt-3">
                <span className="text-slate-300 font-semibold">You will receive:</span>
                <span className="text-green-400 font-bold text-lg">{getMoneySymbol()}{formatVal(netAmount)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleWithdrawalRequest}
          disabled={!isValid}
          className={`relative w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 overflow-hidden group ${
            !isValid
              ? "bg-slate-700/50 text-slate-500 cursor-not-allowed border border-slate-600/30"
              : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-xl shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98] border border-blue-500/30"
          }`}
        >
          <div className="relative flex items-center justify-center gap-3">
            <ArrowDownLeft className="w-5 h-5" />
            <span>
              {!amount || numAmount < MIN_WITHDRAWAL
                ? "Enter Valid Amount"
                : numAmount > withdrawalAmount
                ? "Amount Exceeds Balance"
                : `Confirm Withdrawal ${getMoneySymbol()}${formatAmount(amount)}`}
            </span>
          </div>
        </button>

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-slate-800/30 border border-slate-700/30 rounded-xl">
          <p className="text-xs text-slate-400 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
            <span>Withdrawal will be processed within 24 hours after submission.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RequestWithdrawal;
