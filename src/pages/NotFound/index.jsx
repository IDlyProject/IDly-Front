import { useNavigate } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import ActionButton from "@/components/ui/ActionButton";
import { ROUTES } from "@/constants/routes";

function NotFound() {
  const navigate = useNavigate();

  return (
    <PageBackground variant="frost">
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-8 text-center">
        <h1 className="text-b24 text-[18px] text-gray100">
          페이지를 찾을 수 없어요
        </h1>
        <p className="text-r14 text-gray60">
          요청하신 페이지가 존재하지 않거나
          <br />
          주소가 변경되었어요.
        </p>
        <ActionButton
          bgColor="var(--color-main100)"
          textColor="var(--color-white)"
          onClick={() => navigate(ROUTES.HOME, { replace: true })}
          className="max-w-50"
        >
          홈으로 가기
        </ActionButton>
      </div>
    </PageBackground>
  );
}

export default NotFound;
