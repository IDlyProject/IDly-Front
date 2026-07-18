// src/pages/Organize/components/TaskStatusIcon.jsx
function TaskStatusIcon({ status }) {
  if (status === "done") {
    return (
      <div className="grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-[#12b886]">
        <svg width="11" height="9" viewBox="0 0 12 10" fill="none">
          <path
            d="M1 5L4.5 8.5L11 1.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }
  if (status === "pending") {
    return (
      <div className="grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-[#fff0cf]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#e8a13a]" />
      </div>
    );
  }
  return (
    <div className="h-5 w-5 flex-shrink-0 rounded-full border-2 border-gray-200" />
  );
}

export default TaskStatusIcon;
