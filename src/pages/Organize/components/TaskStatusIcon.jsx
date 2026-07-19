import FinishedIcon from "@/assets/ic_finished_mini.svg";
import WaitingIcon from "@/assets/ic_waiting_mini.svg";

// action.status는 pending | done뿐 — pending은 "대기중"이라 대기 아이콘을 사용
function TaskStatusIcon({ status }) {
  if (status === "done") {
    return <img src={FinishedIcon} className="h-4 w-4" />;
  }
  return <img src={WaitingIcon} className="h-4 w-4" />;
}

export default TaskStatusIcon;
