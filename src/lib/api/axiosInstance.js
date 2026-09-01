import axios from "axios";
import { API_BASE_URL } from "@/constants/api";
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from "./tokenStorage";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

// iOS Safari 등 SameSite=None 쿠키가 차단되는 환경 대응: idly_token/idly_refresh
// 쿠키가 저장되지 않으므로, 콜백에서 받은 토큰을 저장해두고 Bearer 헤더로 대체 전송한다.
axiosInstance.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let refreshPromise = null;

export function refreshAccessToken() {
  if (!refreshPromise) {
    const refreshToken = getRefreshToken();
    refreshPromise = axios
      .post(
        `${API_BASE_URL}/api/auth/refresh`,
        refreshToken ? { refreshToken } : {},
        { withCredentials: true },
      )
      .then(({ data }) => {
        if (data?.accessToken || data?.refreshToken) {
          setTokens({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          });
        }
        return true;
      })
      .catch(() => {
        if (refreshToken) clearTokens();
        return false;
      })
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
