import { useState } from "react";
import GridIcon from "@/assets/ic_grid.svg";
import ChevronBottomIcon from "@/assets/ic_chevron_bottom_mini.svg";
import PlusIcon from "@/assets/ic_plus_gray.svg";
import CheckIcon from "@/assets/ic_check.svg";

function EmailSelector({ emails, selectedId, onSelect, onAddAccount }) {
  const [open, setOpen] = useState(false);

  if (emails.length === 0) return null;

  const selected = emails.find((e) => e.id === selectedId) ?? emails[0];
  const primaryLabel = selected.id === "all" ? "전체 계정" : selected.label;
  const totalAll = emails.find((e) => e.id === "all")?.count ?? 0;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 px-3 py-1.5 bg-white rounded-[20px] shadow-[0_1px_3px_rgba(16,24,46,0.03)]"
      >
        <span className="text-sb16 text-[12px] text-gray60">
          {primaryLabel}
        </span>
        <img src={ChevronBottomIcon} />
      </button>

      {open && (
        <div className="absolute right-0 z-20 w-89.5 min-w-60 mt-3 overflow-hidden rounded-[18px] bg-white p-2 shadow-[0_12px_40px_rgba(0,0,0,0.125)]">
          {}
          <button
            onClick={() => {
              onSelect("all");
              setOpen(false);
            }}
            className={`flex w-full items-center gap-3.25 rounded-xl px-4 py-3 text-left ${
              selectedId === "all" ? "bg-[#F0F6FF]" : ""
            }`}
          >
            <span
              className="grid h-8.25 w-8.25 shrink-0 place-items-center rounded-full"
              style={{ background: "linear-gradient(135deg,#9caafb,#696df2)" }}
            >
              <img src={GridIcon} clasName="h-4.5 w-4.5" />
            </span>
            <div className="flex-1">
              <span className="block text-sb16 text-[14px] text-gray100">
                전체 계정
              </span>
              <small className="mt-0.5 block text-r14 text-[11px] text-gray50">
                모든 이메일 · {totalAll}개 계정
              </small>
            </div>
            {selectedId === "all" && (
              <img src={CheckIcon} className="h-4.5 w-4.5" />
            )}
          </button>

          <div className="mx-3.5 my-0.5 h-px bg-[#F0F1F4]" />

          {}
          {emails
            .filter((e) => e.id !== "all")
            .map((email, idx, arr) => (
              <div key={email.id}>
                <button
                  onClick={() => {
                    onSelect(email.id);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-3.25 rounded-xl px-4 py-3 text-left ${
                    selectedId === email.id ? "bg-[#F0F6FF]" : ""
                  }`}
                >
                  <span
                    className="grid h-8.25 w-8.25 shrink-0 place-items-center rounded-full"
                    style={{ background: email.avatarBg }}
                  >
                    <span className="text-[14px] font-bold text-white">
                      {email.avatarLabel}
                    </span>
                  </span>
                  <div className="flex-1">
                    <span className="block text-sb16 text-[14px] text-gray100">
                      {email.label}
                    </span>
                    <small className="mt-0.5 block text-r14 text-[11px] text-gray50">
                      {email.count}개 계정
                    </small>
                  </div>
                  {selectedId === email.id && (
                    <img src={CheckIcon} className="h-4.5 w-4.5" />
                  )}
                </button>
                {idx < arr.length - 1 && (
                  <div className="mx-3.5 my-0.5 h-px bg-[#F0F1F4]" />
                )}
              </div>
            ))}

          <div className="mx-3.5 my-0.5 h-px bg-[#F0F1F4]" />

          <button
            onClick={() => {
              onAddAccount?.();
              setOpen(false);
            }}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-[0.76px] border-[#E5E7EB]">
              <img src={PlusIcon} className="h-4.5 w-4.5" />
            </span>
            <span className="text-m14 text-gray60">계정 추가하기</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default EmailSelector;
