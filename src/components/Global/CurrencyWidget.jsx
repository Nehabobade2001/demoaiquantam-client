import React, { useEffect, useState } from "react";
import { getSfpPrice } from "../../api/currency.api";

export default function CurrencyWidget({ amount = 1 }) {
  const [state, setState] = useState({ loading: true });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const resp = await getSfpPrice(amount);
        if (!mounted) return;
        setState({ loading: false, data: resp });
      } catch (err) {
        if (!mounted) return;
        setState({ loading: false, error: err });
      }
    })();
    return () => (mounted = false);
  }, [amount]);

  if (state.loading) return <div>Loading price...</div>;
  if (state.error || !state.data || !state.data.success)
    return <div>Error: {state.error?.message || state.data?.message || "Unable to fetch"}</div>;

  const base = state.data.data?.base || {};
  const converted = state.data.data?.converted || {};

  return (
    <div>
      <div>SafePal (SFP) price:</div>
      <div>{Number(base.usd || 0).toFixed(6)} USD</div>
      <div>{Number(base.inr || 0).toFixed(2)} INR</div>
      <div>
        Amount: {state.data.data?.amount} → {Number(converted.usd || 0).toFixed(6)} USD
      </div>
    </div>
  );
}
