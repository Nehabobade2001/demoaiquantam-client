import React, { useState, useEffect } from 'react';
import { getUserAwardHistory } from '../../api/user.api';
import { formatCurrency, formatDate } from '../../utils/helper';
import PageLoader from '../../components/Global/PageLoader';

const UserAwardRewardHistory = () => {
  const [loading, setLoading] = useState(true);
  const [awardHistory, setAwardHistory] = useState(null);
  const [selectedAward, setSelectedAward] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAwardHistory();
  }, []);

  const fetchAwardHistory = async () => {
    try {
      setLoading(true);
      const response = await getUserAwardHistory();

      if (response.success) {
        setAwardHistory(response.data);
        if (response.data.awardProgress.length > 0) {
          setSelectedAward(response.data.awardProgress[0]);
        }
      } else {
        setError(response.message || 'Failed to fetch award history');
      }
    } catch (err) {
      setError('Failed to fetch award history');
      console.error('Error fetching award history:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Active': 'text-green-400',
      'Completed': 'text-blue-400',
      'Paused': 'text-yellow-400'
    };
    return colors[status] || 'text-gray-400';
  };

  const getPayoutStatusBadge = (status) => {
    const badges = {
      'Completed': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Processing': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Pending': 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    };
    return badges[status] || badges['Pending'];
  };

  if (loading) return <PageLoader />;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-card border border-medium rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-primary-green/20 rounded-xl flex items-center justify-center">
              <i className="fa-solid fa-history text-primary-green text-xl"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-light">Award Reward History</h1>
              <p className="text-muted">Track your award achievements and monthly payouts</p>
            </div>
          </div>

          {awardHistory && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-sidebar border border-dark rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-dollar-sign text-primary-green text-lg"></i>
                  <div>
                    <p className="text-muted text-sm">Total Income Received</p>
                    <p className="text-light font-semibold">{formatCurrency(awardHistory.totalIncomeReceived)}</p>
                  </div>
                </div>
              </div>
              <div className="bg-sidebar border border-dark rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-calendar-check text-blue-400 text-lg"></i>
                  <div>
                    <p className="text-muted text-sm">Total Payouts</p>
                    <p className="text-light font-semibold">{awardHistory.totalPayouts}</p>
                  </div>
                </div>
              </div>
              <div className="bg-sidebar border border-dark rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-trophy text-yellow-400 text-lg"></i>
                  <div>
                    <p className="text-muted text-sm">Active Awards</p>
                    <p className="text-light font-semibold">
                      {awardHistory.awardProgress.filter(award => award.status === 'Active').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Award Progress List */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-medium rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <i className="fa-solid fa-award text-primary-green text-xl"></i>
                <h2 className="text-xl font-semibold text-light">Your Awards</h2>
              </div>

              <div className="space-y-3">
                {awardHistory?.awardProgress?.map((award, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedAward(award)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedAward?.id === award.id
                        ? 'border-primary-green bg-primary-green/10'
                        : 'border-dark bg-sidebar hover:border-medium'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-light font-medium">{award.tier.name}</h3>
                      <span className={`text-sm ${getStatusColor(award.status)}`}>
                        <i className="fa-solid fa-circle text-xs mr-1"></i>
                        {award.status}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted">Total Reward:</span>
                        <span className="text-light">{formatCurrency(award.totalReward)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted">Paid:</span>
                        <span className="text-green-400">{formatCurrency(award.totalPaid)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted">Progress:</span>
                        <span className="text-light">{award.paymentsCompleted}/{award.totalPayments}</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="w-full bg-dark rounded-full h-1.5">
                        <div 
                          className="bg-primary-green h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${(award.paymentsCompleted / award.totalPayments) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}

                {(!awardHistory?.awardProgress || awardHistory.awardProgress.length === 0) && (
                  <div className="text-center py-8">
                    <i className="fa-solid fa-award text-3xl text-muted mb-3"></i>
                    <p className="text-muted">No awards achieved yet</p>
                    <p className="text-muted text-sm">Keep building your team to unlock awards!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Award Details & Payout History */}
          <div className="lg:col-span-2">
            {selectedAward ? (
              <div className="space-y-6">
                {/* Award Details */}
                <div className="bg-card border border-medium rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <i className="fa-solid fa-info-circle text-blue-400 text-xl"></i>
                    <h2 className="text-xl font-semibold text-light">Award Details</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-muted text-sm mb-1">Award Tier</p>
                        <p className="text-light font-semibold text-lg">{selectedAward.tier.name}</p>
                      </div>
                      <div>
                        <p className="text-muted text-sm mb-1">Achievement Date</p>
                        <p className="text-light">{formatDate(selectedAward.achievedDate)}</p>
                      </div>
                      <div>
                        <p className="text-muted text-sm mb-1">Business at Achievement</p>
                        <p className="text-light">{formatCurrency(selectedAward.teamBusinessAtAchievement)}</p>
                      </div>
                      <div>
                        <p className="text-muted text-sm mb-1">Direct Referrals</p>
                        <p className="text-light">{selectedAward.directReferralsAtAchievement}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-muted text-sm mb-1">Total Reward</p>
                        <p className="text-light font-semibold text-lg">{formatCurrency(selectedAward.totalReward)}</p>
                      </div>
                      <div>
                        <p className="text-muted text-sm mb-1">Monthly Installment</p>
                        <p className="text-light">{formatCurrency(selectedAward.monthlyInstallment)}</p>
                      </div>
                      <div>
                        <p className="text-muted text-sm mb-1">Total Paid</p>
                        <p className="text-green-400 font-semibold">{formatCurrency(selectedAward.totalPaid)}</p>
                      </div>
                      <div>
                        <p className="text-muted text-sm mb-1">Remaining Amount</p>
                        <p className="text-yellow-400">{formatCurrency(selectedAward.remainingAmount)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-sidebar border border-dark rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-muted">Payment Progress</span>
                      <span className="text-light">{selectedAward.paymentsCompleted} / {selectedAward.totalPayments} payments</span>
                    </div>
                    <div className="w-full bg-dark rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-primary-green to-blue-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${(selectedAward.paymentsCompleted / selectedAward.totalPayments) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-2 text-sm">
                      <span className="text-muted">Started: {formatDate(selectedAward.achievedDate)}</span>
                      {selectedAward.nextPaymentDate && (
                        <span className="text-muted">Next: {formatDate(selectedAward.nextPaymentDate)}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Payout History */}
                <div className="bg-card border border-medium rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <i className="fa-solid fa-list text-primary-green text-xl"></i>
                    <h2 className="text-xl font-semibold text-light">Monthly Payouts</h2>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-dark">
                          <th className="text-left py-3 px-4 text-muted font-medium">Payment #</th>
                          <th className="text-left py-3 px-4 text-muted font-medium">Amount</th>
                          <th className="text-left py-3 px-4 text-muted font-medium">Date</th>
                          <th className="text-left py-3 px-4 text-muted font-medium">Status</th>
                          <th className="text-left py-3 px-4 text-muted font-medium">Remark</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedAward.payouts?.map((payout, index) => (
                          <tr key={index} className="border-b border-dark/50 hover:bg-sidebar/50 transition-colors">
                            <td className="py-3 px-4">
                              <span className="text-light font-medium">#{index + 1}</span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-green-400 font-medium">{formatCurrency(payout.amount)}</span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-light">{formatDate(payout.date)}</span>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPayoutStatusBadge(payout.status)}`}>
                                {payout.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-muted text-sm">{payout.remark}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {(!selectedAward.payouts || selectedAward.payouts.length === 0) && (
                      <div className="text-center py-8">
                        <i className="fa-solid fa-calendar-xmark text-3xl text-muted mb-3"></i>
                        <p className="text-muted">No payouts yet</p>
                        <p className="text-muted text-sm">Payouts will appear here once they start</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-card border border-medium rounded-2xl p-6">
                <div className="text-center py-12">
                  <i className="fa-solid fa-award text-4xl text-muted mb-4"></i>
                  <p className="text-muted text-lg">Select an award to view details</p>
                  <p className="text-muted text-sm">Choose an award from the list to see payout history</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAwardRewardHistory;