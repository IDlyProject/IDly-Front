import FinishedIcon from "@/assets/ic_finished_mini.svg";
import LoadingIcon from "@/assets/ic_loading.svg";
import WaitingIcon from "@/assets/ic_waiting_mini.svg";

function TaskStatusIcon({ status }) {
  if (status === "done") {
    return <img src={FinishedIcon} className="h-4 w-4" />;
  }
  if (status === "pending") {
    return <img src={LoadingIcon} className="h-4 w-4" />;
  }
  // skipped를 포함해 그 외 상태는 대기 아이콘으로 표시
  return <img src={WaitingIcon} className="h-4 w-4" />;
}

export default TaskStatusIcon;
