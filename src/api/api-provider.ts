import { ACCESS_TOKEN_KEY } from "@/context/auth-provider";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

// Create axios instance
export const backendApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token
backendApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Queue to store failed requests that should be retried after token refresh
let isRefreshing = false;
let failedQueue: {
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
  config: InternalAxiosRequestConfig;
}[] = [];

// Process the queue of failed requests
const processQueue = (
  error: Error | null = null,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.config.headers.Authorization = `Bearer ${token}`;
      prom.resolve(backendApi(prom.config));
    }
  });

  failedQueue = [];
};

// Add response interceptor to handle token refresh
backendApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig;

    // If the error is 401 and it's not a refresh token request and we haven't already attempted to refresh
    if (
      error.response?.status === 401 &&
      !originalRequest.url?.includes("/auth/refresh") &&
      !(originalRequest as InternalAxiosRequestConfig & { _retry?: boolean })
        ._retry
    ) {
      if (isRefreshing) {
        // If already refreshing, add the request to queue
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      isRefreshing = true;
      (
        originalRequest as InternalAxiosRequestConfig & { _retry?: boolean }
      )._retry = true;

      try {
        // Call the refresh token endpoint
        const response = await axios.post(
          `${
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
          }/auth/refresh`,
          {},
          {
            withCredentials: true, // Important for cookies if your refresh token is stored in cookies
          }
        );

        if (response.data.access_token) {
          const newToken = response.data.access_token;
          localStorage.setItem(ACCESS_TOKEN_KEY, newToken);

          // Update the authorization header
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          // Process any requests that were queued
          processQueue(null, newToken);

          return backendApi(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, clear tokens and reject all queued requests
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem("user");

        processQueue(refreshError as Error, null);

        // Optional: Redirect to login page
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
