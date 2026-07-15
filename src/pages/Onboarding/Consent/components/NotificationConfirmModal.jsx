import BellOffIcon from "@/assets/ic_bell_off.svg";
import InfoIcon from "@/assets/ic_info.svg";

function NotificationConfirmModal({ onAgree, onDismiss }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000]/50 px-8.75">
      <div className="w-full max-w-sm rounded-3xl bg-white px-6 pt-8 pb-6 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-4xl bg-[#FFF8E1]">
          <img src={BellOffIcon} className="h-7 w-7" />
        </div>
        <div className="my-5">
          <h2 className="text-sb18 font-bold text-gray100">
            알림을 받을 수 없어요
          </h2>
          <p className="mt-2.5 text-r14 text-gray60">
            보안 알림 수신에 동의하지 않으면
            <br />
            실시간 알림을 받을 수 없어요.
            <br />
            그래도 괜찮으신가요?
          </p>
        </div>
        <div className="mb-6 flex items-start gap-2 rounded-xl bg-[#F0F6FF] px-[13px] py-3 text-left">
          <img src={InfoIcon} className="mt-0.75 h-3.5 w-3.5" />
          <p className="text-r14 text-[12px] text-gray60">
            설정에서 수신 여부와 범위는 언제든지 변경하실 수 있어요.
          </p>
        </div>

        <button
          onClick={onAgree}
          className="h-12 w-full rounded-[14px] bg-main100 text-center text-sb16 text-[15px] text-white"
        >
          동의하고 계속하기
        </button>
        <button
          onClick={onDismiss}
          className="mt-2 h-12 w-full text-center text-m14 text-gray50"
        >
          동의하지 않고 계속하기
        </button>
      </div>
    </div>
  );
}

export default NotificationConfirmModal;
