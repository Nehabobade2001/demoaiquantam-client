import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import DataTable from "../../components/Screen/UserPanel/DataTable";
import { setLoading } from "../../redux/slices/loadingSlice";
import { getAllUserIncomeHistory } from "../../api/user.api";
import { useLocation } from "react-router-dom";
import { isToday } from "../../utils/helper";
import { AuthenticatedUserRouters } from "../../constants/routes";
import StatCard from "../../components/Screen/UserPanel/StatCard";

const UserROIIncome = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const data = location.state;

  const [roiHistory, setRoiHistory] = useState([]);
  const [stakingHistory, setStakingHistory] = useState([]);
  const [currentPage] = useState(1);
  const [totalRoi, setTotalRoi] = useState(0);
  const [totalStaking, setTotalStaking] = useState(0);
  const pageSize = 10;

  const cardData = [
    {
      title: "Total Trading Income",
      value: `$ ${Number(totalRoi ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/investment.png",
      path: AuthenticatedUserRouters.ROI_INCOME,
    },
    {
      title: "Total Staking Income",
      value: `$ ${Number(totalStaking ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/coins.png",
    },
  ];

  const fetchAllIncomeHistory = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getAllUserIncomeHistory();
      if (response?.success) {
        const allData = response?.data || [];

        // Backend type values from CommissionIncome model:
        // "Trading Profit Income" for ROI/trading
        // "Staking Bonus Income" for staking
        const roiData = allData.filter(
          (item) => item?.type === "Trading Profit Income"
        );
        const stakingData = allData.filter(
          (item) => item?.type === "Staking Bonus Income"
        );

        setRoiHistory(roiData);
        setStakingHistory(stakingData);

        setTotalRoi(roiData.reduce((sum, item) => sum + (item?.income || item?.amount || 0), 0));
        setTotalStaking(stakingData.reduce((sum, item) => sum + (item?.income || item?.amount || 0), 0));
      } else {
        toast.error(response?.message || "Something went wrong");
        setRoiHistory([]);
        setStakingHistory([]);
      }
    } catch (err) {
      toast.error("Failed to fetch income history");
      setRoiHistory([]);
      setStakingHistory([]);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchAllIncomeHistory();
  }, []);

  const applyTodayFilter = (list) =>
    data === "today"
      ? list.filter((item) => isToday(new Date(item.createdAt)))
      : list;

  const filteredRoiHistory = applyTodayFilter(roiHistory);
  const filteredStakingHistory = applyTodayFilter(stakingHistory);

  const commonColumns = (label, amountColor = "text-green-400") => [
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
      cell: (row) => (
        <span className="font-medium text-white text-xs">{row?.id || row?.hash || "-"}</span>
      ),
    },
    {
      header: `${label}`,
      accessor: "amount",
      cell: (row) => (
        <span className={`font-medium ${amountColor}`}>
          $ {(row?.income ?? row?.amount ?? 0).toFixed(2)}
        </span>
      ),
    },
    {
      header: "Percentage",
      accessor: "percentage",
      cell: (row) => (
        <span className="font-medium text-white">
          {row?.percentage || "0"}%
        </span>
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
      searchValue: (row) => new Date(row?.createdAt)?.toLocaleDateString(),
    },
  ];

  return (
    <div className="space-y-5 mt-5">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

      {/* Trading Profit Income (ROI) Table */}
      <DataTable
        title="Trading Profit Income History"
        columns={commonColumns("Trading Income", "text-green-400")}
        data={filteredRoiHistory}
        totalCount={filteredRoiHistory.length}
        pageSize={pageSize}
      />

      {/* Staking Bonus Income Table */}
      <DataTable
        title="Staking Bonus Income History"
        columns={commonColumns("Staking Income", "text-blue-400")}
        data={filteredStakingHistory}
        totalCount={filteredStakingHistory.length}
        pageSize={pageSize}
      />
    </div>
  );
};

export default UserROIIncome;