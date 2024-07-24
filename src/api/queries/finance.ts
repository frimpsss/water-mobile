import axios from "axios";
import { api } from "../config";

export async function allBills() {
  try {
    const res = await api({
      method: "get",
      url: "/api/bills/user-bills",
    });

    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "An error occurred");
    }
    throw error;
  }
}

export async function paymentHistory() {
  try {
    const res = await api({
      method: "get",
      url: "/api/payments/all-user-transactions",
    });

    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "An error occurred");
    }
    throw error;
  }
}
