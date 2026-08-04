import { useAsync } from "./useAsync";
import { getSummary } from "@/services/summaryService";

export function useSummary() {
  const { data: summary, status } = useAsync(getSummary);
  return { summary, status };
}
