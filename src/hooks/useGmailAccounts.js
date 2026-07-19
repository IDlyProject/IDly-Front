import { useAsync } from "./useAsync";
import { getAccounts } from "@/api/users";

export function useGmailAccounts() {

  const { data: accounts, status } = useAsync(getAccounts, []);
  return { accounts, status };
}
