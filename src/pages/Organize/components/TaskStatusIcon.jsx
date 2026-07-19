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
  return <img src={WaitingIcon} className="h-4 w-4" />;
}

export default TaskStatusIcon;
