import { useAsync } from "./useAsync";
import { getDormantAccounts } from "@/api/dormantAccounts";

export function useDormantAccounts() {
  const { data: accounts, status, reload } = useAsync(getDormantAccounts, []);
  return { accounts, status, reload };
}
