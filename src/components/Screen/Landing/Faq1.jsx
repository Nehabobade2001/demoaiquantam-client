import React, { useState, useEffect, useRef } from "react";
import { LandingRouters } from "../../../constants/routes";
import { useNavigate } from "react-router-dom";

const faqData = [
  {
    question: "What is AIQuantum Crypto?",
    answer: [
      "AIQuantum Crypto is a next-generation decentralized finance (DeFi) investment platform.",
      "It is designed to simplify market complexity using advanced technology and data-driven strategies.",
      "The platform focuses on transparency, sustainability, and long-term value creation.",
    ],
    icon: "🌌",
    color: "from-blue-500 to-indigo-500",
  },
  {
    question: "How do AIQuantum Crypto investment plans work?",
    answer: [
      "Users choose from multiple growth plans based on duration and investment range.",
      "Each plan offers a fixed daily ROI for a defined number of days.",
      "Returns are automatically generated based on the selected plan rules.",
      "Higher investment tiers provide higher daily and total ROI percentages.",
    ],
    icon: "📈",
    color: "from-green-500 to-emerald-500",
  },
  {
    question: "What investment plans are available?",
    answer: [
      "Basic Growth Plan: 30 days with up to 7% daily ROI depending on investment size.",
      "Economic Growth Plan: 45 days with 6% daily ROI.",
      "Diamond Growth Plan: 60 days with 7% daily ROI and the highest total returns.",
    ],
    icon: "💎",
    color: "from-cyan-500 to-blue-500",
  },
  {
    question: "How does the referral bonus system work?",
    answer: [
      "Users earn fixed referral bonuses based on their referral’s deposit amount.",
      "Higher referral investments unlock higher bonus rewards.",
      "Referral bonuses are credited instantly once conditions are met.",
    ],
    icon: "🤝",
    color: "from-purple-500 to-pink-500",
  },
  {
    question: "What is Level ROI Dividend?",
    answer: [
      "Users earn additional ROI based on their team depth and unlocked levels.",
      "Levels 1–3 provide 5% ROI, while deeper levels provide decreasing percentages.",
      "Level unlocks depend on the number of direct referrals and minimum investment.",
    ],
    icon: "⭐",
    color: "from-yellow-500 to-orange-500",
  },
  {
    question: "What are the withdrawal rules?",
    answer: [
      "The minimum withdrawal amount is $1.",
      "A 10% deduction applies to every withdrawal.",
      "Withdrawals distribute income across upline and downline levels.",
    ],
    icon: "💸",
    color: "from-red-500 to-rose-500",
  },
  {
    question: "Is AIQuantum Crypto safe to use?",
    answer: [
      "The platform follows predefined rules with transparent investment structures.",
      "All plans, ROI rates, and conditions are clearly disclosed.",
      "Users retain full control over their participation and withdrawal actions.",
    ],
    icon: "🛡️",
    color: "from-indigo-500 to-purple-500",
  },
];


const Faq1 = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [faqsVisible, setFaqsVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  const headerRef = useRef(null);
  const faqsRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const createObs = (setter, threshold = 0.2) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) { setter(true); obs.disconnect(); }
        },
        { threshold }
      );
      return obs;
    };
    const observers = [];

    const obs1 = createObs(setHeaderVisible, 0.3);
    if (headerRef.current) obs1.observe(headerRef.current);
    observers.push(obs1);

    const obs2 = createObs(setFaqsVisible, 0.1);
    if (faqsRef.current) obs2.observe(faqsRef.current);
    observers.push(obs2);

    const obs3 = createObs(setCtaVisible, 0.2);
    if (ctaRef.current) obs3.observe(ctaRef.current);
    observers.push(obs3);

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative container mx-auto lg:px-[115px] py-20 bg-primary text-primary" id="faq">
      <style>
        {`
          @keyframes float-question {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
          }
          
          @keyframes shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          
          @keyframes expand {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
            50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
          }

          @keyframes checkmark {
            0% { width: 0; }
            100% { width: 12px; }
          }
          
          .animate-float-question { animation: float-question 3s ease-in-out infinite; }
          .animate-shimmer {
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
            background-size: 200% 100%;
            animation: shimmer 2s infinite;
          }
          .animate-expand { animation: expand 0.3s ease-out forwards; }
          .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
          
          .glass-card {
            background: rgba(11, 11, 11, 0.5);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          
          .faq-item-open {
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.05) 100%);
            border: 1px solid rgba(59, 130, 246, 0.3);
          }
          
          .checkmark::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            width: 12px;
            height: 2px;
            background: currentColor;
            animation: checkmark 0.3s ease-out forwards;
          }
        `}
      </style>

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-gray-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-gray-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header Section */}
      <div ref={headerRef} className="relative flex flex-col items-center gap-6 max-w-[800px] mx-auto text-center mb-16" style={{
        opacity: headerVisible ? 1 : 0,
        transform: headerVisible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
      }}>
        {/* Animated Icon */}
        <div className="relative animate-float-question">
          <div className="absolute inset-0 bg-gray-500/30 rounded-2xl blur-xl animate-pulse-glow" />
          <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-600 to-gray-700 shadow-2xl">
            <span className="text-3xl">❓</span>
          </div>
        </div>

        {/* Title with Gradient */}
        <h2 className="text-4xl lg:text-6xl font-bold leading-tight">
          <span className="bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent">
            Frequently Asked
          </span>
          <br />
          <span className="text-primary">Questions</span>
        </h2>

        {/* Subtitle */}
        <p className="text-lg lg:text-xl text-secondary max-w-2xl">
          Everything you need to know about <span className="text-gray-400 font-semibold">AIQuantum Crypto</span>. 
          Can't find what you're looking for? <span className="text-accent cursor-pointer hover:underline">Contact us</span>
        </p>

        {/* Quick Stats */}
        <div className="flex flex-wrap justify-center gap-6 mt-4">
          <div className="glass-card px-4 py-2 rounded-full bg-card border border-light">
            <span className="text-sm text-secondary">Response Time: </span>
            <span className="text-gray-400 font-semibold">Instant</span>
          </div>
          <div className="glass-card px-4 py-2 rounded-full bg-card border border-light">
            <span className="text-sm text-secondary">24/7 Support</span>
            <span className="ml-2">✓</span>
          </div>
        </div>
      </div>

      {/* FAQ Items Container */}
      <div className="relative max-w-[900px] mx-auto">
        {/* Connection Lines (Desktop) */}
        <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-500/30 to-transparent ml-8" />

        <div ref={faqsRef} className="flex flex-col gap-4" style={{
          opacity: faqsVisible ? 1 : 0,
          transform: faqsVisible ? "translateY(0)" : "translateY(50px)",
          transition: "opacity 0.9s ease-out, transform 0.9s ease-out",
        }}>
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Number Badge (Desktop) */}
                <div className="hidden lg:flex absolute -left-10 top-6 items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 text-light text-sm font-bold shadow-lg z-10">
                  {index + 1}
                </div>

                {/* FAQ Card */}
                <div
                  onClick={() => toggleFAQ(index)}
                  className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 transform ${
                    isOpen 
                      ? 'bg-card border border-accent shadow-green scale-[1.02]' 
                      : 'bg-card border border-light hover:bg-secondary hover:scale-[1.01] hover:shadow-medium hover:border-accent'
                  }`}
                >
                  {/* Shimmer Effect on Hover */}
                  {isHovered && !isOpen && (
                    <div className="absolute inset-0 animate-shimmer pointer-events-none" />
                  )}

                  {/* Question Section */}
                  <div className="flex items-start gap-4 p-6 lg:p-8">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl shadow-lg transform transition-transform duration-300 ${
                      isOpen ? 'scale-110 rotate-12' : isHovered ? 'scale-105' : ''
                    }`}>
                      {item.icon}
                    </div>

                    {/* Question Text */}
                    <div className="flex-1">
                      <h3 className="text-lg lg:text-xl font-semibold text-primary pr-4 leading-relaxed">
                        {item.question}
                      </h3>
                    </div>

                    {/* Toggle Button */}
                    <button
                      className={`flex-shrink-0 w-10 h-10 rounded-full bg-secondary border border-light flex items-center justify-center transition-all duration-300 ${
                        isOpen ? 'rotate-45 bg-gray-600 border-gray-600' : 'hover:bg-secondary hover:border-accent'
                      }`}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 5V19M5 12H19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Answer Section */}
                  {isOpen && (
                    <div className="px-6 lg:px-8 pb-6 lg:pb-8 animate-expand">
                      {/* Divider */}
                      <div className="mb-6 h-px bg-gradient-to-r from-transparent via-light to-transparent" />

                      {/* Answer Content */}
                      <div className="pl-0 lg:pl-16 space-y-3">
                        {item.answer.map((line, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-3 text-secondary animate-expand"
                            style={{ animationDelay: `${idx * 0.05}s` }}
                          >
                            {/* Custom Checkmark Bullet */}
                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-green/20 flex items-center justify-center mt-0.5">
                              <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                                <path d="M1 5L4.5 8.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"/>
                              </svg>
                            </div>
                            <span className="flex-1 leading-relaxed">{line}</span>
                          </div>
                        ))}
                      </div>

                      {/* Additional Info Card */}
                      <div className="mt-6 lg:ml-16 bg-card rounded-xl p-4 border-l-4 border-gray-600">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">💡</span>
                          <div>
                            <p className="text-sm text-secondary">
                              <span className="font-semibold text-primary">Pro Tip:</span> For more detailed information, 
                              check our <span className="text-gray-400 hover:underline cursor-pointer">documentation</span> or 
                              <span className="text-accent hover:underline cursor-pointer ml-1">contact support</span>.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Gradient Border Effect (Active) */}
                  {isOpen && (
                    <div className="absolute inset-0 rounded-2xl pointer-events-none">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gray-500/20 via-gray-600/20 to-gray-500/20 opacity-50" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div ref={ctaRef} className="mt-12 text-center" style={{
          opacity: ctaVisible ? 1 : 0,
          transform: ctaVisible ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s",
        }}>
          <div className="bg-card rounded-2xl p-8 max-w-2xl mx-auto border border-light">
            <h3 className="text-2xl font-bold text-primary mb-3">Still have questions?</h3>
            <p className="text-secondary mb-6">
              Our support team is here to help you 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full font-semibold text-light hover:shadow-lg transition-all duration-300 hover:scale-105" onClick={() => navigate(LandingRouters.USER_REGISTER)}>
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq1;