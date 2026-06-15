import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./animation.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { initConversionRates, startAutoRefreshRates } from './utils/currencyConversion';

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);

// Initialize SFP conversion rates (best-effort)
initConversionRates().catch(() => {});
// Optional: start background refresh (every 60s)
startAutoRefreshRates();
