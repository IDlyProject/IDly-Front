// src/pages/Organize/components/ServiceCard.jsx
import { useState } from "react";
import TaskStatusIcon from "./TaskStatusIcon";

function ChevronIcon({ open }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#9aa4b2"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform ${open ? "rotate-180" : ""}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function ServiceCard({ service, onSelectTask, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="mb-2.5 overflow-hidden rounded-2xl bg-white shadow-sm">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 p-3.5 text-left"
      >
        <div
          className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl text-sm font-bold text-white"
          style={{ background: service.iconBg }}
        >
          {service.iconText}
        </div>
        <div className="flex-1">
          <b className="block text-sm text-[#191f28]">{service.name}</b>
          <small className="mt-0.5 block text-[11px] font-bold text-[#9aa4b2]">
            조치 {service.actionCount}건
          </small>
        </div>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div className="border-t border-gray-50">
          {service.tasks.map((task) => (
            <button
              key={task.id}
              onClick={() => onSelectTask?.(service.id, task.id)}
              className="flex w-full items-center gap-2.5 border-b border-gray-50 px-3.5 py-2.5 text-left last:border-b-0"
            >
              <TaskStatusIcon status={task.status} />
              <span className="flex-1 text-[13px] font-bold text-[#191f28]">
                {task.title}
              </span>
              {task.timeAgo && (
                <span className="text-[10px] font-bold text-[#c0c8d4]">
                  {task.timeAgo}
                </span>
              )}
              {task.badge && (
                <span className="rounded-full bg-[#fff0cf] px-2 py-0.5 text-[10px] font-bold text-[#9a6b00]">
                  {task.badge}
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
