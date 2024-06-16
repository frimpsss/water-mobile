import axios from "axios";
import { api } from "../config";

export async function allNotifications() {
  try {
    const res = await api({
      method: "get",
      url: "/api/notification/all-notification?type=ALL",
    });

    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "An error occurred");
    }
    throw error;
  }
}
