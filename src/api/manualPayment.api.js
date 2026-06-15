import { Axios } from "../constants/mainContent";

// USER APIs
export const submitManualPayment = async (payload) => {
    try {
        const response = await Axios.post("/manual-payment/submit", payload);
        return response?.data;
    } catch (error) {
        return { success: false, message: error?.response?.data?.message || error.message || "Submission failed" };
    }
};

export const getUserManualPaymentHistory = async () => {
    try {
        const response = await Axios.get("/manual-payment/history");
        return response?.data;
    } catch (error) {
        return { success: false, message: error?.response?.data?.message || error.message || "API error" };
    }
};

// ADMIN APIs
export const getAllManualPaymentRequests = async (params = {}) => {
    try {
        const response = await Axios.get("/manual-payment/admin/all", { params });
        return response?.data;
    } catch (error) {
        return { success: false, message: error?.response?.data?.message || error.message || "API error" };
    }
};

export const getManualPaymentDetail = async (id) => {
    try {
        const response = await Axios.get(`/manual-payment/admin/${id}`);
        return response?.data;
    } catch (error) {
        return { success: false, message: error?.response?.data?.message || error.message || "API error" };
    }
};

export const approveManualPayment = async (payload) => {
    try {
        const response = await Axios.post("/manual-payment/admin/approve", payload);
        return response?.data;
    } catch (error) {
        return { success: false, message: error?.response?.data?.message || error.message || "Approval failed" };
    }
};

export const rejectManualPayment = async (payload) => {
    try {
        const response = await Axios.post("/manual-payment/admin/reject", payload);
        return response?.data;
    } catch (error) {
        return { success: false, message: error?.response?.data?.message || error.message || "Rejection failed" };
    }
};
