/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import { NumberFormatCommas } from "../../../utils/FormatText";

const StatCard = ({
  title,
  value,
  icon,
  iconImage,
  change,
  changeType,
  isMoney,
  path,
  data,
  highlight
}) => {
  const isPositive = changeType === "positive";
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(path, { state: data });
  };

  return (
    <div 
      className={`card cursor-pointer transition-all duration-300 ${
        highlight
          ? "border-2 border-green-500/60 bg-green-500/10 shadow-lg shadow-green-500/20 hover:shadow-green-500/40"
          : "hero-glass hover-gold-shadow"
      }`}
      onClick={handleNavigate}
    >
      <div className="flex items-center gap-4">
        {iconImage ? (
          <div className={`w-12 h-12 flex items-center justify-center rounded-full border ${
            highlight ? "bg-green-500/20 border-green-500/40" : "bg-space-cadet/50 border-glass-border"
          }`}>
            <img src={iconImage} alt={title} className="w-8 h-8 object-contain" />
          </div>
        ) : (
          <div className={`w-12 h-12 flex items-center justify-center rounded-full border ${
            highlight ? "bg-green-500/20 border-green-500/40" : "bg-space-cadet/50 border-glass-border"
          }`}>
            <img src={icon} className="w-8 h-8 object-contain" alt="" />
          </div>
        )}
        <div className="flex-1">
          <p className={`text-sm flex items-center gap-1 ${
            highlight ? "text-green-400 font-semibold" : "text-hero-secondary"
          }`}>
            {highlight && <i className="fa-solid fa-arrow-trend-up text-xs"></i>}
            {title}
          </p>
          <p className={`text-2xl font-bold ${
            highlight ? "text-green-400" : "text-hero-primary gradient-text"
          }`}>
            {value || 0}
          </p>
        </div>
      </div>
      {change && (
        <div
          className={`mt-4 text-xs flex items-center font-semibold ${
            isPositive ? "text-stat-active" : "text-red-400"
          }`}
        >
          <i
            className={`fa-solid ${
              isPositive ? "fa-arrow-up" : "fa-arrow-down"
            } mr-1`}
          ></i>
          {change} in last 7 days
        </div>
      )}
    </div>
  );
};

export default StatCard;