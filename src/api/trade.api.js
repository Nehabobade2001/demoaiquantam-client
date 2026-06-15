import axios from "axios";
import { getAuthToken } from "../utils/authStorage";

const API_URL = import.meta.env.VITE_API_URL;

export const clickTradeButton = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.post(
      `${API_URL}/api/user/trade-button/click`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to process trade" };
  }
};

export const getTradeButtonStatus = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(
      `${API_URL}/api/user/trade-button/status`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to get trade status" };
  }
};
