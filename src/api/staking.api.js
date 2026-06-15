import { Axios } from "../constants/mainContent";

const stakingApi = "/user/staking";

// Connect TokenPocket Wallet
export const connectTokenPocketWallet = async (payload) => {
    try {
        const response = await Axios.post(`${stakingApi}/connect-wallet`, payload);
        return response?.data;
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || error.message || "Failed to connect wallet"
        };
    }
};

// Get Wallet Status
export const getWalletStatus = async () => {
    try {
        const response = await Axios.get(`${stakingApi}/wallet-status`);
        return response?.data;
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || error.message || "Failed to get wallet status"
        };
    }
};

// Disconnect TokenPocket Wallet
export const disconnectWallet = async () => {
    try {
        const response = await Axios.post(`${stakingApi}/disconnect-wallet`);
        return response?.data;
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || error.message || "Failed to disconnect wallet"
        };
    }
};

// Initiate Staking
export const initiateStaking = async (payload) => {
    try {
        const response = await Axios.post(`${stakingApi}/stake`, payload);
        return response?.data;
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || error.message || "Failed to initiate staking"
        };
    }
};

// Get Staking Status and History
export const getStakingStatus = async () => {
    try {
        const response = await Axios.get(`${stakingApi}/status`);
        return response?.data;
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || error.message || "Failed to get staking status"
        };
    }
};

// Unstake Amount
export const unstakeAmount = async (payload) => {
    try {
        const response = await Axios.post(`${stakingApi}/unstake`, payload);
        return response?.data;
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || error.message || "Failed to unstake"
        };
    }
};
