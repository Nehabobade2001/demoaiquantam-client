import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setLoading } from "../../redux/slices/loadingSlice";
import { submitManualPayment, getUserManualPaymentHistory } from "../../api/manualPayment.api";
import { convertToBase64 } from "../../utils/base64converter";

const PAYMENT_METHODS = ["UPI", "Bank Transfer", "NEFT", "RTGS", "IMPS", "Other"];
const UPI_ID = "aiquantum@upi";
const BANK_DETAILS = {
    "Account Name": "AIQuantum Crypto Pvt Ltd",
    "Account Number": "1234567890",
    "IFSC Code": "HDFC0001234",
    "Bank": "HDFC Bank",
    "Branch": "Mumbai Main Branch",
};

const statusBadge = (status) => {
    const map = {
        Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
        Approved: "bg-green-500/20 text-green-400 border-green-500/30",
        Rejected: "bg-red-500/20 text-red-400 border-red-500/30",
    };
    return map[status] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
};

const ManualPayment = () => {
    const dispatch = useDispatch();
    const [tab, setTab] = useState("submit");
    const [history, setHistory] = useState([]);
    const [summary, setSummary] = useState({});
    const [screenshotPreview, setScreenshotPreview] = useState(null);
    const [usdInrRate, setUsdInrRate] = useState(null);
    const [rateLoading, setRateLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        name: "",
        inrAmount: "",
        transactionId: "",
        paymentMethod: "UPI",
        screenshot: "",
    });

    // Live converted USD value
    const usdAmount =
        usdInrRate && form.inrAmount && Number(form.inrAmount) > 0
            ? parseFloat((Number(form.inrAmount) / usdInrRate).toFixed(2))
            : 0;

    // Fetch live USD/INR rate
    const fetchRate = useCallback(async () => {
        setRateLoading(true);
        try {
            const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
            const data = await res.json();
            const rate = data?.rates?.INR;
            if (rate) {
                setUsdInrRate(rate);
            } else {
                toast.error("Could not fetch live exchange rate.");
            }
        } catch {
            toast.error("Exchange rate fetch failed. Please refresh.");
        } finally {
            setRateLoading(false);
        }
    }, []);

    const fetchHistory = useCallback(async () => {
        dispatch(setLoading(true));
        try {
            const res = await getUserManualPaymentHistory();
            if (res?.success) {
                setHistory(res.data.payments || []);
                setSummary(res.data.summary || {});
            }
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    useEffect(() => {
        fetchRate();
        fetchHistory();
    }, []);

    const handleScreenshot = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Screenshot must be under 5MB.");
            return;
        }
        const base64 = await convertToBase64(file);
        setForm((p) => ({ ...p, screenshot: base64 }));
        setScreenshotPreview(base64);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name.trim()) return toast.error("Please enter your name.");
        if (!form.inrAmount || Number(form.inrAmount) <= 0)
            return toast.error("Please enter INR amount.");
        if (!usdInrRate)
            return toast.error("Exchange rate not loaded. Please refresh.");
        if (usdAmount < 50)
            return toast.error(`Minimum deposit is $50. Please enter at least ₹${Math.ceil(50 * usdInrRate).toLocaleString("en-IN")}.`);
        if (!form.screenshot)
            return toast.error("Please upload payment screenshot.");

        setSubmitting(true);
        dispatch(setLoading(true));
        try {
            const res = await submitManualPayment({
                name: form.name.trim(),
                amount: usdAmount,                    // converted USD sent to backend
                inrAmount: Number(form.inrAmount),    // original INR for reference
                exchangeRate: usdInrRate,             // rate used for conversion
                transactionId: form.transactionId.trim() || undefined,
                paymentMethod: form.paymentMethod,
                screenshot: form.screenshot,
            });
            if (res?.success) {
                toast.success(res.message || "Payment submitted successfully!");
                setForm({ name: "", inrAmount: "", transactionId: "", paymentMethod: "UPI", screenshot: "" });
                setScreenshotPreview(null);
                fetchHistory();
                setTab("history");
            } else {
                toast.error(res?.message || "Submission failed.");
            }
        } finally {
            setSubmitting(false);
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="min-h-screen bg-background p-4 md:p-6">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* Header */}
                <div className="bg-card border border-medium rounded-2xl p-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary-green/20 rounded-xl flex items-center justify-center">
                                <i className="fa-solid fa-indian-rupee-sign text-primary-green text-xl"></i>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-light">Manual INR Payment</h1>
                                <p className="text-muted text-sm">Pay in INR — auto-converted to USD at live rate</p>
                            </div>
                        </div>
                        {/* Live Rate Badge */}
                        <div className="flex items-center gap-2 bg-primary-green/10 border border-primary-green/30 rounded-xl px-4 py-2">
                            <i className="fa-solid fa-arrow-right-arrow-left text-primary-green text-sm"></i>
                            {rateLoading ? (
                                <span className="text-muted text-sm">Fetching rate...</span>
                            ) : usdInrRate ? (
                                <span className="text-light text-sm font-semibold">
                                    1 USD = ₹{usdInrRate.toFixed(2)}
                                </span>
                            ) : (
                                <button onClick={fetchRate} className="text-red-400 text-sm hover:underline">
                                    Rate failed — Retry
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: "Total Requests", value: summary.total || 0, icon: "fa-list", color: "text-blue-400" },
                        { label: "Pending", value: summary.pending || 0, icon: "fa-clock", color: "text-yellow-400" },
                        { label: "Approved", value: summary.approved || 0, icon: "fa-check-circle", color: "text-green-400" },
                        { label: "Total Approved", value: `$${(summary.totalApprovedAmount || 0).toLocaleString()}`, icon: "fa-dollar-sign", color: "text-primary-green" },
                    ].map((card) => (
                        <div key={card.label} className="bg-card border border-medium rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-1">
                                <i className={`fa-solid ${card.icon} ${card.color} text-sm`}></i>
                                <span className="text-muted text-xs">{card.label}</span>
                            </div>
                            <p className={`text-xl font-bold ${card.color}`}>{card.value}</p>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="flex gap-2 bg-card border border-medium rounded-xl p-1 w-fit">
                    {["submit", "history"].map((t) => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                                tab === t ? "bg-primary-green text-white shadow" : "text-muted hover:text-light"
                            }`}
                        >
                            {t === "submit" ? "Submit Payment" : "Payment History"}
                        </button>
                    ))}
                </div>

                {tab === "submit" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {/* Left: Payment Info */}
                        <div className="space-y-4">
                            {/* UPI */}
                            <div className="bg-card border border-medium rounded-2xl p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                        <i className="fa-solid fa-mobile-screen text-blue-400"></i>
                                    </div>
                                    <h2 className="text-light font-semibold">UPI Payment</h2>
                                </div>
                                <div className="bg-background/50 border border-medium rounded-lg p-4 flex items-center justify-between">
                                    <div>
                                        <p className="text-muted text-xs mb-1">UPI ID</p>
                                        <p className="text-light font-mono font-semibold">{UPI_ID}</p>
                                    </div>
                                    <button
                                        onClick={() => { navigator.clipboard.writeText(UPI_ID); toast.success("UPI ID copied!"); }}
                                        className="text-primary-green hover:text-primary-green/80 transition-colors"
                                    >
                                        <i className="fa-solid fa-copy"></i>
                                    </button>
                                </div>
                            </div>

                            {/* Bank Details */}
                            <div className="bg-card border border-medium rounded-2xl p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                        <i className="fa-solid fa-building-columns text-purple-400"></i>
                                    </div>
                                    <h2 className="text-light font-semibold">Bank Transfer</h2>
                                </div>
                                <div className="space-y-2">
                                    {Object.entries(BANK_DETAILS).map(([key, val]) => (
                                        <div key={key} className="flex items-center justify-between bg-background/50 border border-medium rounded-lg px-4 py-2">
                                            <div>
                                                <p className="text-muted text-xs">{key}</p>
                                                <p className="text-light text-sm font-medium">{val}</p>
                                            </div>
                                            <button
                                                onClick={() => { navigator.clipboard.writeText(val); toast.success("Copied!"); }}
                                                className="text-primary-green hover:text-primary-green/80 transition-colors ml-2"
                                            >
                                                <i className="fa-solid fa-copy text-xs"></i>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Notes */}
                            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                                <div className="flex items-start gap-3">
                                    <i className="fa-solid fa-triangle-exclamation text-yellow-400 mt-0.5"></i>
                                    <div className="text-sm text-yellow-300 space-y-1">
                                        <p className="font-semibold text-yellow-400">Important Notes</p>
                                        <p>• Enter amount in <strong>INR (₹)</strong> — it will be auto-converted to USD</p>
                                        <p>• Minimum deposit is <strong>$50</strong> equivalent in INR</p>
                                        <p>• Conversion uses live exchange rate at time of submission</p>
                                        <p>• Admin will verify within 24 hours</p>
                                        <p>• Only one pending request allowed at a time</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Submit Form */}
                        <div className="bg-card border border-medium rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-primary-green/20 rounded-lg flex items-center justify-center">
                                    <i className="fa-solid fa-paper-plane text-primary-green"></i>
                                </div>
                                <h2 className="text-light font-semibold">Submit Payment Proof</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Name */}
                                <div>
                                    <label className="text-muted text-sm mb-1 block">Your Name <span className="text-red-400">*</span></label>
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                                        placeholder="Enter your full name"
                                        className="w-full bg-background border border-medium rounded-lg px-4 py-2.5 text-light placeholder:text-muted focus:outline-none focus:border-primary-green transition-colors"
                                    />
                                </div>

                                {/* INR Amount + Live Conversion */}
                                <div>
                                    <label className="text-muted text-sm mb-1 block">
                                        Amount in INR (₹) <span className="text-red-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted font-semibold">₹</span>
                                        <input
                                            type="number"
                                            min="1"
                                            value={form.inrAmount}
                                            onChange={(e) => setForm((p) => ({ ...p, inrAmount: e.target.value }))}
                                            placeholder="e.g. 5000"
                                            className="w-full bg-background border border-medium rounded-lg pl-8 pr-4 py-2.5 text-light placeholder:text-muted focus:outline-none focus:border-primary-green transition-colors"
                                        />
                                    </div>

                                    {/* Conversion Preview Box */}
                                    <div className={`mt-2 rounded-lg px-4 py-3 border flex items-center justify-between transition-all ${
                                        usdAmount >= 50
                                            ? "bg-primary-green/10 border-primary-green/30"
                                            : usdAmount > 0
                                            ? "bg-red-500/10 border-red-500/30"
                                            : "bg-background/50 border-medium/50"
                                    }`}>
                                        <div className="flex items-center gap-2">
                                            <i className="fa-solid fa-arrow-right-arrow-left text-muted text-xs"></i>
                                            <span className="text-muted text-xs">Converted Amount</span>
                                        </div>
                                        {rateLoading ? (
                                            <span className="text-muted text-sm">Loading rate...</span>
                                        ) : usdAmount > 0 ? (
                                            <div className="text-right">
                                                <span className={`font-bold text-lg ${usdAmount >= 50 ? "text-primary-green" : "text-red-400"}`}>
                                                    ${usdAmount.toLocaleString()}
                                                </span>
                                                {usdAmount < 50 && (
                                                    <p className="text-red-400 text-xs">Min $50 required</p>
                                                )}
                                            </div>
                                        ) : (
                                            <span className="text-muted text-sm">Enter INR amount above</span>
                                        )}
                                    </div>

                                    {/* Rate info */}
                                    {usdInrRate && (
                                        <p className="text-muted text-xs mt-1">
                                            Live rate: 1 USD = ₹{usdInrRate.toFixed(2)}
                                            <button
                                                type="button"
                                                onClick={fetchRate}
                                                className="ml-2 text-primary-green hover:underline"
                                            >
                                                <i className="fa-solid fa-rotate-right text-xs mr-1"></i>Refresh
                                            </button>
                                        </p>
                                    )}
                                </div>

                                {/* Payment Method */}
                                <div>
                                    <label className="text-muted text-sm mb-1 block">Payment Method <span className="text-red-400">*</span></label>
                                    <select
                                        value={form.paymentMethod}
                                        onChange={(e) => setForm((p) => ({ ...p, paymentMethod: e.target.value }))}
                                        className="w-full bg-background border border-medium rounded-lg px-4 py-2.5 text-light focus:outline-none focus:border-primary-green transition-colors"
                                    >
                                        {PAYMENT_METHODS.map((m) => (
                                            <option key={m} value={m}>{m}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Transaction ID */}
                                <div>
                                    <label className="text-muted text-sm mb-1 block">
                                        Transaction ID / UTR <span className="text-muted text-xs">(Optional)</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={form.transactionId}
                                        onChange={(e) => setForm((p) => ({ ...p, transactionId: e.target.value }))}
                                        placeholder="Enter UTR / Transaction reference"
                                        className="w-full bg-background border border-medium rounded-lg px-4 py-2.5 text-light placeholder:text-muted focus:outline-none focus:border-primary-green transition-colors"
                                    />
                                </div>

                                {/* Screenshot */}
                                <div>
                                    <label className="text-muted text-sm mb-1 block">Payment Screenshot <span className="text-red-400">*</span></label>
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-medium rounded-lg cursor-pointer hover:border-primary-green transition-colors bg-background/50">
                                        {screenshotPreview ? (
                                            <img src={screenshotPreview} alt="preview" className="h-full w-full object-contain rounded-lg p-1" />
                                        ) : (
                                            <div className="text-center">
                                                <i className="fa-solid fa-cloud-arrow-up text-2xl text-muted mb-2"></i>
                                                <p className="text-muted text-sm">Click to upload screenshot</p>
                                                <p className="text-muted text-xs">PNG, JPG up to 5MB</p>
                                            </div>
                                        )}
                                        <input type="file" accept="image/*" className="hidden" onChange={handleScreenshot} />
                                    </label>
                                    {screenshotPreview && (
                                        <button
                                            type="button"
                                            onClick={() => { setScreenshotPreview(null); setForm((p) => ({ ...p, screenshot: "" })); }}
                                            className="mt-1 text-xs text-red-400 hover:text-red-300"
                                        >
                                            <i className="fa-solid fa-trash mr-1"></i>Remove
                                        </button>
                                    )}
                                </div>

                                {/* Submit Summary */}
                                {usdAmount >= 50 && (
                                    <div className="bg-primary-green/10 border border-primary-green/30 rounded-lg px-4 py-3 text-sm space-y-1">
                                        <div className="flex justify-between">
                                            <span className="text-muted">You Pay (INR)</span>
                                            <span className="text-light font-semibold">₹{Number(form.inrAmount).toLocaleString("en-IN")}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted">Exchange Rate</span>
                                            <span className="text-light">1 USD = ₹{usdInrRate?.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between border-t border-primary-green/20 pt-1 mt-1">
                                            <span className="text-muted font-semibold">Deposit Amount (USD)</span>
                                            <span className="text-primary-green font-bold text-base">${usdAmount}</span>
                                        </div>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={submitting || rateLoading || !usdInrRate}
                                    className="w-full py-3 bg-primary-green hover:bg-primary-green/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all"
                                >
                                    {submitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <i className="fa-solid fa-spinner animate-spin"></i> Submitting...
                                        </span>
                                    ) : (
                                        <span>
                                            <i className="fa-solid fa-paper-plane mr-2"></i>
                                            Submit Payment {usdAmount >= 50 ? `($${usdAmount})` : ""}
                                        </span>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {tab === "history" && (
                    <div className="bg-card border border-medium rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-primary-green/20 rounded-lg flex items-center justify-center">
                                <i className="fa-solid fa-history text-primary-green"></i>
                            </div>
                            <h2 className="text-light font-semibold">Payment History</h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-medium">
                                        {["#", "Payment ID", "INR Paid", "USD Credited", "Rate", "Method", "Date", "Status", "Remark"].map((h) => (
                                            <th key={h} className="text-left py-3 px-4 text-muted font-medium text-sm whitespace-nowrap">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.length > 0 ? (
                                        history.map((p, i) => (
                                            <tr key={p._id} className="border-b border-medium/30 hover:bg-primary-green/5 transition-colors">
                                                <td className="py-3 px-4 text-muted text-sm">{i + 1}</td>
                                                <td className="py-3 px-4 text-light font-mono text-xs">{p.id}</td>
                                                <td className="py-3 px-4 text-blue-400 font-semibold">
                                                    {p.inrAmount ? `₹${Number(p.inrAmount).toLocaleString("en-IN")}` : "-"}
                                                </td>
                                                <td className="py-3 px-4 text-primary-green font-bold">${p.amount?.toLocaleString()}</td>
                                                <td className="py-3 px-4 text-muted text-xs">
                                                    {p.exchangeRate ? `₹${Number(p.exchangeRate).toFixed(2)}` : "-"}
                                                </td>
                                                <td className="py-3 px-4 text-light text-sm">{p.paymentMethod}</td>
                                                <td className="py-3 px-4 text-muted text-sm whitespace-nowrap">
                                                    {new Date(p.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${statusBadge(p.status)}`}>
                                                        {p.status}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-muted text-sm">{p.adminRemark || "-"}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="9" className="py-10 text-center text-muted">
                                                <i className="fa-solid fa-inbox text-3xl mb-2 block"></i>
                                                No payment history found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManualPayment;
