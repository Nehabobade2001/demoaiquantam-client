import React, { useEffect, useState } from "react";
import { getTradingSlabs } from "../../../api/user.api";

export default function TradingSlabs() {
  const [slabs, setSlabs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchSlabs = async () => {
      setLoading(true);
      const res = await getTradingSlabs();
      if (!mounted) return;
      if (res && res.success) {
        setSlabs(res.slabs || []);
      } else {
        setSlabs([]);
      }
      setLoading(false);
    };
    fetchSlabs();
    return () => (mounted = false);
  }, []);

  return (
    <div className="relative py-12 px-4 lg:px-0">
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold text-white">Monthly Trading Slabs</h2>
        <p className="text-gray-300 mt-2">Choose your investment band and see the monthly trading income range.</p>
      </div>

      <div className="max-w-4xl mx-auto bg-gradient-to-br from-white/5 to-white/3 rounded-2xl p-6 border border-white/10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-4 font-medium text-sm text-gray-300">
          <div className="p-3">Investment Amount (USD)</div>
          <div className="p-3">&nbsp;</div>
          <div className="p-3 text-right">Monthly Trading Income</div>
          <div className="p-3">&nbsp;</div>
        </div>

        {loading ? (
          <div className="text-center py-8 text-gray-400">Loading slabs...</div>
        ) : (
          <div className="space-y-3">
            {slabs && slabs.length > 0 ? (
              slabs.map((s, i) => (
                <div key={i} className="grid grid-cols-2 md:grid-cols-2 items-center gap-4">
                  <div className="flex items-center">
                    <div className="px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-200 font-semibold">{s.name}</div>
                  </div>
                  <div className="flex justify-end">
                    <div className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 text-white font-semibold">{s.minPercent}% - {s.maxPercent}%</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-400">No slabs available</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
