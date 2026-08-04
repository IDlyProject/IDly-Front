import { useAsync } from "./useAsync";
import { getDormantAccounts } from "@/services/dormantAccountsService";

export function useDormantAccounts() {
  const { data: accounts, status, reload } = useAsync(getDormantAccounts, []);
  return { accounts, status, reload };
}
