import React, { useEffect, useState } from 'react';
import { getCurrentRates } from '../../utils/currencyConversion';

export default function RateBanner({ inline = false }) {
  const [rates, setRates] = useState(getCurrentRates());

  useEffect(() => {
    function onUpdate(e) {
      setRates(e.detail || getCurrentRates());
    }

    // Listen for global updates
    if (typeof window !== 'undefined') {
      window.addEventListener('currencyRatesUpdated', onUpdate);
    }

    // fallback: ensure we have the latest once mounted
    setRates(getCurrentRates());

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('currencyRatesUpdated', onUpdate);
      }
    };
  }, []);

  const sfp = rates?.SFP_TO_USDT ?? rates?.sfp_to_usdt ?? 0;
  const usdt = rates?.USDT_TO_SFP ?? rates?.usdt_to_sfp ?? 0;

  const fixedStyle = {
    position: 'fixed', right: 12, top: 80, zIndex: 9999,
    background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '8px 12px', borderRadius: 8, fontSize: 13
  };

  const inlineStyle = {
    position: 'absolute', right: 20, top: 18, zIndex: 20,
    background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
    color: '#fff', padding: '6px 12px', borderRadius: 8, fontSize: 13,
    textAlign: 'right', minWidth: 180, border: '1px solid rgba(255,255,255,0.04)'
  };

  const style = inline ? inlineStyle : fixedStyle;

  // Friendly display: show 1 SFP = $X and 1 USDT = Y SFP
  const oneSfpUsd = Number(sfp || 0);
  const oneUsdtSfp = Number(usdt || 0);

  return (
    <div style={style} aria-live="polite">
      <div style={{ fontWeight: 700, marginBottom: 6, textAlign: 'right' }}>Conversion Rates</div>
      <div style={{ fontSize: 13, color: '#cbd5e1' }}>
        <span style={{ color: '#9be7ff', fontWeight: 700 }}>1 SFP</span> ≈ <span style={{ color: '#9be7ff', fontWeight: 700 }}>${oneSfpUsd.toFixed(6)}</span>
      </div>
      <div style={{ fontSize: 13, color: '#cbd5e1' }}>
        <span style={{ color: '#ffd28a', fontWeight: 700 }}>1 USDT</span> ≈ <span style={{ color: '#ffd28a', fontWeight: 700 }}>{oneUsdtSfp.toFixed(6)} SFP</span>
      </div>
    </div>
  );
}
