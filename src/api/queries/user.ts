import axios from "axios";
import { api } from "../config";

export async function getUserInfo() {
  try {
    const res = await api({
      method: "get",
      url: "/user/auth/details",
    });

    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "An error occurred");
    }
    throw error;
  }
}
