import { useAsync } from "./useAsync";
import { getSecurityReport } from "@/services/securityReportService";

export function useSecurityReport() {
  const { data: report, status } = useAsync(getSecurityReport);
  return { report, status };
}
