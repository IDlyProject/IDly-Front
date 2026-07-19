// src/hooks/useGmailAccounts.js
import { useAsync } from "./useAsync";
import { getAccounts } from "@/api/users";

export function useGmailAccounts() {
  // AccountManagement가 로딩 상태를 가드하지 않고 바로 accounts.filter(...)를 쓰므로
  // 초기값을 []로 둬서 깨지지 않게 한다.
  const { data: accounts, status } = useAsync(getAccounts, []);
  return { accounts, status };
}
