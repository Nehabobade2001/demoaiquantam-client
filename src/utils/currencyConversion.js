/**
 * Currency Conversion Utility - Frontend Version
 * Handles conversion between USDT and SafePal Coin (SFP)
 */

// Current rate (will be updated from backend):
// 1 USDT = 4 SFP (1 SFP = 0.25 USDT)
const CONVERSION_RATES = {
    SFP_TO_USDT: 0.25,    // 1 SFP = 0.25 USDT
    USDT_TO_SFP: 4,       // 1 USDT = 4 SFP
};
import { Axios } from "../constants/mainContent";

/**
 * Convert USDT to SafePal Coin (SFP)
 * @param {number} usdtAmount - Amount in USDT
 * @returns {number} Equivalent amount in SFP
 */
export const convertUSDTtoSFP = (usdtAmount) => {
    if (usdtAmount == null || isNaN(usdtAmount)) return 0;
    return Number(usdtAmount) * CONVERSION_RATES.USDT_TO_SFP;
};

/**
 * Convert SafePal Coin (SFP) to USDT
 * @param {number} sfpAmount - Amount in SFP
 * @returns {number} Equivalent amount in USDT
 */
export const convertSFPtoUSDT = (sfpAmount) => {
    if (sfpAmount == null || isNaN(sfpAmount)) return 0;
    return Number(sfpAmount) * CONVERSION_RATES.SFP_TO_USDT;
};

/**
 * Get conversion rate for a currency pair
 * @param {string} from - Source currency ('USDT' or 'SafePalCoin')
 * @param {string} to - Target currency ('USDT' or 'SafePalCoin')
 * @returns {number} Conversion rate
 */
export const getConversionRate = (from, to) => {
    if (from === to) return 1;

    if (from === 'USDT' && to === 'SafePalCoin') {
        return CONVERSION_RATES.USDT_TO_SFP;
    }

    if (from === 'SafePalCoin' && to === 'USDT') {
        return CONVERSION_RATES.SFP_TO_USDT;
    }

    return 1;
};

/**
 * Convert amount from one currency to another
 * @param {number} amount - Amount to convert
 * @param {string} from - Source currency
 * @param {string} to - Target currency
 * @returns {number} Converted amount
 */
export const convertCurrency = (amount, from, to) => {
    if (amount == null || isNaN(amount)) return 0;
    if (from === to) return Number(amount);

    const rate = getConversionRate(from, to);
    return Number(amount) * rate;
};

/**
 * Format currency amount with symbol
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency type ('USDT' or 'SafePalCoin')
 * @returns {string} Formatted string with currency symbol
 */
export const formatCurrency = (amount, currency = 'USDT') => {
    const symbol = currency === 'SafePalCoin' ? 'SFP' : 'USDT';

    if (amount == null || isNaN(amount)) return `0.00 ${symbol}`;

    const formattedAmount = Number(amount).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    return `${formattedAmount} ${symbol}`;
};

/**
 * Get both currency representations of an amount (in USD/USDT base)
 * @param {number} amount - Amount in USD/USDT
 * @returns {object} Object with both USDT and SFP values
 */
export const getBothCurrencies = (amount) => {
    if (amount == null || isNaN(amount)) {
        return {
            usdt: 0,
            sfp: 0,
            usdtFormatted: '0.00 USDT',
            sfpFormatted: '0.00 SFP'
        };
    }

    const usdtAmount = Number(amount);
    const sfpAmount = convertUSDTtoSFP(usdtAmount);

    return {
        usdt: usdtAmount,
        sfp: sfpAmount,
        usdtFormatted: formatCurrency(usdtAmount, 'USDT'),
        sfpFormatted: formatCurrency(sfpAmount, 'SafePalCoin')
    };
};

/**
 * Update conversion rates from backend response
 * @param {object} rates - Rates object from backend
 */
export const updateConversionRatesFromBackend = (rates) => {
    if (!rates) return;

    // Possible shapes:
    // 1) { sfpToUsdt, usdtToSfp }
    // 2) { data: { base: { usd, inr }, amount, converted } } (from /sfp-price)
    // 3) { usd: <number>, inr: <number> } (direct safepal object)

    let sfpToUsdt = null;
    let usdtToSfp = null;

    if (rates.sfpToUsdt != null || rates.usdtToSfp != null) {
        sfpToUsdt = rates.sfpToUsdt ?? rates.sfp_to_usdt ?? rates.SFP_TO_USDT ?? null;
        usdtToSfp = rates.usdtToSfp ?? rates.usdt_to_sfp ?? rates.USDT_TO_SFP ?? null;
    } else if (rates.data && rates.data.base) {
        const base = rates.data.base;
        sfpToUsdt = base.usd ?? base.USD ?? null;
    } else if (rates.usd != null) {
        sfpToUsdt = rates.usd;
    } else if (rates.base && rates.base.usd != null) {
        sfpToUsdt = rates.base.usd;
    }

    if (sfpToUsdt != null && !isNaN(Number(sfpToUsdt))) {
        CONVERSION_RATES.SFP_TO_USDT = Number(sfpToUsdt);
        if (Number(sfpToUsdt) === 0) {
            CONVERSION_RATES.USDT_TO_SFP = 0;
        } else {
            CONVERSION_RATES.USDT_TO_SFP = Number((1 / Number(sfpToUsdt)).toFixed(8));
        }
    }

    if ((usdtToSfp != null) && !isNaN(Number(usdtToSfp))) {
        CONVERSION_RATES.USDT_TO_SFP = Number(usdtToSfp);
        if (Number(usdtToSfp) === 0) {
            CONVERSION_RATES.SFP_TO_USDT = 0;
        } else {
            CONVERSION_RATES.SFP_TO_USDT = Number((1 / Number(usdtToSfp)).toFixed(8));
        }
    }
};

/**
 * Get current conversion rates
 * @returns {object} Current conversion rates
 */
export const getCurrentRates = () => {
    return { ...CONVERSION_RATES };
};

/**
 * Get currency symbol
 * @param {string} currency - Currency type
 * @returns {string} Currency symbol
 */
export const getCurrencySymbol = (currency) => {
    return currency === 'SafePalCoin' ? 'SFP' : 'USDT';
};

/**
 * Fetch conversion rates from backend and update local constants.
 * Tries `/exchange-rates` first, falls back to `/sfp-price` if response differs.
 * Returns the current rates after update.
 * @param {string} apiUrl - optional full URL or path to call (defaults to '/sfp-price')
 */

export const fetchRatesFromBackend = async (apiUrl = '/sfp-price', options = {}) => {
    if (!apiUrl) throw new Error('apiUrl required');

    // Use Axios so the request respects the app baseURL and credentials
    const resp = await Axios.get(apiUrl, { params: { amount: 1 }, ...(options.params ? { params: { ...options.params, amount: 1 } } : {}), ...(options || {}) });
    const data = resp?.data ?? resp;

    // Log raw backend response for debugging
    try {
        console.debug('[currencyConversion] fetchRatesFromBackend response', data);
    } catch (e) {
        // ignore if console is not available
    }

    // Normalize and update
    updateConversionRatesFromBackend(data);

    const rates = getCurrentRates();
    console.info('[currencyConversion] rates updated', rates);

    // Dispatch a global event so UI components can listen and update
    try {
        if (typeof window !== 'undefined' && window && window.dispatchEvent) {
            const ev = new CustomEvent('currencyRatesUpdated', { detail: rates });
            window.dispatchEvent(ev);
        }
    } catch (e) {
        // ignore
    }

    return rates;
};

/**
 * Start auto-refreshing rates from backend. Returns a stop function.
 */
export const startAutoRefreshRates = (apiUrl = '/sfp-price', intervalMs = 60000, fetchOptions) => {
    if (!apiUrl) throw new Error('apiUrl required');

    // initial fire
    fetchRatesFromBackend(apiUrl, fetchOptions).catch(() => {});

    const id = setInterval(() => {
        fetchRatesFromBackend(apiUrl, fetchOptions).catch(() => {});
    }, intervalMs);

    return () => clearInterval(id);
};

/**
 * Initialize conversion rates once (call on app startup)
 * @param {string} apiUrl - backend endpoint (defaults to '/sfp-price')
 */
export const initConversionRates = async (apiUrl = '/sfp-price') => {
    try {
        await fetchRatesFromBackend(apiUrl);
    } catch (err) {
        // ignore - keep using static fallback rates
        // console.warn('initConversionRates failed', err);
    }
};
