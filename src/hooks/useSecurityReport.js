import { useAsync } from "./useAsync";
import { getSecurityReport } from "@/api/securityReport";

export function useSecurityReport() {
  const { data: report, status } = useAsync(getSecurityReport);
  return { report, status };
}
