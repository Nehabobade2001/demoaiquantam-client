import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { setLoading } from "../../redux/slices/loadingSlice";
import DataTable from "../../components/Screen/UserPanel/DataTable";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { isToday } from "../../utils/helper";
import { getAllTradingIncomeHistory } from "../../api/user.api";
import StatCard from "../../components/Screen/UserPanel/StatCard";

const TradingIncomeHistory = () => {
  const [allTradingIncomeHistory, setAllTradingIncomeHistory] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [todayTotal, setTodayTotal] = useState(0);
  const dispatch = useDispatch();
  const location = useLocation();
  const data = location?.state;

  const fetchAllTradingIncomeHistory = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getAllTradingIncomeHistory();
      if (response?.success) {
        setAllTradingIncomeHistory(response?.data?.history || []);
        setTotalIncome(response?.data?.totalIncome || 0);
        setTodayTotal(response?.data?.todayTotal || 0);
      } else {
        setAllTradingIncomeHistory([]);
        toast.error(response?.message || "Something went wrong");
      }
    } catch (err) {
      toast.error("Failed to fetch Trading Profit Income history");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchAllTradingIncomeHistory();
  }, []);

  const filteredIncomeHistory =
    data === "today"
      ? allTradingIncomeHistory.filter((item) =>
          isToday(new Date(item.createdAt))
        )
      : allTradingIncomeHistory;

  const columns = [
    {
      header: "S/N",
      accessor: "_id",
      cell: (row, rowIndex) => (
        <span className="font-medium text-white">{rowIndex + 1}</span>
      ),
    },
    {
      header: "Transaction ID",
      accessor: "id",
      cell: (row) => (
        <span className="font-medium text-white">{row?.id || "N/A"}</span>
      ),
    },
    {
      header: "Investment Amount",
      accessor: "amount",
      cell: (row) => (
        <span className="font-medium text-white text-nowrap">
          $ {row?.amount?.toFixed(2) || "0.00"}
        </span>
      ),
    },
    {
      header: "Daily ROI (%)",
      accessor: "percentage",
      cell: (row) => (
        <span className="font-medium text-white">
          {row?.percentage?.toFixed(2) || "0"}%
        </span>
      ),
    },
    {
      header: "Trading Profit Income",
      accessor: "income",
      cell: (row) => (
        <span className="font-medium text-green-400 text-nowrap">
          $ {row?.income?.toFixed(2) || "0.00"}
        </span>
      ),
    },
    {
      header: "Day",
      accessor: "days",
      cell: (row) => (
        <span className="font-medium text-white">{row?.days || "-"}</span>
      ),
    },
    {
      header: "Plan",
      accessor: "level",
      cell: (row) => {
        const level = row?.level || "-";
        const dailyPercent = Number(row?.percentage) || 0; // stored as percent (e.g. 0.2 means 0.2%)
        const monthlyPercent = dailyPercent ? (dailyPercent * 30).toFixed(2) : null;
        return (
          <span className="font-medium text-white">
            {level}
            {monthlyPercent ? (
              <span className="text-slate-300"> &nbsp;•&nbsp; {monthlyPercent}%/mo</span>
            ) : null}
          </span>
        );
      },
    },
    {
      header: "Status",
      accessor: "status",
      cell: (row) => (
        <span
          className={`font-medium ${
            row?.status === "Completed" ? "text-green-500" : "text-yellow-400"
          }`}
        >
          {row?.status}
        </span>
      ),
    },
    {
      header: "Date",
      accessor: "createdAt",
      cell: (row) => (
        <span className="text-slate-300">
          {new Date(row?.createdAt).toLocaleDateString()}
        </span>
      ),
    },
  ];

  const cardData = [
    {
      title: "Total Trading Profit Income",
      value: `$ ${Number(totalIncome ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/receive-cash.png",
    },
    {
      title: "Today Trading Profit Income",
      value: `$ ${Number(todayTotal ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/sales-performance.png",
    },
  ];

  return (
    <div className="space-y-5 mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cardData.map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            iconImage={item.icon}
          />
        ))}
      </div>
      <DataTable
        title="Trading Income History"
        columns={columns}
        data={filteredIncomeHistory}
        pageSize={10}
      />
    </div>
  );
};

export default TradingIncomeHistory;
