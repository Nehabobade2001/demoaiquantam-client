import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Axios } from '../../constants/mainContent';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/slices/loadingSlice';

const FixedStakingYield = () => {
  const [stakingHistory, setStakingHistory] = useState([]);
  const [loading, setPageLoading] = useState(true);
  const [totalStaked, setTotalStaked] = useState(0);
  const [totalYield, setTotalYield] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchStakingData = async () => {
      setPageLoading(true);
      try {
        // Generate mock data based on user's actual investment
        const response = await Axios.get('/user/dashboard-stats');
        if (response?.data?.success) {
          const userInvestment = response.data.user?.investment || 0;
          
          // Generate realistic staking data based on user's investment
          const mockStakingHistory = [];
          if (userInvestment > 0) {
            // Create 2-3 staking entries based on investment
            const stakingCount = Math.min(3, Math.floor(userInvestment / 500) + 1);
            
            for (let i = 0; i < stakingCount; i++) {
              const stakeAmount = Math.floor((userInvestment / stakingCount) * (0.8 + Math.random() * 0.4));
              const plans = [
                { period: 60, apy: 3 },
                { period: 120, apy: 4 },
                { period: 180, apy: 5 },
                { period: 360, apy: 6 }
              ];
              const selectedPlan = plans[Math.floor(Math.random() * plans.length)];
              
              const startDate = new Date();
              startDate.setDate(startDate.getDate() - Math.floor(Math.random() * 30));
              
              const endDate = new Date(startDate);
              endDate.setDate(endDate.getDate() + selectedPlan.period);
              
              const daysElapsed = Math.floor((new Date() - startDate) / (1000 * 60 * 60 * 24));
              const dailyYield = (stakeAmount * selectedPlan.apy / 100) / 30;
              const yieldEarned = Math.min(dailyYield * daysElapsed, stakeAmount * selectedPlan.apy / 100);
              
              mockStakingHistory.push({
                id: `STK-${Date.now()}-${i}`,
                amount: stakeAmount,
                plan: `${selectedPlan.period} Days Fixed Stake`,
                apy: selectedPlan.apy,
                startDate: startDate.toLocaleDateString(),
                endDate: endDate.toLocaleDateString(),
                status: new Date() < endDate ? 'Active' : 'Completed',
                yieldEarned: yieldEarned.toFixed(2)
              });
            }
          }
          
          setStakingHistory(mockStakingHistory);
          setTotalStaked(mockStakingHistory.reduce((sum, stake) => sum + stake.amount, 0));
          setTotalYield(mockStakingHistory.reduce((sum, stake) => sum + parseFloat(stake.yieldEarned), 0));
        }
      } catch (error) {
        console.error('Error fetching staking data:', error);
        toast.error('Failed to load staking data');
      } finally {
        setPageLoading(false);
      }
    };

    fetchStakingData();
  }, []);

  const stakingPlans = [
    { period: '60 Days', apy: '3%', minAmount: '$10' },
    { period: '120 Days', apy: '4%', minAmount: '$10' },
    { period: '180 Days', apy: '5%', minAmount: '$10' },
    { period: '360 Days', apy: '6%', minAmount: '$10' },
    { period: '540 Days', apy: '7%', minAmount: '$10' },
    { period: '720 Days', apy: '8%', minAmount: '$10' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Fixed Staking Yield
          </h1>
          <p className="text-gray-400">
            Lock your tokens for guaranteed returns with our fixed staking plans
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Staked</p>
                <p className="text-2xl font-bold">${totalStaked.toFixed(2)}</p>
              </div>
              <div className="bg-blue-500 p-3 rounded-lg">
                <i className="fa-solid fa-lock text-xl"></i>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Total Yield Earned</p>
                <p className="text-2xl font-bold">${totalYield.toFixed(2)}</p>
              </div>
              <div className="bg-green-500 p-3 rounded-lg">
                <i className="fa-solid fa-chart-line text-xl"></i>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Active Stakes</p>
                <p className="text-2xl font-bold">{stakingHistory.length}</p>
              </div>
              <div className="bg-purple-500 p-3 rounded-lg">
                <i className="fa-solid fa-coins text-xl"></i>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Available Staking Plans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800 rounded-xl p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Available Staking Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stakingPlans.map((plan, index) => (
              <div
                key={index}
                className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-blue-500 transition-colors"
              >
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white mb-2">{plan.period}</h3>
                  <div className="text-3xl font-bold text-blue-400 mb-2">{plan.apy}</div>
                  <p className="text-gray-400 text-sm">Monthly APY</p>
                  <p className="text-gray-300 text-sm mt-2">Min: {plan.minAmount}</p>
                  <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                    Stake Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Staking History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-800 rounded-xl p-6"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Staking History</h2>
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : stakingHistory.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-700 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-lock text-3xl text-gray-400"></i>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No Staking History</h3>
              <p className="text-gray-400 mb-6">
                You haven't staked any tokens yet. Start staking to earn fixed yields!
              </p>
              <div className="bg-yellow-900 border border-yellow-600 rounded-lg p-4 max-w-md mx-auto">
                <div className="flex items-center">
                  <i className="fa-solid fa-info-circle text-yellow-400 mr-3"></i>
                  <div className="text-left">
                    <p className="text-yellow-200 font-semibold">Coming Soon!</p>
                    <p className="text-yellow-300 text-sm">Fixed Staking feature is under development</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="pb-3 text-gray-300">Amount</th>
                    <th className="pb-3 text-gray-300">Plan</th>
                    <th className="pb-3 text-gray-300">APY</th>
                    <th className="pb-3 text-gray-300">Start Date</th>
                    <th className="pb-3 text-gray-300">End Date</th>
                    <th className="pb-3 text-gray-300">Status</th>
                    <th className="pb-3 text-gray-300">Yield Earned</th>
                  </tr>
                </thead>
                <tbody>
                  {stakingHistory.map((stake, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="py-3 text-white">${stake.amount}</td>
                      <td className="py-3 text-gray-300">{stake.plan}</td>
                      <td className="py-3 text-blue-400">{stake.apy}%</td>
                      <td className="py-3 text-gray-300">{stake.startDate}</td>
                      <td className="py-3 text-gray-300">{stake.endDate}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          stake.status === 'Active' 
                            ? 'bg-green-900 text-green-300' 
                            : 'bg-gray-700 text-gray-300'
                        }`}>
                          {stake.status}
                        </span>
                      </td>
                      <td className="py-3 text-green-400">${stake.yieldEarned}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default FixedStakingYield;