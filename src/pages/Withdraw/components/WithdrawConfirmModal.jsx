// src/pages/Withdraw/components/WithdrawConfirmModal.jsx
function WithdrawConfirmModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl">
        <h2 className="text-base font-bold text-[#191f28]">
          탈퇴하시겠습니까?
        </h2>
        <p className="mt-2 text-[13px] font-bold leading-relaxed text-[#9aa4b2]">
          회원 탈퇴시 모든 서비스 이용 기록이 삭제됩니다
        </p>
        <button
          onClick={onConfirm}
          className="mt-5 h-12 w-full rounded-xl bg-[#12206b] text-sm font-bold text-white"
        >
          계속하기
        </button>
        <button
          onClick={onCancel}
          className="mt-2 w-full py-2 text-[13px] font-bold text-[#9aa4b2]"
        >
          취소
        </button>
      </div>
    </div>
  );
}

export default WithdrawConfirmModal;
