import { Axios } from "../constants/mainContent";

/**
 * Fetch SFP price from backend
 * Backend route: GET /sfp-price?amount=1
 */
export const getSfpPrice = async (amount = 1) => {
  try {
    const response = await Axios.get(`/sfp-price`, { params: { amount } });
    return response.data;
  } catch (error) {
    console.error("getSfpPrice error:", error);
    return { success: false, message: error?.response?.data?.message || error.message || "API error" };
  }
};
