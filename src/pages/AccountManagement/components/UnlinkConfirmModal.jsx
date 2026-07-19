// src/pages/AccountManagement/components/UnlinkConfirmModal.jsx
function UnlinkConfirmModal({ email, onConfirm, onCancel, confirming = false }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-8.75">
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 pt-8 text-center">
        <h2 className="text-b24 text-[18px] text-gray100 mx-10">
          {email}을 연동 해지하시겠습니까?
        </h2>
        <p className="mt-2.5 text-r14 text-gray60">
          연동 해지 시 해당 이메일과 연관된
          <br />
          모든 서비스 이용 기록이 삭제됩니다
        </p>
        <button
          onClick={onConfirm}
          disabled={confirming}
          className="mt-5 h-12 w-full rounded-[14px] bg-main100 text-sb16 text-[15px] text-white disabled:opacity-60"
        >
          {confirming ? "해지 중..." : "계속하기"}
        </button>
        <button
          onClick={onCancel}
          disabled={confirming}
          className="mt-5 h-12 w-full rounded-[14px] bg-white text-sb16 text-[15px] text-gray50 disabled:opacity-60"
        >
          취소
        </button>
      </div>
    </div>
  );
}

export default UnlinkConfirmModal;
