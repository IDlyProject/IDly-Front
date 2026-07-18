// src/pages/Home/components/AccountQuickMenu.jsx
import EyeOffIcon from "@/assets/ic_eye_off.svg";
import ShortcutIcon from "@/assets/ic_shortcut.svg";
import useMenuPosition from "../hooks/useMenuPosition";

function AccountQuickMenu({ anchorRef, onHide, onOrganize, onClose }) {
  const { menuRef, style } = useMenuPosition(anchorRef, true);
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div
        ref={menuRef}
        style={style}
        className="z-50 w-70 overflow-hidden rounded-2xl bg-white px-5 py-4.5 shadow-[0_8px_32px_rgba(0,0,0,0.145)]"
      >
        <button
          onClick={onHide}
          className="flex w-full items-center gap-3 border-b border-[#F0F1F4] pb-3 text-left"
        >
          <img src={EyeOffIcon} alt="" className="h-5 w-5" />
          <div>
            <b className="block text-sb16 text-[15px] text-gray100">
              숨기기 (휴면 계정)
            </b>
            <small className="mt-0.5 block text-r14 text-[11px] text-gray50">
              홈 화면에서 숨기고 휴면 계정으로 이동
            </small>
          </div>
        </button>
        <button
          onClick={onOrganize}
          className="flex w-full items-center gap-3 pt-3 text-left"
        >
          <img src={ShortcutIcon} alt="" className="h-5 w-5" />
          <div>
            <b className="block text-sb16 text-[15px] text-gray100">
              휴면 계정 빠르게 정리하기
            </b>
            <small className="mt-0.5 block text-r14 text-[11px] text-gray50">
              사용하지 않는 계정을 한번에 관리하는 방법
            </small>
          </div>
        </button>
      </div>
    </>
  );
}

export default AccountQuickMenu;
