/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import ActionButton from "@/components/ui/ActionButton";
import PageBackground from "@/components/layouts/PageBackground";
import { useInstallPromptContext } from "@/components/ui/InstallPromptProvider";
import { useToast } from "@/components/ui/ToastProvider";
import { isStandalone } from "@/hooks/useInstallPrompt";
import { subscribeToPush } from "@/lib/push";
import { getErrorMessage } from "@/lib/api";
import { WAITLIST_STORAGE_KEYS } from "@/constants/waitlist";
import logo from "@/assets/ic_logo.svg";
import BackIcon from "@/assets/ic_back_white_20.svg";
import ShareIcon from "@/assets/ic_share_24.svg";
import MoreIcon from "@/assets/ic_more.svg";
import PersonIcon from "@/assets/ic_person.svg";
import CallIcon from "@/assets/ic_call.svg";

export const INSTALL_PROMPT_VIEW = {
  MAIN: "main",
  IOS_NAG: "ios_nag",
  IOS_GUIDE: "ios_guide",
  IDENTIFY: "identify",
  NOTIFY_PROMPT: "notify_prompt",
};
const VIEW = INSTALL_PROMPT_VIEW;
const PHONE_PATTERN = /^01[016789]-?\d{3,4}-?\d{4}$/;

/**
 * 홈 화면에 이미 추가되어 있으면 "추가하러 가기"를 또 띄울 필요가 없고,
 * iOS는 standalone 상태가 아니면 Notification.requestPermission()이 아무
 * 반응도 하지 않으므로, 실제 설치/권한 상태를 보고 어느 화면부터 보여줄지
 * 정한다. 이미 설치돼 있고 권한도 있으면 null(더 볼 것 없음)을 반환한다.
 */
export function getInstallReminderView() {
  if (!isStandalone()) return VIEW.MAIN;
  const permission = window.Notification?.permission ?? "denied";
  return permission === "granted" ? null : VIEW.NOTIFY_PROMPT;
}

function ModalCard({ children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-8.75">
      <div className="flex w-full max-w-80 flex-col rounded-[20px] bg-white px-6 pt-6 pb-2 text-center shadow-xl">
        {children}
      </div>
    </div>
  );
}

function GuideScreen({ title, note, steps, closing, onBack }) {
  return (
    <div className="fixed inset-0 z-50">
      <PageBackground variant="default">
        <div className="flex min-h-dvh flex-col px-4 pb-8 pt-2.5">
          <button
            type="button"
            onClick={onBack}
            aria-label="뒤로가기"
            className="grid h-9 w-9 place-items-center rounded-full bg-main100"
          >
            <img src={BackIcon} alt="" className="h-5 w-5" />
          </button>

          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-2 text-center">
            <img src={logo} alt="IDly" className="h-20 w-auto" />
            <div className="flex flex-col gap-2">
              <h1 className="text-b24 text-gray100">{title}</h1>
              {note && (
                <p className="text-r14 text-[13px] text-danger50">{note}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              {steps.map((step, idx) => (
                <p key={idx} className="text-r16 text-[15px] text-gray80">
                  {step}
                </p>
              ))}
            </div>
            <p className="whitespace-pre-line text-r14 text-[13px] text-gray60">
              {closing}
            </p>
          </div>
        </div>
      </PageBackground>
    </div>
  );
}

/**
 * 등록 완료 직후(또는 재방문 시) 뜨는 홈 화면 추가 유도 플로우.
 *
 * iOS는 프로그래밍적으로 설치할 수 없고 웹 푸시도 홈 화면에 추가된
 * standalone 상태에서만 동작하므로, "나중에 하기"를 눌러도 한 번 더
 * 설치를 권유하는 nag 모달을 거친다. 안드로이드는 네이티브 설치
 * 다이얼로그를 띄운 뒤(수락/거절과 무관하게) 브라우저 상태에서도 바로
 * 요청 가능한 푸시 권한 동의 모달로 이어진다.
 */
function InstallPromptModal({
  onClose,
  initialView = VIEW.MAIN,
  name,
  phone,
  onIdentify,
}) {
  const { isIos, install } = useInstallPromptContext();
  const showToast = useToast();
  // iOS는 Safari와 홈 화면 앱의 저장 공간이 분리돼 있어, 사전등록 때 저장한
  // 이름·전화번호를 홈 화면 앱에서는 못 읽어오는 경우가 있다. 이 경우 알림을
  // 켜기 전에 한 번 더 입력받아야 서버가 대기자 건에 구독을 연결할 수 있다.
  const needsIdentify = !name || !phone;
  const [view, setView] = useState(
    initialView === VIEW.NOTIFY_PROMPT && needsIdentify
      ? VIEW.IDENTIFY
      : initialView,
  );
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [identifyName, setIdentifyName] = useState(name ?? "");
  const [identifyPhone, setIdentifyPhone] = useState(phone ?? "");

  const effectiveName = name || identifyName.trim();
  const effectivePhone = phone || identifyPhone.trim().replace(/-/g, "");
  const canConfirmIdentify =
    !!identifyName.trim() && PHONE_PATTERN.test(identifyPhone.trim());

  const confirmIdentify = () => {
    if (!canConfirmIdentify) return;
    const normalizedPhone = identifyPhone.trim().replace(/-/g, "");
    localStorage.setItem(WAITLIST_STORAGE_KEYS.NAME, identifyName.trim());
    localStorage.setItem(WAITLIST_STORAGE_KEYS.PHONE, normalizedPhone);
    // 이 번호가 서버에 어떤 상태로 등록돼 있는지는 부모(Splash)가 판단해서
    // 모달을 닫을 때의 목적지를 갱신한다. 여기서 결과를 기다릴 필요는 없다.
    onIdentify?.(normalizedPhone);
    setView(VIEW.NOTIFY_PROMPT);
  };

  const goAddToHomeScreen = async () => {
    if (isIos) {
      setView(VIEW.IOS_GUIDE);
      return;
    }
    await install();
    setView(VIEW.NOTIFY_PROMPT);
  };

  const goSkip = () => {
    if (isIos) {
      setView(VIEW.IOS_NAG);
      return;
    }
    setView(VIEW.NOTIFY_PROMPT);
  };

  const handleEnableNotifications = async () => {
    setIsSubscribing(true);
    try {
      const result = await subscribeToPush({
        name: effectiveName,
        phone: effectivePhone,
      });
      if (result === "subscribed") {
        showToast("알림이 설정됐어요!");
      } else if (result === "denied") {
        showToast(
          "알림 권한이 거부됐어요. 브라우저 설정에서 다시 허용할 수 있어요.",
        );
      } else if (result === "missing-info") {
        showToast("등록 정보를 확인할 수 없어요. 다시 시도해주세요.");
      }
      // "unsupported"(브라우저 미지원)·"unavailable"(서버 미설정)은 조용히 넘어간다.
    } catch (err) {
      showToast(getErrorMessage(err, "알림 설정에 실패했어요."));
    } finally {
      setIsSubscribing(false);
      onClose();
    }
  };

  if (view === VIEW.IDENTIFY) {
    return (
      <ModalCard>
        <h1 className="text-[18px] font-bold text-gray100">
          등록 정보를 다시 확인할게요
        </h1>
        <p className="mt-3 text-m14 text-[13px] text-gray70">
          사전등록 때 입력하신 이름과 전화번호를
          <br />
          입력해주시면 알림을 연결해드릴게요.
        </p>
        <div className="mt-4 space-y-2.5 text-left">
          <div className="flex h-12 items-center gap-2.5 rounded-xl border border-[#E5E7EB] bg-white px-3.75">
            <img src={PersonIcon} alt="" className="h-4.5 w-4.5" />
            <input
              value={identifyName}
              onChange={(e) => setIdentifyName(e.target.value)}
              placeholder="이름을 입력해주세요"
              className="h-full min-w-0 flex-1 text-r14 text-gray100 outline-none placeholder:text-[#8C8F96]"
            />
          </div>
          <div className="flex h-12 items-center gap-2.5 rounded-xl border border-[#E5E7EB] bg-white px-3.75">
            <img src={CallIcon} alt="" className="h-4.5 w-4.5" />
            <input
              value={identifyPhone}
              onChange={(e) => setIdentifyPhone(e.target.value)}
              placeholder="010-1234-5678"
              className="h-full min-w-0 flex-1 text-r14 text-gray100 outline-none placeholder:text-[#8C8F96]"
            />
          </div>
        </div>
        <ActionButton
          bgColor="var(--color-main100)"
          textColor="var(--color-white)"
          onClick={confirmIdentify}
          disabled={!canConfirmIdentify}
          className="mt-4 h-12! text-[15px]! font-bold!"
        >
          확인
        </ActionButton>
        <button
          type="button"
          onClick={onClose}
          className="mt-2.5 text-r14 text-[12px] text-gray40"
        >
          나중에 하기
        </button>
      </ModalCard>
    );
  }

  if (view === VIEW.IOS_GUIDE) {
    return (
      <GuideScreen
        title="IDly를 홈 화면에 설치해주세요!"
        note="* 꼭 Safari에서 진행해주세요!"
        steps={[
          <>
            ① 하단 공유 버튼 (
            <img
              src={ShareIcon}
              alt="공유"
              className="inline h-4 w-4 align-middle"
            />
            ) 누르기
          </>,
          <>
            ② 더보기 버튼 (
            <img
              src={MoreIcon}
              alt="더보기"
              className="inline h-4 w-4 align-middle"
            />
            ) 누르기
          </>,
          "③ 홈 화면에 추가 ( + ) 누르기",
        ]}
        closing={
          "추가한 뒤 홈 화면의 IDly 아이콘을 눌러\n알림을 켜고 기다려주세요!"
        }
        onBack={() => setView(VIEW.MAIN)}
      />
    );
  }

  if (view === VIEW.IOS_NAG) {
    return (
      <ModalCard>
        <h1 className="text-[18px] font-bold text-gray100">
          홈 화면에 추가하지 않으면
          <br />
          알림을 받을 수 없어요
        </h1>
        <p className="mt-3 text-m14 text-[13px] text-gray70">
          지금 홈 화면에 추가하시면
          <br />
          테스트 계정이 승인됐을 때 바로 알림을 받을 수 있어요!
        </p>
        <ActionButton
          bgColor="var(--color-main100)"
          textColor="var(--color-white)"
          onClick={() => setView(VIEW.IOS_GUIDE)}
          className="mt-4 h-12! text-[15px]! font-bold!"
        >
          지금 추가할게요
        </ActionButton>
        <button
          type="button"
          onClick={onClose}
          className="mt-2.5 text-r14 text-[12px] text-gray40"
        >
          그래도 웹으로 접속할게요
        </button>
      </ModalCard>
    );
  }

  if (view === VIEW.NOTIFY_PROMPT) {
    return (
      <ModalCard>
        <h1 className="text-[18px] font-bold text-gray100">
          알림을 받아보시겠어요?
        </h1>
        <p className="mt-3 text-m14 text-[13px] text-gray70">
          접근 권한이 부여되면 바로 알려드릴게요!
          <br />
          분석 이후에도 실시간 알림을 받아보실 수 있어요.
        </p>
        <ActionButton
          bgColor="var(--color-main100)"
          textColor="var(--color-white)"
          onClick={handleEnableNotifications}
          disabled={isSubscribing}
          className="mt-4 h-12! text-[15px]! font-bold!"
        >
          {isSubscribing ? "설정 중..." : "알림 받기"}
        </ActionButton>
        <button
          type="button"
          onClick={onClose}
          disabled={isSubscribing}
          className="mt-2.5 text-r14 text-[12px] text-gray40 disabled:opacity-40"
        >
          나중에 하기
        </button>
      </ModalCard>
    );
  }

  return (
    <ModalCard>
      <h1 className="text-[18px] font-bold text-gray100">
        등록해주셔서 감사드립니다!
      </h1>
      <p className="mt-3 text-m14 text-[13px] text-gray70">
        접근 권한은 1~2일 이내에 부여될 예정이며
        <br />
        이메일에 권한이 부여되면{" "}
        <span className="font-bold text-main100">푸시 알림</span>을 통해
        알려드립니다.
      </p>
      <p className="mt-3 text-m14 text-[13px] text-gray70">
        푸시 알림을 보내드리기 위해, 아래 버튼을 클릭해
        <br />홈 화면에 IDly를 추가해주세요!
      </p>
      <ActionButton
        bgColor="var(--color-main100)"
        textColor="var(--color-white)"
        onClick={goAddToHomeScreen}
        className="mt-4 h-12! text-[15px]! font-bold!"
      >
        홈 화면에 추가하러 가기
      </ActionButton>
      <button
        type="button"
        onClick={goSkip}
        className="mt-2.5 text-r14 text-[12px] text-gray40"
      >
        나중에 하기
      </button>
    </ModalCard>
  );
}

export default InstallPromptModal;
