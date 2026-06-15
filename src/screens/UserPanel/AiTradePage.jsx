import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Bot, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { tradeInAi, getAiTradeStatus } from '../../api/user.api';
import { setLoading } from '../../redux/slices/loadingSlice';

const AiTradePage = () => {
  const [aiTradeStatus, setAiTradeStatus] = useState({
    aiTradeActivatedToday: false,
    lastAiTradeActivation: null
  });
  const dispatch = useDispatch();

  const fetchAiTradeStatus = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getAiTradeStatus();
      if (response.success) {
        setAiTradeStatus(response.data);
      }
    } catch (error) {
      console.error('Error fetching AI trade status:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleActivateAiTrade = async () => {
    try {
      dispatch(setLoading(true));
      const response = await tradeInAi();
      
      if (response.success) {
        toast.success(response.message || 'AI Trade activated successfully!');
        setAiTradeStatus(response.data);
      } else {
        toast.error(response.message || 'Failed to activate AI Trade');
      }
    } catch (error) {
      console.error('Error activating AI trade:', error);
      toast.error('Failed to activate AI Trade');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchAiTradeStatus();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-rich-black">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Bot className="w-12 h-12 text-gold" />
            <h1 className="text-4xl font-bold hero-text-gradient">AI Trading Bot</h1>
          </div>
          <p className="text-hero-secondary text-lg max-w-2xl mx-auto">
            Activate our advanced AI trading algorithm to maximize your returns with automated trading strategies.
          </p>
        </div>

        {/* Status Card */}
        <div className="card hero-glass">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Trading Status</h2>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              aiTradeStatus.aiTradeActivatedToday 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-gray-500/20 text-gray-400'
            }`}>
              {aiTradeStatus.aiTradeActivatedToday ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Active Today</span>
                </>
              ) : (
                <>
                  <Clock className="w-5 h-5" />
                  <span>Inactive</span>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <p className="text-hero-secondary">Status</p>
              <p className="text-xl font-semibold text-white">
                {aiTradeStatus.aiTradeActivatedToday ? 'AI Trade Active' : 'AI Trade Inactive'}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-hero-secondary">Last Activation</p>
              <p className="text-xl font-semibold text-white">
                {aiTradeStatus.lastAiTradeActivation 
                  ? new Date(aiTradeStatus.lastAiTradeActivation).toLocaleString()
                  : 'Never activated'
                }
              </p>
            </div>
          </div>

          {/* Activation Button */}
          <div className="text-center">
            <button
              onClick={handleActivateAiTrade}
              disabled={aiTradeStatus.aiTradeActivatedToday}
              className={`btn-primary flex items-center gap-3 text-lg mx-auto ${
                aiTradeStatus.aiTradeActivatedToday 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover-gold-shadow'
              }`}
            >
              <Bot className="w-6 h-6" />
              {aiTradeStatus.aiTradeActivatedToday ? 'Already Activated Today' : 'Activate AI Trade'}
              <TrendingUp className="w-5 h-5" />
            </button>
            
            {aiTradeStatus.aiTradeActivatedToday && (
              <p className="text-hero-secondary mt-4">
                AI Trade resets daily at 5:30 AM. Come back tomorrow to activate again.
              </p>
            )}
          </div>
        </div>

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card hero-glass">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-gold" />
              <h3 className="text-xl font-bold text-white">How It Works</h3>
            </div>
            <ul className="space-y-3 text-hero-secondary">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Click "Activate AI Trade" once per day</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span>AI algorithms analyze market trends</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Automated trades execute for maximum profit</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Resets daily at 5:30 AM IST</span>
              </li>
            </ul>
          </div>

          <div className="card hero-glass">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-8 h-8 text-gold" />
              <h3 className="text-xl font-bold text-white">Important Notes</h3>
            </div>
            <ul className="space-y-3 text-hero-secondary">
              <li className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span>One activation per day per user</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span>Trading profits are automatically credited</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span>Returns vary based on market conditions</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span>Check back daily for consistent profits</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiTradePage;