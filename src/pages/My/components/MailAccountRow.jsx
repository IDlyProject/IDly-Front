// src/pages/My/components/MailAccountRow.jsx
function MailAccountRow({ account }) {
  return (
    <div className="grid grid-cols-[50px_1fr_auto] items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm">
      <div
        className="grid h-[50px] w-[50px] place-items-center rounded-2xl text-base font-bold text-white"
        style={{ background: account.avatarBg }}
      >
        {account.avatarLabel}
      </div>
      <div>
        <strong className="block text-[13px] text-[#191f28]">
          {account.email}
        </strong>
        <small className="mt-0.5 block text-[11px] font-bold text-[#6b7684]">
          연결된 계정 {account.linkedCount}개
        </small>
      </div>
      <span className="rounded-full bg-[#eef2ff] px-2.5 py-1 text-[11px] font-bold text-[#3b6cff]">
        {account.isPrimary ? "대표" : "연결됨"}
      </span>
    </div>
  );
}

export default MailAccountRow;
