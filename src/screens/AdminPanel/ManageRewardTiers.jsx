import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/slices/loadingSlice";
import {
    getAllRewardTiers,
    createRewardTier,
    updateRewardTier,
    deleteRewardTier,
    toggleRewardTierStatus,
} from "../../api/admin.api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import DataTable from "../../components/Screen/UserPanel/DataTable";

const ManageRewardTiers = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTier, setSelectedTier] = useState(null);
    const [tiers, setTiers] = useState([]);
    const [isCreateMode, setIsCreateMode] = useState(false);

    const [formData, setFormData] = useState({
        rewardAmount: "",
        monthlyInstallment: "",
        totalMonths: 10,
        teamBusinessTarget: "",
        title: "",
        description: "",
    });

    const fetchTiers = async () => {
        try {
            dispatch(setLoading(true));
            const response = await getAllRewardTiers();
            if (response?.success) {
                setTiers(response?.data || []);
            } else {
                toast.error(response?.message || "Failed to fetch reward tiers");
            }
        } catch (error) {
            console.error("Error fetching tiers:", error);
            toast.error("Failed to fetch reward tiers");
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        fetchTiers();
    }, []);

    const handleSelectTier = (tier) => {
        setSelectedTier(tier);
        setIsModalOpen(true);
        setIsCreateMode(false);
        setFormData({
            rewardAmount: tier.rewardAmount,
            monthlyInstallment: tier.monthlyInstallment,
            totalMonths: tier.totalMonths,
            teamBusinessTarget: tier.teamBusinessTarget,
            title: tier.title || "",
            description: tier.description || "",
        });
    };

    const handleCreateNew = () => {
        setSelectedTier(null);
        setIsModalOpen(true);
        setIsCreateMode(true);
        setFormData({
            rewardAmount: "",
            monthlyInstallment: "",
            totalMonths: 10,
            teamBusinessTarget: "",
            title: "",
            description: "",
        });
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTier(null);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!formData.rewardAmount || !formData.monthlyInstallment || !formData.teamBusinessTarget) {
            toast.error("Please fill all required fields");
            return;
        }

        const payload = {
            ...formData,
            rewardAmount: parseFloat(formData.rewardAmount),
            monthlyInstallment: parseFloat(formData.monthlyInstallment),
            totalMonths: parseInt(formData.totalMonths),
            teamBusinessTarget: parseFloat(formData.teamBusinessTarget),
        };

        try {
            dispatch(setLoading(true));
            let res;
            if (isCreateMode) {
                res = await createRewardTier(payload);
            } else {
                res = await updateRewardTier(selectedTier._id, payload);
            }

            if (res?.success) {
                toast.success(res.message);
                handleCloseModal();
                fetchTiers();
            } else {
                toast.error(res?.message || "Operation failed");
            }
        } catch (error) {
            toast.error("Operation failed");
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleDeleteTier = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                dispatch(setLoading(true));
                const res = await deleteRewardTier(id);
                if (res?.success) {
                    toast.success(res.message);
                    fetchTiers();
                } else {
                    toast.error(res?.message || "Deletion failed");
                }
            } catch (error) {
                toast.error("Deletion failed");
            } finally {
                dispatch(setLoading(false));
            }
        }
    };

    const handleToggleStatus = async (id) => {
        try {
            dispatch(setLoading(true));
            const res = await toggleRewardTierStatus(id);
            if (res?.success) {
                toast.success(res.message);
                fetchTiers();
            } else {
                toast.error(res?.message || "Status toggle failed");
            }
        } catch (error) {
            toast.error("Status toggle failed");
        } finally {
            dispatch(setLoading(false));
        }
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
            header: "Title",
            accessor: "title",
            cell: (row) => <span className="font-medium text-white">{row.title || "—"}</span>,
        },
        {
            header: "Reward Amount ($)",
            accessor: "rewardAmount",
            cell: (row) => <span className="text-green-400 font-semibold">${row.rewardAmount?.toLocaleString()}</span>,
        },
        {
            header: "Monthly ($)",
            accessor: "monthlyInstallment",
            cell: (row) => <span className="text-white">${row.monthlyInstallment?.toLocaleString()}</span>,
        },
        {
            header: "Team Business ($)",
            accessor: "teamBusinessTarget",
            cell: (row) => <span className="text-blue-400 font-semibold">${row.teamBusinessTarget?.toLocaleString()}</span>,
        },
        {
            header: "Months",
            accessor: "totalMonths",
            cell: (row) => <span className="text-white">{row.totalMonths}</span>,
        },
        {
            header: "Status",
            accessor: "status",
            cell: (row) => (
                <button
                    onClick={() => handleToggleStatus(row._id)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer hover:opacity-80 ${row.status ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"}`}
                >
                    {row.status ? "Active" : "Inactive"}
                </button>
            ),
        },
        {
            header: "Actions",
            accessor: "actions",
            cell: (row) => (
                <div className="flex gap-2">
                    <button
                        onClick={() => handleSelectTier(row)}
                        className="p-2 rounded bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                        title="Edit Tier"
                    >
                        <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                        onClick={() => handleDeleteTier(row._id)}
                        className="p-2 rounded bg-red-600 hover:bg-red-500 text-white transition-colors"
                        title="Delete Tier"
                    >
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-8 pt-4">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Manage Award Reward Tiers</h1>
                    <p className="text-slate-400 mt-1">
                        Configure reward tiers based on team business targets.
                    </p>
                </div>
                <button
                    onClick={handleCreateNew}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg font-semibold transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2 active:scale-95"
                >
                    <i className="fa-solid fa-plus"></i>
                    New Tier
                </button>
            </div>

            <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-4">
                <DataTable data={tiers} columns={columns} />
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-900 p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-semibold text-white mb-4">
                            {isCreateMode ? "Create New Reward Tier" : "Edit Reward Tier"}
                        </h2>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-sm text-slate-400">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleFormChange}
                                    placeholder="e.g. Starter Reward"
                                    className="w-full p-2 rounded bg-slate-800 text-white border border-slate-700"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm text-slate-400">Reward Amount ($) *</label>
                                <input
                                    type="number"
                                    name="rewardAmount"
                                    value={formData.rewardAmount}
                                    onChange={handleFormChange}
                                    className="w-full p-2 rounded bg-slate-800 text-white border border-slate-700"
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm text-slate-400">Monthly Installment ($) *</label>
                                <input
                                    type="number"
                                    name="monthlyInstallment"
                                    value={formData.monthlyInstallment}
                                    onChange={handleFormChange}
                                    className="w-full p-2 rounded bg-slate-800 text-white border border-slate-700"
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm text-slate-400">Team Business Target ($) *</label>
                                <input
                                    type="number"
                                    name="teamBusinessTarget"
                                    value={formData.teamBusinessTarget}
                                    onChange={handleFormChange}
                                    className="w-full p-2 rounded bg-slate-800 text-white border border-slate-700"
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm text-slate-400">Total Months</label>
                                <input
                                    type="number"
                                    name="totalMonths"
                                    value={formData.totalMonths}
                                    onChange={handleFormChange}
                                    className="w-full p-2 rounded bg-slate-800 text-white border border-slate-700"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm text-slate-400">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleFormChange}
                                    rows="2"
                                    className="w-full p-2 rounded bg-slate-800 text-white border border-slate-700"
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-4">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded transition-colors"
                                >
                                    {isCreateMode ? "Create Tier" : "Update Tier"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageRewardTiers;
