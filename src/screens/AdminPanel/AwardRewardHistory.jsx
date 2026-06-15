import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setLoading } from "../../redux/slices/loadingSlice";
import DataTable from "../../components/Screen/UserPanel/DataTable";
import { Axios } from "../../constants/mainContent";

const AwardRewardHistory = () => {
    const dispatch = useDispatch();
    const [rewardRecipients, setRewardRecipients] = useState([]);

    // Rank & Reward tiers criteria
    const awardTiers = [
        { rank: 'Dream Starter',   rewardAmount: 100,    teamTarget: 10000    },
        { rank: 'Rising Star',     rewardAmount: 300,    teamTarget: 30000    },
        { rank: 'Action Achiever', rewardAmount: 500,    teamTarget: 50000    },
        { rank: 'Vision Builder',  rewardAmount: 1000,   teamTarget: 100000   },
        { rank: 'Success Mentor',  rewardAmount: 2000,   teamTarget: 200000   },
        { rank: 'Growth Champion', rewardAmount: 5000,   teamTarget: 500000   },
        { rank: 'Power Director',  rewardAmount: 10000,  teamTarget: 1000000  },
        { rank: 'Elite Performer', rewardAmount: 50000,  teamTarget: 5000000  },
        { rank: 'Crown Legend',    rewardAmount: 100000, teamTarget: 10000000 },
    ];

    const fetchRewardRecipients = async () => {
        try {
            dispatch(setLoading(true));
            const response = await Axios.get("/admin/award-reward-history");

            if (response?.data?.success) {
                setRewardRecipients(response?.data?.data || []);
            } else {
                console.error(response?.data?.message || "Failed to fetch reward recipients");
                setRewardRecipients([]);
            }
        } catch (error) {
            console.error("Error fetching reward recipients:", error);
            setRewardRecipients([]);
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        fetchRewardRecipients();
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
            header: "Username",
            accessor: "user.username",
            cell: (row) => <span className="font-medium text-white">{row?.user?.username || "-"}</span>,
        },
        {
            header: "Email",
            accessor: "user.email",
            cell: (row) => <span className="text-white">{row?.user?.email || "-"}</span>,
        },
        {
            header: "Team Business",
            accessor: "teamBusiness",
            cell: (row) => <span className="text-blue-400 font-semibold">${row?.teamBusiness?.toLocaleString() || 0}</span>,
        },
        {
            header: "Total Reward",
            accessor: "totalRewardAmount",
            cell: (row) => <span className="text-green-400 font-semibold">${row?.totalRewardAmount?.toLocaleString()}</span>,
        },
        {
            header: "Monthly",
            accessor: "monthlyInstallment",
            cell: (row) => <span className="text-white">${row?.monthlyInstallment?.toLocaleString()}</span>,
        },
        {
            header: "Paid",
            accessor: "totalPaid",
            cell: (row) => <span className="text-green-400">${row?.totalPaid?.toLocaleString()}</span>,
        },
        {
            header: "Remaining",
            accessor: "remainingAmount",
            cell: (row) => <span className="text-yellow-400">${row?.remainingAmount?.toLocaleString()}</span>,
        },
        {
            header: "Progress",
            accessor: "paymentsCompleted",
            cell: (row) => (
                <div className="flex flex-col gap-1">
                    <span className="text-white text-sm">{row?.paymentsCompleted || 0}/{row?.totalPayments || 10}</span>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${((row?.paymentsCompleted || 0) / (row?.totalPayments || 10)) * 100}%` }}
                        ></div>
                    </div>
                </div>
            ),
        },
        {
            header: "Status",
            accessor: "status",
            cell: (row) => (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${row.status === "Active" ? "bg-green-500/20 text-green-400 border border-green-500/30" :
                        row.status === "Completed" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" :
                            "bg-red-500/20 text-red-400 border border-red-500/30"
                    }`}>
                    {row.status}
                </span>
            ),
        },
        {
            header: "Next Payment",
            accessor: "nextPaymentDate",
            cell: (row) => (
                <span className="text-slate-300 text-sm">
                    {row?.nextPaymentDate && row.status === "Active" ? new Date(row.nextPaymentDate).toLocaleDateString() : "-"}
                </span>
            ),
        },
    ];

    return (
        <div className="space-y-8 pt-4">
            <div>
                <h1 className="text-3xl font-bold text-white">Award & Rewards Management</h1>
                <p className="text-slate-400 mt-1">
                    Manage award criteria and track user reward payouts.
                </p>
            </div>

            {/* Award Criteria Table */}
            <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                        <i className="fa-solid fa-award text-blue-400 text-xl"></i>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Award Criteria</h2>
                        <p className="text-slate-400">Achieve team business targets to unlock rank rewards</p>
                    </div>
                </div>
                
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                        <i className="fa-solid fa-info-circle text-yellow-500 mt-1"></i>
                        <div>
                            <h3 className="font-semibold text-yellow-400 mb-2">Important Conditions</h3>
                            <ul className="text-sm text-yellow-300 space-y-1">
                                <li>• Achieve the required Team Business to unlock your rank reward</li>
                                <li>• Higher ranks unlock higher reward amounts</li>
                                <li>• Business volume is counted from your direct & downline team</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-700">
                                <th className="text-left py-4 px-4 text-white font-semibold">#</th>
                                <th className="text-left py-4 px-4 text-white font-semibold">Rank</th>
                                <th className="text-left py-4 px-4 text-white font-semibold">Reward Amount</th>
                                <th className="text-left py-4 px-4 text-white font-semibold">Team Business</th>
                            </tr>
                        </thead>
                        <tbody>
                            {awardTiers.map((tier, index) => (
                                <tr key={index} className="border-b border-slate-700/30">
                                    <td className="py-4 px-4 text-slate-400 text-sm">{index + 1}</td>
                                    <td className="py-4 px-4">
                                        <span className="text-white font-semibold">{tier.rank}</span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="text-lg font-bold text-green-400">
                                            ${tier.rewardAmount.toLocaleString()}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="text-white font-medium">
                                            ${tier.teamTarget.toLocaleString()}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm">Total Recipients</p>
                            <p className="text-white text-2xl font-bold mt-1">{rewardRecipients?.length || 0}</p>
                        </div>
                        <div className="bg-blue-500/20 p-3 rounded-lg">
                            <i className="fa-solid fa-users text-blue-400 text-2xl"></i>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm">Active Rewards</p>
                            <p className="text-white text-2xl font-bold mt-1">
                                {rewardRecipients?.filter(r => r.status === "Active").length || 0}
                            </p>
                        </div>
                        <div className="bg-green-500/20 p-3 rounded-lg">
                            <i className="fa-solid fa-award text-green-400 text-2xl"></i>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm">Completed</p>
                            <p className="text-white text-2xl font-bold mt-1">
                                {rewardRecipients?.filter(r => r.status === "Completed").length || 0}
                            </p>
                        </div>
                        <div className="bg-purple-500/20 p-3 rounded-lg">
                            <i className="fa-solid fa-check-circle text-purple-400 text-2xl"></i>
                        </div>
                    </div>
                </div>
            </div>

            {/* User Award History Table */}
            <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                        <i className="fa-solid fa-history text-green-400 text-xl"></i>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">User Award History</h2>
                        <p className="text-slate-400">Track all users who have achieved reward tiers and their payout status</p>
                    </div>
                </div>
                <DataTable data={rewardRecipients} columns={columns} />
            </div>
        </div>
    );
};

export default AwardRewardHistory;
