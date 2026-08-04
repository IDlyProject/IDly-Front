import { useAsync } from "./useAsync";
import { getAccounts } from "@/services/usersService";

export function useGmailAccounts() {

  const { data: accounts, status } = useAsync(getAccounts, []);
  return { accounts, status };
}
