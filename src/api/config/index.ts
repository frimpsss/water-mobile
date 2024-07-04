import axios, { InternalAxiosRequestConfig } from "axios";
import * as SecureStore from "expo-secure-store";

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  withCredentials: true,
});
export const apiAuthNotRequired = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  withCredentials: true,
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
  (config: any) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.method === "options") {
      return Promise.resolve({ status: 200 });
    }
    return config;
  },
  (error) => {
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
    console.log(error)
    if (error.response.status == (403) && !originalRequest?._retry) {
      console.log("interceptor running")
      originalRequest._retry = true;
      SecureStore.deleteItemAsync("auth")
    }

    return Promise.reject(error);
  }
);
const getToken = () => {
  return SecureStore.getItem("auth");
};
