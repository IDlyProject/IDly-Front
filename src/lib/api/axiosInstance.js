import axios from "axios";
import { API_BASE_URL } from "@/constants/api";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let refreshPromise = null;

export function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = axios
      .post(
        `${API_BASE_URL}/api/auth/refresh`,
        {},
        { withCredentials: true },
      )
      .then(() => true)
      .catch(() => false)
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;

    if (
      response?.status === 401 &&
      config &&
      !config._retry &&
      !config.url?.includes("/api/auth/")
    ) {
      config._retry = true;

      const refreshed = await refreshAccessToken();
      if (refreshed) {
        return axiosInstance(config);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
