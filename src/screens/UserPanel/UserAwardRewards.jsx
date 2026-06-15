import React, { useState, useEffect } from 'react';

const UserAwardRewards = () => {
  const [userProgress, setUserProgress] = useState({});
  const [awardHistory, setAwardHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Rank & Reward tiers data
  const awardTiers = [
    { rank: 'Dream Starter',   rewardAmount: 100,     teamTarget: 10000    },
    { rank: 'Rising Star',     rewardAmount: 300,     teamTarget: 30000    },
    { rank: 'Action Achiever', rewardAmount: 500,     teamTarget: 50000    },
    { rank: 'Vision Builder',  rewardAmount: 1000,    teamTarget: 100000   },
    { rank: 'Success Mentor',  rewardAmount: 2000,    teamTarget: 200000   },
    { rank: 'Growth Champion', rewardAmount: 5000,    teamTarget: 500000   },
    { rank: 'Power Director',  rewardAmount: 10000,   teamTarget: 1000000  },
    { rank: 'Elite Performer', rewardAmount: 50000,   teamTarget: 5000000  },
    { rank: 'Crown Legend',    rewardAmount: 100000,  teamTarget: 10000000 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch user's award history from API
        const response = await fetch('/api/user/award-history', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setUserProgress({
              teamBusiness: data.data.teamBusiness || 0
            });
            setAwardHistory(data.data.awardHistory || []);
          } else {
            // No data found - show empty state
            setUserProgress({ teamBusiness: 0 });
            setAwardHistory([]);
          }
        } else {
          // API error - show empty state
          setUserProgress({ teamBusiness: 0 });
          setAwardHistory([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Network error - show empty state
        setUserProgress({ teamBusiness: 0 });
        setAwardHistory([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getRowStatus = (teamTarget) => {
    const current = userProgress.teamBusiness || 0;
    if (current >= teamTarget) return 'bg-green-500/10 border-green-500/30';
    if (current >= teamTarget * 0.5) return 'bg-yellow-500/10 border-yellow-500/30';
    return 'bg-background/50 border-medium/50';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="bg-card border border-medium rounded-2xl p-6">
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-green"></div>
              <span className="ml-3 text-muted">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-card border border-medium rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-primary-green/20 rounded-xl flex items-center justify-center">
              <i className="fa-solid fa-award text-primary-green text-xl"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-light">Award & Rewards</h1>
              <p className="text-muted">Achieve team business targets to unlock rank rewards</p>
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

          <div className="bg-primary-green/10 border border-primary-green/30 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <i className="fa-solid fa-chart-line text-primary-green"></i>
              <div>
                <span className="text-sm text-muted">Your Current Team Business:</span>
                <span className="ml-2 text-lg font-bold text-primary-green">
                  ${(userProgress.teamBusiness || 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-medium">
                  <th className="text-left py-4 px-4 text-light font-semibold">#</th>
                  <th className="text-left py-4 px-4 text-light font-semibold">Rank</th>
                  <th className="text-left py-4 px-4 text-light font-semibold">Reward Amount</th>
                  <th className="text-left py-4 px-4 text-light font-semibold">Team Business</th>
                  <th className="text-center py-4 px-4 text-light font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {awardTiers.map((tier, index) => {
                  const current = userProgress.teamBusiness || 0;
                  const isAchieved = current >= tier.teamTarget;
                  const progress = Math.min((current / tier.teamTarget) * 100, 100);

                  return (
                    <tr key={index} className={`border-b border-medium/30 ${getRowStatus(tier.teamTarget)}`}>
                      <td className="py-4 px-4 text-muted text-sm">{index + 1}</td>
                      <td className="py-4 px-4">
                        <span className="font-semibold text-light">{tier.rank}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-lg font-bold text-primary-green">
                          ${tier.rewardAmount.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-light font-medium">
                          ${tier.teamTarget.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        {isAchieved ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
                            <i className="fa-solid fa-check text-xs"></i>
                            Achieved
                          </span>
                        ) : (
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-xs text-muted">{progress.toFixed(1)}%</span>
                            <div className="w-16 bg-background rounded-full h-1.5">
                              <div 
                                className="h-1.5 rounded-full bg-primary-green transition-all duration-300"
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Award History Section */}
        <div className="bg-card border border-medium rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-primary-green/20 rounded-xl flex items-center justify-center">
              <i className="fa-solid fa-history text-primary-green text-xl"></i>
            </div>
            <div>
              <h2 className="text-xl font-bold text-light">Award History</h2>
              <p className="text-muted">Your monthly award payout history</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-medium">
                  <th className="text-left py-4 px-4 text-light font-semibold">Date</th>
                  <th className="text-left py-4 px-4 text-light font-semibold">Amount</th>
                  <th className="text-left py-4 px-4 text-light font-semibold">Installment</th>
                  <th className="text-left py-4 px-4 text-light font-semibold">Total Reward</th>
                  <th className="text-left py-4 px-4 text-light font-semibold">Team Target</th>
                  <th className="text-center py-4 px-4 text-light font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {awardHistory.length > 0 ? (
                  awardHistory.map((record) => (
                    <tr key={record.id} className="border-b border-medium/30">
                      <td className="py-4 px-4 text-light">
                        {new Date(record.date).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-primary-green font-bold">
                          ${record.amount.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-light">
                        {record.installment}/{record.totalInstallments}
                      </td>
                      <td className="py-4 px-4 text-light">
                        ${record.totalReward.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-light">
                        ${record.teamTarget.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                          record.status === 'Paid' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          <i className={`fa-solid ${
                            record.status === 'Paid' ? 'fa-check' : 'fa-clock'
                          } text-xs`}></i>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-muted">
                      <i className="fa-solid fa-inbox text-2xl mb-2 block"></i>
                      No award history found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAwardRewards;