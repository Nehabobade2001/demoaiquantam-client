import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import DataTable from "../../components/Screen/UserPanel/DataTable";
import { setLoading } from "../../redux/slices/loadingSlice";
import {
  getAllIncomeHistory,
  getIncomeTotalForAdmin,
} from "../../api/admin.api";
import { maskWalletAddress } from "../../utils/additionalFunc";
import ServerSideTable from "../../components/Screen/UserPanel/ServerSideTable";
import { useLocation } from "react-router-dom";
import { isToday } from "../../utils/helper";
import { AuthenticatedAdminRouters } from "../../constants/routes";
import StatCard from "../../components/Screen/UserPanel/StatCard";

const IncomeHistory = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const data = location.state;

  const [allIncomeHistory, setAllIncomeHistory] = useState([]);
  const [totalCount, setTotalCount] = useState(0); // You can set totalCount if backend sends it, else use fixed value or calculate
  const [currentPage, setCurrentPage] = useState(1);
  const [totalIncome, setTotalIncome] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserIncomeModal, setShowUserIncomeModal] = useState(false);
  const pageSize = 10;

  const cardData = [
    {
      title: "Total Income",
      value: `$ ${Number(totalIncome?.totalIncome ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/stack-of-coins.png",
      path: AuthenticatedAdminRouters.INCOME_HISTORY,
    },
    {
      title: "Total Referral Income",
      value: `$ ${Number(totalIncome?.totalReferral ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-plastilina/69/share--v1.png",
      path: AuthenticatedAdminRouters.REFERRAL_INCOME_HISTORY,
    },
    {
      title: "Total Level Income",
      value: `$ ${Number(totalIncome?.totalLevel ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/bar-chart.png",
      path: AuthenticatedAdminRouters.LEVEL_INCOME_HISTORY,
    },
    // {
    //   title: "Total Matching Income",
    //   value: `$ ${Number(totalIncome?.totalMatching ?? 0).toFixed(2)}`,
    //   icon: "https://img.icons8.com/3d-fluency/94/handshake.png",
    //   path: AuthenticatedAdminRouters.MATCHING_INCOME_HISTORY,
    // },
    // {
    //   title: "Total Trading",
    //   value: `$ ${Number(totalIncome?.totalTrading ?? 0).toFixed(2)}`,
    //   icon: "https://img.icons8.com/3d-fluency/94/candle-sticks.png",
    //   path: AuthenticatedAdminRouters.TRADING_LIST,
    // },
  ];

  const fetchAllIncomeHistory = async (page = 1) => {
    try {
      dispatch(setLoading(true));
      const response = await getAllIncomeHistory({ page });
      if (response?.success) {
        setAllIncomeHistory(response?.data || []);
        setTotalCount(response?.data?.totalCount || 0);
      } else {
        toast.error(response?.message || "Something went wrong");
        setAllIncomeHistory([]);
        setTotalCount(0);
      }
    } catch (err) {
      toast.error("Failed to fetch income history");
      setAllIncomeHistory([]);
      setTotalCount(0);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchCardData = async (page = 1) => {
    try {
      dispatch(setLoading(true));
      const response = await getIncomeTotalForAdmin();
      if (response?.success) {
        setTotalIncome(response || {});
      } else {
        toast.error(response?.message || "Something went wrong");
        setTotalIncome({});
      }
    } catch (err) {
      toast.error("Failed to fetch income history");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchAllIncomeHistory();
    fetchCardData();
  }, []);

  const filteredIncomeHistory =
    data === "today"
      ? allIncomeHistory.filter((item) => isToday(new Date(item.createdAt)))
      : allIncomeHistory;

  // Function to handle user click and show income details
  const handleUserClick = (userData) => {
    // Filter all income for this user
    const userIncomes = allIncomeHistory.filter(
      (income) => income.user?.username === userData?.username
    );
    setSelectedUser({ ...userData, incomes: userIncomes });
    setShowUserIncomeModal(true);
  };

  // User Income Modal Component
  const UserIncomeModal = () => {
    if (!showUserIncomeModal || !selectedUser) return null;

    const totalUserIncome = selectedUser.incomes.reduce((sum, inc) => sum + inc.income, 0);
    const totalUserAmount = selectedUser.incomes.reduce((sum, inc) => sum + inc.amount, 0);

    return (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-slate-900 border border-blue-600 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 bg-slate-900 border-b border-blue-600/30 p-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                Income Details: {selectedUser.username}
              </h2>
              <p className="text-slate-400 text-sm">
                {selectedUser.incomes.length} transactions
              </p>
            </div>
            <button
              onClick={() => setShowUserIncomeModal(false)}
              className="text-slate-400 hover:text-white text-3xl transition-colors"
            >
              ×
            </button>
          </div>

          {/* Summary Cards */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-4">
              <p className="text-slate-400 text-sm mb-1">Total Income</p>
              <p className="text-2xl font-bold text-green-400">
                ${totalUserIncome.toFixed(2)}
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-4">
              <p className="text-slate-400 text-sm mb-1">Total Amount</p>
              <p className="text-2xl font-bold text-purple-400">
                ${totalUserAmount.toFixed(2)}
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-4">
              <p className="text-slate-400 text-sm mb-1">Transactions</p>
              <p className="text-2xl font-bold text-orange-400">
                {selectedUser.incomes.length}
              </p>
            </div>
          </div>

          {/* Income List */}
          <div className="p-6">
            <h3 className="text-lg font-bold text-white mb-4">Transaction History</h3>
            <div className="space-y-3">
              {selectedUser.incomes.map((income, index) => (
                <div
                  key={income._id || index}
                  className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 hover:border-blue-500/30 transition-colors"
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-slate-500 text-xs mb-1">Type</p>
                      <p className="text-white font-semibold">{income.type}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs mb-1">Income</p>
                      <p className="text-green-400 font-bold">
                        ${income.income.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs mb-1">Amount</p>
                      <p className="text-blue-400">${income.amount.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs mb-1">Level/Days</p>
                      <p className="text-slate-300">
                        L{income.level} / D{income.days}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-700/30 flex justify-between items-center">
                    <div>
                      <p className="text-slate-500 text-xs">From</p>
                      <p className="text-cyan-400 text-sm">
                        {income.fromUser?.username || "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs">Date</p>
                      <p className="text-slate-300 text-sm">
                        {new Date(income.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${income.status === "Completed"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                          }`}
                      >
                        {income.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-slate-900 border-t border-blue-600/30 p-6">
            <button
              onClick={() => setShowUserIncomeModal(false)}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  const columns = [
    {
      header: "S/N",
      accessor: "_id",
      cell: (_, rowIndex) => (
        <span className="font-medium text-white">
          {rowIndex + 1 + (currentPage - 1) * pageSize}
        </span>
      ),
    },
    {
      header: "Transaction ID",
      accessor: "id",
      cell: (row) => <span className="font-medium text-white">{row?.id}</span>,
    },
    {
      header: "User ID",
      accessor: "user.username",
      cell: (row) => (
        <button
          onClick={() => handleUserClick(row?.user)}
          className="font-medium text-blue-400 hover:text-blue-300 hover:underline cursor-pointer transition-colors"
        >
          {row?.user?.username}
        </button>
      ),
      searchValue: (row) => row?.user?.username,
    },
    {
      header: "From User",
      accessor: "fromUser.username",
      cell: (row) => (
        <span className="font-medium text-white">
          {row?.fromUser?.username || "-"}
        </span>
      ),
      searchValue: (row) => row?.fromUser?.username,
    },
    {
      header: "Amount",
      accessor: "amount",
      cell: (row) => (
        <span className="font-medium text-white">
          $ {row?.amount.toFixed(2)}
        </span>
      ),
    },
    {
      header: "Income",
      accessor: "income",
      cell: (row) => (
        <span className="font-medium text-white">
          $ {row?.income.toFixed(2)}
        </span>
      ),
    },
    {
      header: "Level",
      accessor: "level",
      cell: (row) => (
        <span className="font-medium text-white">{row?.level}</span>
      ),
    },
    {
      header: "Days",
      accessor: "days",
      cell: (row) => (
        <span className="font-medium text-white">{row?.days}</span>
      ),
    },
    {
      header: "Type",
      accessor: "type",
      cell: (row) => (
        <span className="font-medium text-white">{row?.type}</span>
      ),
    },
    {
      header: "Reward Paid",
      accessor: "rewardPaid",
      cell: (row) => (
        <span className="font-medium text-white">{row?.rewardPaid}</span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      cell: (row) => (
        <span
          className={`font-medium ${row?.status === "Completed" ? "text-green-500" : "text-yellow-400"
            }`}
        >
          {row?.status}
        </span>
      ),
      searchValue: (row) => row?.status,
    },
    {
      header: "Created At",
      accessor: "createdAt",
      cell: (row) => (
        <span className="text-slate-300">
          {new Date(row?.createdAt).toLocaleString()}
        </span>
      ),
      searchValue: (row) => {
        return new Date(row?.createdAt)?.toLocaleDateString();
      },
    },
  ];

  return (
    <div className="space-y-5 mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardData.map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            iconImage={item.icon}
            change={item.change}
            changeType={item.changeType}
            path={item.path}
          />
        ))}
      </div>
      <DataTable
        title="Income History"
        columns={columns}
        data={filteredIncomeHistory}
        totalCount={totalCount}
        pageSize={pageSize}
      />
      <UserIncomeModal />
    </div>
  );
};

export default IncomeHistory;
