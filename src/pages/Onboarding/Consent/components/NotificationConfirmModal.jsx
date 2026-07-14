// src/pages/Onboarding/Consent/components/NotificationConfirmModal.jsx
function BellOffIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#c9a227"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 17a3 3 0 0 0 6 0" />
      <path d="M18 8a6 6 0 0 0-9.33-5" />
      <path d="M6.26 6.26A6 6 0 0 0 6 8c0 4-2 5-2 5h9" />
      <path d="M18 8c0 4 2 5 2 5H14" />
      <line x1="3" y1="3" x2="21" y2="21" />
    </svg>
  );
}

function NotificationConfirmModal({ onAgree, onDismiss }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl">
        <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-[#fff7df]">
          <BellOffIcon />
        </div>

        <h2 className="text-lg font-bold text-[#191f28]">
          알림을 받을 수 없어요
        </h2>
        <p className="mt-2 text-[13px] font-bold leading-relaxed text-[#6b7684]">
          보안 알림 수신에 동의하지 않으면
          <br />
          실시간 알림을 받을 수 없어요.
          <br />
          그래도 괜찮으신가요?
        </p>

        <div className="mt-4 flex items-start gap-2 rounded-xl bg-[#f6f8fb] p-3 text-left">
          <span className="mt-0.5 text-[#9aa4b2]">ⓘ</span>
          <p className="text-[11px] font-bold leading-relaxed text-[#8b95a1]">
            설정에서 수신 여부와 범위는 언제든지 변경하실 수 있어요.
          </p>
        </div>

        <button
          onClick={onAgree}
          className="mt-5 h-12 w-full rounded-2xl bg-[#12206b] text-sm font-bold text-white"
        >
          동의하고 계속하기
        </button>
        <button
          onClick={onDismiss}
          className="mt-3 w-full text-center text-xs font-bold text-[#9aa4b2]"
        >
          동의하지 않고 계속하기
        </button>
      </div>
    </div>
  );
}

export default NotificationConfirmModal;
