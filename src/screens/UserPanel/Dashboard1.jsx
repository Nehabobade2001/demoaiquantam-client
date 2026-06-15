import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Transactions from "./Transactions";
import StatCard from "../../components/Screen/UserPanel/StatCard";
import EarningsChart from "../../components/Screen/UserPanel/EarningsChart";
import ProfileCard from "../../components/Screen/UserPanel/ProfileCard";
import { getIncomeTotal, getTransactionHistory } from "../../api/auth.api";
import { setLoading } from "../../redux/slices/loadingSlice";
import { toast } from "react-toastify";

import {
  getIncomeTotalForAdmin,
  getIncomeTotalForAdminIncome,
  getTransactionHistoryForAdmin,
} from "../../api/admin.api";

import {
  AuthenticatedAdminRouters,
  AuthenticatedUserRouters,
} from "../../constants/routes";
import aiTradeBg from "../../assets/Landing/ai-trade.jpg";
import UserActivityProgress from "../../components/Screen/UserPanel/UserActivityProgress";
import { Bot, TrendingUp } from "lucide-react";

const Dashboard1 = () => {
  const [transactionHistory, setTransactionHistory] = useState(null);
  const role = useSelector((state) => state?.isLoggedUser?.role);
  const access = localStorage.getItem("access");
  console.log(access, "access");
  // const role = "ADMIN";

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchTransactionHistory = async () => {
    try {
      dispatch(setLoading(true));
      if (role === "USER") {
        const response = await getTransactionHistory();
        setTransactionHistory(response?.data);
      } else if (role === "ADMIN") {
        const response = await getTransactionHistoryForAdmin();
        setTransactionHistory(response?.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    fetchTransactionHistory();
  }, [role]);

  const [totalIncome, setTotalIncome] = useState(null);

  useEffect(() => {
    const fetchIncomeTotal = async () => {
      try {
        dispatch(setLoading(true));
        if (role === "USER") {
          const userResponse = await getIncomeTotal();
          console.log("userResponse", userResponse);
          console.log("userResponse structure:", JSON.stringify(userResponse, null, 2));
          setTotalIncome(userResponse); // Set the entire response, not just data
        } else {
          const userResponse = await getIncomeTotalForAdminIncome();
          setTotalIncome(userResponse?.data);
          const response = await getIncomeTotalForAdmin();
          setTotalIncome(response);
          console.log("userResponse else ", userResponse);
        }
      } catch (err) {
        console.log("err", err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchIncomeTotal();
  }, [dispatch, access, role]);

  const revenueOverview = [
    {
      title: "Total Investment",
      value: `$ ${Number(totalIncome?.user?.investment ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/exchange.png",
      path: AuthenticatedUserRouters.INVESTMENT_HISTORY,
    },
    {
      title: "Today Deposits",
      value: `$ ${Number(totalIncome?.deposits?.today ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/money-transfer.png",
      path: AuthenticatedUserRouters.INVESTMENT_HISTORY,
      data: "today",
    },

  
   
    {
      title: "Total Income",
      value: `$ ${Number(totalIncome?.incomes?.total ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/stack-of-coins.png",
      path: AuthenticatedUserRouters.INCOME_HISTORY,
    },
    {
      title: "Today Income",
      value: `$ ${Number(totalIncome?.incomes?.today ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/money-transfer.png",
      path: AuthenticatedUserRouters.INCOME_HISTORY,
      data: "today",
    },
    // Trading Income
    {
      title: "Today Trading Income",
      value: `$ ${Number(totalIncome?.incomes?.trading?.today ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/candle-sticks.png",
      path: AuthenticatedUserRouters.TRADING_INCOME_HISTORY,
      data: "today",
    },
    {
      title: "Total Trading Income",
      value: `$ ${Number(totalIncome?.incomes?.trading?.total ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/candle-sticks.png",
      path: AuthenticatedUserRouters.TRADING_INCOME_HISTORY,
    },
    // Referral Income
    {
      title: "Today Referral Income",
      value: `$ ${Number(totalIncome?.incomes?.referral?.today ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-plastilina/69/share--v1.png",
      path: AuthenticatedUserRouters.REFERRAL_INCOME_HISTORY,
      data: "today",
      highlight: true,
    },
    {
      title: "Total Referral Income",
      value: `$ ${Number(totalIncome?.incomes?.referral?.total ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-plastilina/69/share--v1.png",
      path: AuthenticatedUserRouters.REFERRAL_INCOME_HISTORY,
      highlight: true,
    },
    // Level Income
    {
      title: "Today Level Income",
      value: `$ ${Number(totalIncome?.incomes?.level?.today ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/bar-chart.png",
      path: AuthenticatedUserRouters.LEVEL_INCOME_HISTORY,
      data: "today",
    },
    {
      title: "Total Level Income",
      value: `$ ${Number(totalIncome?.incomes?.level?.total ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/bar-chart.png",
      path: AuthenticatedUserRouters.LEVEL_INCOME_HISTORY,
    },

     {
      title: "Total Withdrawals",
      value: `$ ${Number(totalIncome?.withdrawals?.total ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/isometric/50/card-in-use.png",
      path: AuthenticatedUserRouters.WITHDRAWAL_HISTORY,
    },
    {
      title: "Today Withdrawals",
      value: `$ ${Number(totalIncome?.withdrawals?.today ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/isometric/50/card-in-use.png",
      path: AuthenticatedUserRouters.WITHDRAWAL_HISTORY,
      data: "today",
    },

       {
      title: "Total Team Business",
      value: `$ ${Number(totalIncome?.user?.totalTeamBusiness ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/pulsar-gradient/48/refund-2.png",
      path: AuthenticatedUserRouters.TRANSACTIONS,
    },

      {
      title: "Total Downline Users",
      value: `${Number(totalIncome?.data?.totalDownlineUsers ?? 0)}`,
      icon: "https://img.icons8.com/3d-fluency/94/user-group-woman-woman--v3.png",
      path: AuthenticatedUserRouters.MY_TEAM,
    },
    {
      title: "Direct Partners",
      value: `${Number(totalIncome?.user?.directs ?? 0)}`,
      icon: "https://img.icons8.com/3d-fluency/94/group.png",
      path: AuthenticatedUserRouters.MY_REFERRALS,
    },

     {
      title: "Current Level",
      value: `Level ${Number(totalIncome?.user?.currentLevel ?? 0)}`,
      icon: "https://img.icons8.com/3d-fluency/94/trophy.png",
      path: AuthenticatedUserRouters.MY_TEAM,
    },
    
 
   
  ];

  const cardData = [
    {
      title: "All Users",
      value: `${Number(totalIncome?.users ?? 0)}`,
      icon: "https://img.icons8.com/3d-fluency/94/group--v2.png",
      path: AuthenticatedAdminRouters.ALL_USERS,
    },
    {
      title: "Active Users",
      value: ` ${Number(totalIncome?.userActive ?? 0)}`,
      icon: "https://img.icons8.com/3d-fluency/94/group.png",
      path: AuthenticatedAdminRouters.ALL_USERS,
      data: "active",
    },
    {
      title: "Inactive Users",
      value: ` ${Number(totalIncome?.userInactive ?? 0)}`,
      icon: "https://img.icons8.com/3d-fluency/94/group--v4.png",
      path: AuthenticatedAdminRouters.ALL_USERS,
      data: "inactive",
    },
    {
      title: "Today Income",
      value: `$ ${Number(totalIncome?.todayIncome ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/cash-in-hand.png",
      path: AuthenticatedAdminRouters.INCOME_HISTORY,
      data: "today",
    },
    {
      title: "Total Income",
      value: `$ ${Number(totalIncome?.totalIncome ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/stack-of-coins.png",
      path: AuthenticatedAdminRouters.INCOME_HISTORY,
    },
    {
      title: "Today Referral Income",
      value: `$ ${Number(totalIncome?.todayReferral ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-plastilina/69/share--v1.png",
      path: AuthenticatedAdminRouters.REFERRAL_INCOME_HISTORY,
      data: "today",
    },
    {
      title: "Total Referral Income",
      value: `$ ${Number(totalIncome?.totalReferral ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-plastilina/69/share--v1.png",
      path: AuthenticatedAdminRouters.REFERRAL_INCOME_HISTORY,
    },
    {
      title: "Today Withdraw",
      value: `$ ${Number(totalIncome?.todayWithdraw ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/atm.png",
      path: AuthenticatedAdminRouters.APPROVED_WITHDRAWAL_REQUEST,
      data: "today",
    },
    {
      title: "Total Withdraw",
      value: `$ ${Number(totalIncome?.totalWithdraw ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/money-bag.png",
      path: AuthenticatedAdminRouters.APPROVED_WITHDRAWAL_REQUEST,
    },
    {
      title: "Today Level Income",
      value: `$ ${Number(totalIncome?.todayLevel ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/bar-chart.png",
      path: AuthenticatedAdminRouters.LEVEL_INCOME_HISTORY,
      data: "today",
    },
    {
      title: "Total Level Income",
      value: `$ ${Number(totalIncome?.totalLevel ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/bar-chart.png",
      path: AuthenticatedAdminRouters.LEVEL_INCOME_HISTORY,
    },
    {
      title: "Today Trading",
      value: `$ ${Number(totalIncome?.todayTrading ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/candle-sticks.png",
      path: AuthenticatedAdminRouters.TRADING_LIST,
      data: "today",
    },
    {
      title: "Total Trading",
      value: `$ ${Number(totalIncome?.totalTrading ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/candle-sticks.png",
      path: AuthenticatedAdminRouters.TRADING_LIST,
    },
    {
      title: "Today Transaction",
      value: `$ ${Number(totalIncome?.todayTransaction ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/transaction.png",
      path: AuthenticatedAdminRouters.TOTAL_TRANSACTIONS,
      data: "today",
    },
    {
      title: "Total Transaction",
      value: `$ ${Number(totalIncome?.totalTransaction ?? 0).toFixed(2)}`,
      icon: "https://img.icons8.com/3d-fluency/94/transaction.png",
      path: AuthenticatedAdminRouters.TOTAL_TRANSACTIONS,
    },
    // {
    //   title: "Today Trading",
    //   value: `$ ${Number(totalIncome?.todayTrading ?? 0).toFixed(2)}`,
    //   icon: "https://img.icons8.com/3d-fluency/94/candle-sticks.png",
    //   path: AuthenticatedAdminRouters.TRADING_LIST,
    //   data: "today",
    // },
    // {
    //   title: "Total Trading",
    //   value: `$ ${Number(totalIncome?.totalTrading ?? 0).toFixed(2)}`,
    //   icon: "https://img.icons8.com/3d-fluency/94/candle-sticks.png",
    //   path: AuthenticatedAdminRouters.TRADING_LIST,
    // },
  ];

  return (
    <div className="space-y-8 min-h-screen p-6 bg-rich-black">
      {role === "USER" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {revenueOverview.map((item) => (
            <StatCard
              key={item.title}
              title={item.title}
              value={item.value}
              iconImage={item.icon}
              change={item.change}
              changeType={item.changeType}
              path={item.path}
              data={item.data}
              highlight={item.highlight}
            />
          ))}
        </div>
      )}

      {role === "USER" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => navigate(AuthenticatedUserRouters.INVESTMENT_PLANS)}
            className="flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-bold text-base transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg"
            style={{ background: "linear-gradient(135deg, #22c55e, #a3e635)", color: "#000", boxShadow: "0 0 24px rgba(34,197,94,0.3)" }}
          >
            <i className="fa-solid fa-chart-line text-lg"></i>
            Invest Now
          </button>
          <button
            onClick={() => navigate(AuthenticatedUserRouters.WITHDRAW)}
            className="flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-bold text-base transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg border border-blue-500/50"
            style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)", color: "#fff", boxShadow: "0 0 24px rgba(59,130,246,0.3)" }}
          >
            <i className="fa-solid fa-money-bill-transfer text-lg"></i>
            Request Withdrawal
          </button>
        </div>
      )}

      {role === "USER" && (
        <div
          className="w-full relative min-h-48 rounded-2xl overflow-hidden flex items-center px-6 py-6 hero-glass animate-pulse-glow"
          style={{
            backgroundImage: `url(${aiTradeBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="w-full h-full bg-space-cadet/70 absolute top-0 z-10 left-0"></div>
          <div className="relative z-50 text-left w-full">
            <h3 className="text-2xl md:text-3xl font-bold hero-text-gradient mb-2 hero-glow-text">
              AI Trading Platform
            </h3>
            <p className="text-hero-secondary text-sm md:text-lg mb-4 max-w-2xl">
              Advanced AI algorithms for automated trading and maximum returns.
            </p>
            <button
              type="button"
              className="inline-flex items-center gap-2 text-sm md:text-lg font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                color: "#fff",
                boxShadow: "0 0 24px rgba(168,85,247,0.6), 0 0 48px rgba(124,58,237,0.3)",
                animation: "pulse 2s infinite"
              }}
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate(AuthenticatedUserRouters.AI_TRADE); }}
            >
              <Bot className="w-5 h-5" />
              Launch AI Trade Bot
              <TrendingUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* {role === "USER" && (
        <div className="card hero-glass">
          <UserActivityProgress
            totalInvestment={Number(totalIncome?.totalInvestment ?? totalIncome?.totalTransaction ?? 0)}
            dashboardData={totalIncome}
          />
        </div>
      )} */}

      {role === "ADMIN" && (
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
              data={item.data}
            />
          ))}
        </div>
      )}

      {role === "USER" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 card hero-glass">
            <EarningsChart />
          </div>
          <div className="lg:col-span-1 card hero-glass">
            <ProfileCard />
          </div>
        </div>
      )}

      <div className="card hero-glass">
        <Transactions history={transactionHistory} />
      </div>
    </div>
  );
};

export default Dashboard1;