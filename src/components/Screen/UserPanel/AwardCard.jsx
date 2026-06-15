import React from 'react';

const AwardCard = ({ award, userProgress }) => {
  const isEligible = award.criteria.every(criterion => 
    (userProgress[criterion.key] || 0) >= criterion.required
  );

  const isClaimed = award.claimed || false;

  const getCardStatus = () => {
    if (isClaimed) return 'claimed';
    if (isEligible) return 'eligible';
    return 'locked';
  };

  const getStatusColor = () => {
    const status = getCardStatus();
    switch (status) {
      case 'claimed': return 'border-green-500 bg-green-500/10';
      case 'eligible': return 'border-primary-green bg-primary-green/10';
      default: return 'border-medium bg-background/50';
    }
  };

  const getStatusIcon = () => {
    const status = getCardStatus();
    switch (status) {
      case 'claimed': return 'fa-solid fa-check-circle text-green-500';
      case 'eligible': return 'fa-solid fa-gift text-primary-green';
      default: return 'fa-solid fa-lock text-muted';
    }
  };

  const getStatusText = () => {
    const status = getCardStatus();
    switch (status) {
      case 'claimed': return 'Claimed';
      case 'eligible': return 'Ready to Claim';
      default: return 'Locked';
    }
  };

  return (
    <div className={`rounded-2xl p-6 border transition-all duration-300 ${getStatusColor()}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            isEligible ? 'bg-primary-green/20' : 'bg-muted/20'
          }`}>
            <i className={`${award.icon} text-xl ${
              isEligible ? 'text-primary-green' : 'text-muted'
            }`}></i>
          </div>
          <div>
            <h3 className="font-bold text-light">{award.title}</h3>
            <p className="text-sm text-muted">{award.description}</p>
          </div>
        </div>
        <div className="text-right">
          <i className={getStatusIcon()}></i>
          <p className="text-xs mt-1 font-medium">{getStatusText()}</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-light">Total Reward</span>
          <span className="text-lg font-bold text-primary-green">${award.totalReward?.toLocaleString() || award.reward}</span>
        </div>
        {award.monthlyPayout && (
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted">Monthly Payout</span>
            <span className="text-sm font-medium text-yellow-400">${award.monthlyPayout.toLocaleString()} × 10 months</span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-medium text-light">Requirements:</h4>
        {award.criteria.map((criterion, index) => {
          const current = userProgress[criterion.key] || 0;
          const progress = Math.min((current / criterion.required) * 100, 100);
          const isComplete = current >= criterion.required;

          return (
            <div key={index} className="bg-background/30 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted">{criterion.title}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-light">
                    {current.toLocaleString()}/{criterion.required.toLocaleString()} {criterion.unit}
                  </span>
                  <i className={`fa-solid ${
                    isComplete ? 'fa-check text-green-500' : 'fa-times text-red-500'
                  } text-xs`}></i>
                </div>
              </div>
              <div className="w-full bg-background rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isComplete ? 'bg-green-500' : 'bg-primary-green'
                  }`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {isEligible && !isClaimed && (
        <button className="w-full mt-4 bg-primary-green hover:bg-primary-green/80 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
          Claim Reward
        </button>
      )}
    </div>
  );
};

export default AwardCard;