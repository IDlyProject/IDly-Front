import { useNavigate } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import BellOffIcon from "@/assets/ic_bell_off_gray.svg";
import BackIcon from "@/assets/ic_back.svg";


const MOCK_NOTIFICATIONS = [];

function EmptyState() {
  return (
    <div className="flex flex-1 flex-col gap-4 items-center justify-center text-center">
      <div className="grid h-20 w-20 place-items-center rounded-full bg-white shadow-[0_4px_16px_rgba(16,24,46,0.04)]">
        <img src={BellOffIcon} className="h-9 w-9" />
      </div>
      <h2 className="text-b24 text-[17px] text-gray100">알림이 없습니다</h2>
      <p className="mx-auto max-w-57.5 text-r14 text-gray50">
        계정 보안 알림이나 구독 관련 소식이
        <br />
        이곳에 표시됩니다.
      </p>
    </div>
  );
}

function NotificationCenter() {
  const navigate = useNavigate();
  const notifications = MOCK_NOTIFICATIONS;

  return (
    <PageBackground variant="frost">
      <div className="flex min-h-dvh flex-col px-5">
        <div className="my-2 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            aria-label="뒤로가기"
            className="grid w-9 h-9 place-items-center rounded-full bg-white "
          >
            <img src={BackIcon} alt="" className="h-5 w-5" />
          </button>
          <h1 className="text-b24 text-[18px] text-gray100">알림</h1>
        </div>

        {notifications.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex-1 space-y-2.5">
            {}
          </div>
        )}
      </div>
    </PageBackground>
  );
}

export default NotificationCenter;
