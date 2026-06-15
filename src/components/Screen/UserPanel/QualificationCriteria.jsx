import React from 'react';

const QualificationCriteria = ({ criteria, userProgress }) => {
  const calculateProgress = (current, required) => {
    return Math.min((current / required) * 100, 100);
  };

  const getStatusIcon = (current, required) => {
    if (current >= required) {
      return "fa-solid fa-check-circle text-green-500";
    } else if (current > 0) {
      return "fa-solid fa-clock text-yellow-500";
    } else {
      return "fa-solid fa-times-circle text-red-500";
    }
  };

  const getStatusText = (current, required) => {
    if (current >= required) return "Completed";
    if (current > 0) return "In Progress";
    return "Not Started";
  };

  return (
    <div className="bg-card border border-medium rounded-2xl p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-primary-green/20 rounded-xl flex items-center justify-center">
          <i className="fa-solid fa-list-check text-primary-green text-xl"></i>
        </div>
        <div>
          <h2 className="text-xl font-bold text-light">Qualification Criteria</h2>
          <p className="text-muted">Track your progress towards earning rewards</p>
        </div>
      </div>

      <div className="space-y-4">
        {criteria.map((criterion, index) => {
          const progress = calculateProgress(
            userProgress[criterion.key] || 0,
            criterion.required
          );
          const current = userProgress[criterion.key] || 0;

          return (
            <div key={index} className="bg-background/50 rounded-xl p-4 border border-medium/50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <i className={getStatusIcon(current, criterion.required)}></i>
                    <h3 className="font-semibold text-light">{criterion.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      current >= criterion.required 
                        ? 'bg-green-500/20 text-green-400' 
                        : current > 0 
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {getStatusText(current, criterion.required)}
                    </span>
                  </div>
                  <p className="text-muted text-sm mb-3">{criterion.description}</p>
                  
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted">Progress</span>
                    <span className="text-light font-medium">
                      {current.toLocaleString()} / {criterion.required.toLocaleString()} {criterion.unit}
                    </span>
                  </div>
                  
                  <div className="w-full bg-background rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        progress === 100 ? 'bg-green-500' : 'bg-primary-green'
                      }`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-muted">{progress.toFixed(1)}% Complete</span>
                    {criterion.reward && (
                      <span className="text-xs text-primary-green font-medium">
                        Reward: {criterion.reward}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QualificationCriteria;