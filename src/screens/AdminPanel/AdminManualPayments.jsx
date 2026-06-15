import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { setLoading } from "../../redux/slices/loadingSlice";
import {
    getAllManualPaymentRequests,
    getManualPaymentDetail,
    approveManualPayment,
    rejectManualPayment,
} from "../../api/manualPayment.api";

const STATUS_FILTERS = ["All", "Pending", "Approved", "Rejected"];

const statusBadge = (status) => {
    const map = {
        Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
        Approved: "bg-green-500/20 text-green-400 border-green-500/30",
        Rejected: "bg-red-500/20 text-red-400 border-red-500/30",
    };
    return map[status] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
};

const DetailModal = ({ payment, onClose, onApprove, onReject }) => {
    const [remark, setRemark] = useState("");
    const [acting, setActing] = useState(false);

    if (!payment) return null;

    const handleApprove = async () => {
        setActing(true);
        await onApprove(payment.id, remark);
        setActing(false);
    };

    const handleReject = async () => {
        if (!remark.trim()) return toast.error("Please enter a rejection reason.");
        setActing(true);
        await onReject(payment.id, remark);
        setActing(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-slate-700">
                    <h2 className="text-white font-bold text-lg">Payment Request Detail</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <i className="fa-solid fa-xmark text-xl"></i>
                    </button>
                </div>

                <div className="p-6 space-y-5">
                    {/* User Info */}
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: "Payment ID", value: payment.id },
                            { label: "Status", value: payment.status, badge: true },
                            { label: "Username", value: payment.user?.username || "-" },
                            { label: "Email", value: payment.user?.email || "-" },
                            { label: "Sender Name", value: payment.name },
                            { label: "Amount", value: `$${payment.amount?.toLocaleString()}`, green: true },
                            { label: "Payment Method", value: payment.paymentMethod },
                            { label: "Transaction ID", value: payment.transactionId || "-" },
                            { label: "Submitted On", value: new Date(payment.createdAt).toLocaleString() },
                            { label: "Reviewed By", value: payment.reviewedBy?.username || "-" },
                        ].map(({ label, value, badge, green }) => (
                            <div key={label} className="bg-slate-800/50 rounded-lg p-3">
                                <p className="text-slate-400 text-xs mb-1">{label}</p>
                                {badge ? (
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${statusBadge(value)}`}>{value}</span>
                                ) : (
                                    <p className={`font-medium text-sm ${green ? "text-green-400" : "text-white"}`}>{value}</p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Screenshot */}
                    {payment.screenshotUrl && (
                        <div>
                            <p className="text-slate-400 text-sm mb-2">Payment Screenshot</p>
                            <a href={payment.screenshotUrl} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={payment.screenshotUrl}
                                    alt="Payment Screenshot"
                                    className="w-full max-h-64 object-contain rounded-lg border border-slate-700 hover:opacity-90 transition-opacity cursor-pointer"
                                />
                            </a>
                            <p className="text-slate-500 text-xs mt-1">Click to view full size</p>
                        </div>
                    )}

                    {/* Admin Remark */}
                    {payment.adminRemark && (
                        <div className="bg-slate-800/50 rounded-lg p-3">
                            <p className="text-slate-400 text-xs mb-1">Admin Remark</p>
                            <p className="text-white text-sm">{payment.adminRemark}</p>
                        </div>
                    )}

                    {/* Action Area — only for Pending */}
                    {payment.status === "Pending" && (
                        <div className="border-t border-slate-700 pt-4 space-y-3">
                            <div>
                                <label className="text-slate-400 text-sm mb-1 block">Remark <span className="text-slate-500 text-xs">(required for rejection)</span></label>
                                <textarea
                                    rows={2}
                                    value={remark}
                                    onChange={(e) => setRemark(e.target.value)}
                                    placeholder="Enter admin remark..."
                                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:border-green-500 text-sm resize-none"
                                />
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleApprove}
                                    disabled={acting}
                                    className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-semibold rounded-lg transition-all text-sm"
                                >
                                    {acting ? <i className="fa-solid fa-spinner animate-spin"></i> : <><i className="fa-solid fa-check mr-2"></i>Approve</>}
                                </button>
                                <button
                                    onClick={handleReject}
                                    disabled={acting}
                                    className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold rounded-lg transition-all text-sm"
                                >
                                    {acting ? <i className="fa-solid fa-spinner animate-spin"></i> : <><i className="fa-solid fa-xmark mr-2"></i>Reject</>}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const AdminManualPayments = () => {
    const dispatch = useDispatch();
    const [payments, setPayments] = useState([]);
    const [summary, setSummary] = useState({});
    const [pagination, setPagination] = useState({});
    const [statusFilter, setStatusFilter] = useState("All");
    const [page, setPage] = useState(1);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [detailLoading, setDetailLoading] = useState(false);

    const fetchPayments = async (currentPage = 1, status = statusFilter) => {
        dispatch(setLoading(true));
        try {
            const params = { page: currentPage, limit: 15 };
            if (status !== "All") params.status = status;
            const res = await getAllManualPaymentRequests(params);
            if (res?.success) {
                setPayments(res.data.payments || []);
                setSummary(res.data.summary || {});
                setPagination(res.data.pagination || {});
            }
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        fetchPayments(page, statusFilter);
    }, [page, statusFilter]);

    const handleViewDetail = async (id) => {
        setDetailLoading(true);
        const res = await getManualPaymentDetail(id);
        setDetailLoading(false);
        if (res?.success) {
            setSelectedPayment(res.data);
        } else {
            toast.error(res?.message || "Failed to load details.");
        }
    };

    const handleApprove = async (paymentId, remark) => {
        const result = await Swal.fire({
            title: "Approve Payment?",
            text: "This will credit the amount to user's investment wallet.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#22c55e",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Yes, Approve",
        });
        if (!result.isConfirmed) return;

        dispatch(setLoading(true));
        const res = await approveManualPayment({ paymentId, remark });
        dispatch(setLoading(false));

        if (res?.success) {
            toast.success(res.message || "Payment approved successfully!");
            setSelectedPayment(null);
            fetchPayments(page, statusFilter);
        } else {
            toast.error(res?.message || "Approval failed.");
        }
    };

    const handleReject = async (paymentId, remark) => {
        dispatch(setLoading(true));
        const res = await rejectManualPayment({ paymentId, remark });
        dispatch(setLoading(false));

        if (res?.success) {
            toast.success("Payment rejected.");
            setSelectedPayment(null);
            fetchPayments(page, statusFilter);
        } else {
            toast.error(res?.message || "Rejection failed.");
        }
    };

    const handleFilterChange = (status) => {
        setStatusFilter(status);
        setPage(1);
    };

    return (
        <div className="space-y-6 pt-4">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white">Manual Payment Requests</h1>
                <p className="text-slate-400 mt-1">Review and manage user INR payment submissions</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Pending", value: summary.pending || 0, icon: "fa-clock", color: "text-yellow-400", bg: "bg-yellow-500/20" },
                    { label: "Approved", value: summary.approved || 0, icon: "fa-check-circle", color: "text-green-400", bg: "bg-green-500/20" },
                    { label: "Rejected", value: summary.rejected || 0, icon: "fa-times-circle", color: "text-red-400", bg: "bg-red-500/20" },
                    { label: "Total Approved", value: `$${(summary.totalApprovedAmount || 0).toLocaleString()}`, icon: "fa-dollar-sign", color: "text-blue-400", bg: "bg-blue-500/20" },
                ].map((card) => (
                    <div key={card.label} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm">{card.label}</p>
                                <p className={`text-2xl font-bold mt-1 ${card.color}`}>{card.value}</p>
                            </div>
                            <div className={`${card.bg} p-3 rounded-lg`}>
                                <i className={`fa-solid ${card.icon} ${card.color} text-xl`}></i>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Table */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                {/* Filter Tabs */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                    {STATUS_FILTERS.map((s) => (
                        <button
                            key={s}
                            onClick={() => handleFilterChange(s)}
                            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                statusFilter === s
                                    ? "bg-blue-600 text-white"
                                    : "bg-slate-800 text-slate-400 hover:text-white"
                            }`}
                        >
                            {s}
                            {s === "Pending" && summary.pending > 0 && (
                                <span className="ml-2 bg-yellow-500 text-black text-xs px-1.5 py-0.5 rounded-full font-bold">
                                    {summary.pending}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-700">
                                {["#", "Payment ID", "User", "Name", "Amount", "Method", "Date", "Status", "Action"].map((h) => (
                                    <th key={h} className="text-left py-3 px-4 text-slate-400 font-medium text-sm">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {payments.length > 0 ? (
                                payments.map((p, i) => (
                                    <tr key={p._id} className="border-b border-slate-700/30 hover:bg-slate-800/30 transition-colors">
                                        <td className="py-3 px-4 text-slate-400 text-sm">{((page - 1) * 15) + i + 1}</td>
                                        <td className="py-3 px-4">
                                            <span className="text-white font-mono text-xs">{p.id}</span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div>
                                                <p className="text-white text-sm font-medium">{p.user?.username || "-"}</p>
                                                <p className="text-slate-400 text-xs">{p.user?.email || "-"}</p>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-white text-sm">{p.name}</td>
                                        <td className="py-3 px-4">
                                            <span className="text-green-400 font-bold">${p.amount?.toLocaleString()}</span>
                                        </td>
                                        <td className="py-3 px-4 text-slate-300 text-sm">{p.paymentMethod}</td>
                                        <td className="py-3 px-4 text-slate-400 text-sm">{new Date(p.createdAt).toLocaleDateString()}</td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${statusBadge(p.status)}`}>
                                                {p.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <button
                                                onClick={() => handleViewDetail(p.id)}
                                                disabled={detailLoading}
                                                className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 border border-blue-500/30 rounded-lg text-xs font-medium transition-all"
                                            >
                                                <i className="fa-solid fa-eye mr-1"></i> View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="py-12 text-center text-slate-400">
                                        <i className="fa-solid fa-inbox text-3xl mb-2 block"></i>
                                        No payment requests found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700">
                        <p className="text-slate-400 text-sm">
                            Page {pagination.currentPage} of {pagination.totalPages} ({pagination.totalRecords} records)
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-lg text-sm transition-all"
                            >
                                <i className="fa-solid fa-chevron-left"></i>
                            </button>
                            <button
                                onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                                disabled={page === pagination.totalPages}
                                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-lg text-sm transition-all"
                            >
                                <i className="fa-solid fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            {selectedPayment && (
                <DetailModal
                    payment={selectedPayment}
                    onClose={() => setSelectedPayment(null)}
                    onApprove={handleApprove}
                    onReject={handleReject}
                />
            )}
        </div>
    );
};

export default AdminManualPayments;
