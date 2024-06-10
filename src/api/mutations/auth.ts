import axios from "axios";
import { apiAuthNotRequired } from "../config";

export async function logIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const resp = await apiAuthNotRequired.post("/user/auth/login", {
      email,
      password,
    });
    return resp;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "An error occurred");
    }
    throw error;
  }
}

export async function signUp({
  email,
  password,
  phoneNumber,
  name,
}: {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
}) {
  try {
    const resp = await apiAuthNotRequired.post("/user/auth/register", {
      email,
      password,
      phoneNumber,
      name,
    });
    return resp;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "An error occurred");
    }
    throw error;
  }
}
