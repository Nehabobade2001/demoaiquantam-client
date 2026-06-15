import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import DataTable from "../../components/Screen/UserPanel/DataTable";
import { setLoading } from "../../redux/slices/loadingSlice";
import { getDailyStakingHistory } from "../../api/user.api";
import StatCard from "../../components/Screen/UserPanel/StatCard";

const StakingHistory = () => {
    const dispatch = useDispatch();

    const [stakingRecords, setStakingRecords] = useState([]);
    const [totalStaking, setTotalStaking] = useState(0);
    const [currentPage] = useState(1);
    const pageSize = 10;

    const fetchStakingHistory = async () => {
        try {
            dispatch(setLoading(true));
            const response = await getDailyStakingHistory();
            if (response?.success) {
                const records = response.data || [];
                setStakingRecords(records);
                const total = records.reduce(
                    (sum, item) => sum + (item?.income ?? item?.amount ?? 0),
                    0
                );
                setTotalStaking(total);
            } else {
                toast.error(response?.message || "Something went wrong");
                setStakingRecords([]);
            }
        } catch (err) {
            toast.error("Failed to fetch staking history");
            setStakingRecords([]);
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        fetchStakingHistory();
    }, []);

    const cardData = [
        {
            title: "Total Staking Income",
            value: `$ ${Number(totalStaking ?? 0).toFixed(2)}`,
            icon: "https://img.icons8.com/3d-fluency/94/coins.png",
        },
        {
            title: "Total Entries",
            value: `${stakingRecords.length}`,
            icon: "https://img.icons8.com/3d-fluency/94/list.png",
        },
    ];

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
            cell: (row) => (
                <span className="font-medium text-white text-xs">
                    {row?.id || row?.hash || "-"}
                </span>
            ),
        },
        {
            header: "Staking Income",
            accessor: "amount",
            cell: (row) => (
                <span className="font-medium text-blue-400">
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
                    />
                ))}
            </div>

            {/* All Staking Entries */}
            <DataTable
                title="Staking History"
                columns={columns}
                data={stakingRecords}
                totalCount={stakingRecords.length}
                pageSize={pageSize}
            />
        </div>
    );
};

export default StakingHistory;
