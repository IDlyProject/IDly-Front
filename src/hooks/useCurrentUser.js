import { useAsync } from "./useAsync";
import { fetchCurrentUser } from "@/api/auth";

export function useCurrentUser() {
  const { data: user, status: asyncStatus } = useAsync(fetchCurrentUser);

  // fetchCurrentUser는 비로그인 상태면 null을 반환한다 (throw가 아님) — error로 취급
  const status = asyncStatus === "ready" && !user ? "error" : asyncStatus;

  return { user, status }; // status: loading | ready | error
}
