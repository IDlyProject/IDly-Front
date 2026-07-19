// src/pages/Organize/components/ServiceCard.jsx
import { useState } from "react";
import TaskStatusIcon from "./TaskStatusIcon";
import ServiceIcon from "@/components/ui/ServiceIcon";
import ChevronBottomIcon from "@/assets/ic_chevron_bottom_18.svg";
import ChevronTopIcon from "@/assets/ic_chevron_top_18.svg";

const BADGE_STYLE = {
  pending: {
    label: "진행중",
    className: "text-[#FFB200]",
  },
  waiting: {
    label: "대기중",
    className: "text-[#B0B1B4]",
  },
  skipped: {
    label: "건너뜀",
    className: "text-[#B0B1B4]",
  },
};

function ServiceCard({
  service,
  onSelectService,
  onSelectTask,
  defaultOpen = false,
}) {
  const [open, setOpen] = useState(defaultOpen);

  const handleToggleChevron = (e) => {
    e.stopPropagation(); // 카드 전체 클릭 이벤트로 전파되지 않도록 차단
    setOpen((v) => !v);
  };

  const handleCardClick = () => {
    onSelectService?.(service.id);
  };

  return (
    <div className="mb-6 overflow-hidden rounded-[18px] bg-white shadow-[0_1px_3px_rgba(16,24,46,0.03)]">
      <button
        onClick={handleCardClick}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
      >
        <ServiceIcon
          iconUrl={service.iconUrl}
          iconBg={service.iconBg}
          iconText={service.iconText}
          className="h-9 w-9 shrink-0 rounded-[10px] text-[16px]"
        />
        <div className="flex-1">
          <b className="block text-b24 text-[15px] text-gray100">
            {service.name}
          </b>
          <small className="mt-0.5 block text-m14 text-[11px] text-gray50">
            조치 {service.actionCount}건
          </small>
        </div>
        <span
          onClick={handleToggleChevron}
          role="button"
          aria-label={open ? "접기" : "펼치기"}
          className="-m-2 grid h-9 w-9 shrink-0 place-items-center"
        >
          <img
            src={open ? ChevronTopIcon : ChevronBottomIcon}
            alt=""
            className="h-4.5 w-4.5"
          />
        </span>
      </button>

      {open && (
        <div className="border-t-[0.76px] border-[#E5E7EB]">
          {service.tasks.map((task) => (
            <button
              key={task.id}
              onClick={(e) => {
                e.stopPropagation();
                onSelectTask?.(service.id, task.id);
              }}
              className="flex w-full items-center gap-2.5 pl-16 pr-4 py-4 text-left"
            >
              <TaskStatusIcon status={task.status} />
              <span className="flex-1 text-sb16 text-[13px] text-gray100">
                {task.title}
              </span>
              {task.timeAgo && (
                <span className="text-m14 text-[10px] text-gray50">
                  {task.timeAgo}
                </span>
              )}
              {BADGE_STYLE[task.status] && (
                <span
                  className={`text-m14 text-[10px] ${BADGE_STYLE[task.status].className}`}
                >
                  {BADGE_STYLE[task.status].label}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ServiceCard;
