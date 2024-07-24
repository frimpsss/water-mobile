import { CommonActions } from "@react-navigation/native";
import axios, { InternalAxiosRequestConfig } from "axios";
import * as SecureStore from "expo-secure-store";
export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
});
export const apiAuthNotRequired = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
});
api.interceptors.request.use(
  (config: any) => {
    if (config.method === "options") {
      return Promise.resolve({ status: 200 });
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  async (config: any) => {
    const token = await SecureStore.getItemAsync("auth");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.method === "options") {
      return Promise.resolve({ status: 200 });
    }
    return config;
  },
  (error) => {
    console.log(JSON.stringify(error))
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    if (error.response.status == 403 && !originalRequest?._retry) {
      originalRequest._retry = true;
      await SecureStore.deleteItemAsync("auth");
    }

    return Promise.reject(error);
  }
);
const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync("auth");
    return token;
  } catch (error) {
    return 123;
  }
};
