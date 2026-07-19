import { useAsync } from "./useAsync";
import { getSummary } from "@/api/summary";

export function useSummary() {
  const { data: summary, status } = useAsync(getSummary);
  return { summary, status };
}
