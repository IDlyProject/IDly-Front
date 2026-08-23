import logo from "@/assets/ic_logo.svg";
import { useInstallPrompt } from "@/hooks/useInstallPrompt";

/**
 * 홈 화면 추가 안내.
 *
 * 사전등록 완료 직후처럼 사용자가 서비스에 기대를 갖는 순간에 띄운다.
 * 첫 진입에 띄우면 거절당하기 쉽고, 안드로이드는 한 번 거절되면 한동안
 * 다시 띄울 수 없다.
 */
function InstallPromptSheet() {
  const { visible, isIos, install, dismissForToday } = useInstallPrompt();

  if (!visible) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/[33%]" onClick={dismissForToday} />
      <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-[calc(16px+env(safe-area-inset-bottom))]">
        <div className="mx-auto w-full max-w-sm rounded-3xl bg-white px-5 py-5 shadow-xl">
          <div className="flex items-start gap-3.5">
            <img src={logo} alt="" className="mt-0.5 h-11 w-11 shrink-0" />
            <div className="min-w-0">
              <p className="text-sb16 text-gray100">홈 화면에 추가하시겠어요?</p>
              <p className="mt-1 text-[13px] leading-relaxed text-gray60">
                앱처럼 바로 접속할 수 있어요.
                <br />
                테스트 계정이 등록되면 알림으로 알려드릴게요.
              </p>
            </div>
          </div>

          {isIos ? (
            <p className="mt-4 rounded-xl bg-[#F2F4F6] px-4 py-3 text-[13px] leading-relaxed text-gray60">
              사파리 하단의 <span className="font-semibold text-gray100">공유 버튼</span>을 누른 뒤
              <br />
              <span className="font-semibold text-gray100">홈 화면에 추가</span>를 선택해주세요.
            </p>
          ) : (
            <button
              type="button"
              onClick={install}
              className="mt-4 h-12 w-full rounded-2xl bg-main100 text-sb16 text-white transition-opacity active:opacity-80"
            >
              추가하기
            </button>
          )}

          <button
            type="button"
            onClick={dismissForToday}
            className="mt-2 h-10 w-full text-[13px] font-medium text-gray60"
          >
            오늘 하루 그만 보기
          </button>
        </div>
      </div>
    </>
  );
}

export default InstallPromptSheet;
