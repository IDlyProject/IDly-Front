// src/pages/Home/components/EmailSelector.jsx
import { useState } from "react";

function EmailSelector({ emails, selectedId, onSelect }) {
  const [open, setOpen] = useState(false);

  if (emails.length <= 2) return null;

  const selected = emails.find((e) => e.id === selectedId) ?? emails[0];
  const label =
    selected.id === "all"
      ? `전체 · ${selected.count}개`
      : `${selected.label} · ${selected.count}개`;

  return (
    <div className="relative mb-2.5">
      {/* 열려있을 때만 파란색 강조, 닫혀있으면 항상 흰 배경 */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex h-9 w-full items-center gap-2 rounded-2xl border px-3.5 text-xs font-bold shadow-sm ${
          open
            ? "border-[#3b6cff] bg-[#eef2ff] text-[#3b6cff]"
            : "border-gray-200 bg-white text-[#191f28]"
        }`}
      >
        <span
          className="grid h-[22px] w-[22px] flex-shrink-0 place-items-center rounded-lg text-[10px] font-bold text-white"
          style={{
            background: selected.id === "all" ? "#8c9aaa" : selected.avatarBg,
          }}
        >
          {selected.id === "all" ? "A" : selected.avatarLabel}
        </span>
        <span className="flex-1 text-left">{label}</span>
        <span className={open ? "text-[#3b6cff]" : "text-gray-400"}>
          {open ? "▴" : "▾"}
        </span>
      </button>

      {open && (
        <div className="absolute z-20 mt-1 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
          {emails.map((email) => (
            <button
              key={email.id}
              onClick={() => {
                onSelect(email.id);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2.5 border-b border-gray-50 px-3.5 py-2.5 text-left last:border-b-0 ${
                selectedId === email.id ? "bg-[#eef2ff]" : ""
              }`}
            >
              <span
                className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl text-xs font-bold text-white"
                style={{
                  background: email.id === "all" ? "#6b7684" : email.avatarBg,
                }}
              >
                {email.id === "all" ? "A" : email.avatarLabel}
              </span>
              <div className="flex-1">
                <span className="block text-xs font-bold text-[#191f28]">
                  {email.id === "all" ? "전체 계정 보기" : email.label}
                </span>
                <small className="mt-0.5 block text-[10px] font-bold text-[#6b7684]">
                  {email.id === "all"
                    ? `총 ${email.count}개`
                    : `${email.groupLabel} · ${email.count}개 계정`}
                </small>
              </div>
              {selectedId === email.id && (
                <span className="text-sm text-[#3b6cff]">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default EmailSelector;
