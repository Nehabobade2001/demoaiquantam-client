import React, { useState, useEffect } from 'react';
import { Axios } from '../../constants/mainContent';
import { toast } from 'react-toastify';

const InvestmentPackages = () => {
  const [packages, setPackages] = useState({ tradingSlabs: [], stakingPlans: [] });
  const [userInvestments, setUserInvestments] = useState({ investments: [], summary: {} });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('packages');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [investmentForm, setInvestmentForm] = useState({
    amount: '',
    appliedROI: '',
    lockDays: ''
  });

  useEffect(() => {
    fetchPackages();
    fetchUserInvestments();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await Axios.get('/packages');
      if (response.data.success) {
        setPackages(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const fetchUserInvestments = async () => {
    try {
      const response = await Axios.get('/packages/my-investments');
      if (response.data.success) {
        setUserInvestments(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching investments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInvestment = async (type) => {
    try {
      const endpoint = type === 'TRADING' ? '/packages/trading' : '/packages/staking';
      const payload = type === 'TRADING'
        ? { amount: parseFloat(investmentForm.amount), appliedROI: parseFloat(investmentForm.appliedROI) }
        : { amount: parseFloat(investmentForm.amount), lockDays: parseInt(investmentForm.lockDays) };

      const response = await Axios.post(endpoint, payload);

      if (response.data.success) {
        toast.success(`${type === 'TRADING' ? 'Trading' : 'Staking'} investment created successfully!`);
        setSelectedPackage(null);
        setInvestmentForm({ amount: '', appliedROI: '', lockDays: '' });
        fetchUserInvestments();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Investment failed');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Investment Packages</h1>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg mb-8">
          <button
            onClick={() => setActiveTab('packages')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${activeTab === 'packages'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            Available Packages
          </button>
          <button
            onClick={() => setActiveTab('investments')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${activeTab === 'investments'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            My Investments
          </button>
        </div>

        {activeTab === 'packages' && (
          <div className="space-y-8">
            {/* Trading Packages */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                🔹 Trading Investment (Flexible Monthly ROI)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {packages.tradingSlabs.map((slab, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{slab.name}</h3>
                      <div className="text-sm text-gray-600 mb-4">{slab.description}</div>

                      <div className="space-y-3">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-600">Investment Range</div>
                          <div className="font-bold text-blue-600">
                            {formatCurrency(slab.minAmount)} - {slab.maxAmount === Infinity ? '∞' : formatCurrency(slab.maxAmount)}
                          </div>
                        </div>

                        <div className="bg-green-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-600">Monthly ROI</div>
                          <div className="font-bold text-green-600">{slab.minROI}% - {slab.maxROI}%</div>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedPackage({ type: 'TRADING', data: slab })}
                        className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Invest Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Staking Packages */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                🔹 Fixed Staking Investment (Time Lock Based)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.stakingPlans.map((plan, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <div className="text-sm text-gray-600 mb-4">{plan.description}</div>

                      <div className="space-y-3">
                        <div className="bg-purple-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-600">Lock Period</div>
                          <div className="font-bold text-purple-600">{plan.lockDays} Days</div>
                        </div>

                        <div className="bg-green-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-600">Monthly ROI</div>
                          <div className="font-bold text-green-600">{plan.monthlyROI}%</div>
                        </div>

                        <div className="bg-yellow-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-600">Total Return</div>
                          <div className="font-bold text-yellow-600">~{plan.totalReturn}%</div>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedPackage({ type: 'STAKING', data: plan })}
                        className="w-full mt-4 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Stake Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'investments' && (
          <div className="space-y-8">
            {/* Investment Summary */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Investment Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-600">Total Investment</div>
                  <div className="text-xl font-bold text-blue-600">
                    {formatCurrency(userInvestments.summary.totalInvestment || 0)}
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-600">Trading Investment</div>
                  <div className="text-xl font-bold text-green-600">
                    {formatCurrency(userInvestments.summary.tradingInvestment || 0)}
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-600">Staking Investment</div>
                  <div className="text-xl font-bold text-purple-600">
                    {formatCurrency(userInvestments.summary.stakingInvestment || 0)}
                  </div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-600">Active Packages</div>
                  <div className="text-xl font-bold text-yellow-600">
                    {userInvestments.summary.activePackages || 0}
                  </div>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-600">Total Income Generated</div>
                  <div className="text-xl font-bold text-indigo-600">
                    {formatCurrency(userInvestments.summary.totalIncomeGenerated || 0)}
                  </div>
                </div>
              </div>
            </div>

            {/* Investment List */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">My Investments</h2>
              {userInvestments.investments.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Package
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ROI
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Income Generated
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {userInvestments.investments.map((investment) => (
                        <tr key={investment._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className={`w-3 h-3 rounded-full mr-3 ${investment.type === 'TRADING' ? 'bg-blue-500' : 'bg-purple-500'
                                }`}></div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {investment.type === 'TRADING' ? investment.slab?.name : investment.stakingPlan?.name}
                                </div>
                                <div className="text-sm text-gray-500">{investment.type}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatCurrency(investment.amount)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {investment.roi}% monthly
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${investment.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : investment.status === 'completed'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                              {investment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatCurrency(investment.totalIncomeGenerated)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(investment.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-500">No investments found</div>
                  <button
                    onClick={() => setActiveTab('packages')}
                    className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Start Investing
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Investment Modal */}
        {selectedPackage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {selectedPackage.type === 'TRADING' ? 'Trading Investment' : 'Staking Investment'}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Investment Amount (USD)
                  </label>
                  <input
                    type="number"
                    value={investmentForm.amount}
                    onChange={(e) => setInvestmentForm({ ...investmentForm, amount: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter amount"
                    min="10"
                  />
                </div>

                {selectedPackage.type === 'TRADING' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Applied ROI (%)
                    </label>
                    <input
                      type="number"
                      value={investmentForm.appliedROI}
                      onChange={(e) => setInvestmentForm({ ...investmentForm, appliedROI: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={`${selectedPackage.data.minROI} - ${selectedPackage.data.maxROI}`}
                      min={selectedPackage.data.minROI}
                      max={selectedPackage.data.maxROI}
                      step="0.1"
                    />
                  </div>
                )}

                {selectedPackage.type === 'STAKING' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lock Period
                    </label>
                    <input
                      type="number"
                      value={selectedPackage.data.lockDays}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                    <input
                      type="hidden"
                      value={selectedPackage.data.lockDays}
                      onChange={(e) => setInvestmentForm({ ...investmentForm, lockDays: e.target.value })}
                    />
                  </div>
                )}
              </div>

              <div className="flex space-x-4 mt-6">
                <button
                  onClick={() => setSelectedPackage(null)}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleInvestment(selectedPackage.type)}
                  className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Invest
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestmentPackages;