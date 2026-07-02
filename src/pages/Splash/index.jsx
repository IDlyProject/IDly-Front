// src/pages/Splash/index.jsx
import { Navigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

function Splash() {
  // TODO: Firebase 연동 후 실제 로그인 상태 체크로 교체
  return <Navigate to={ROUTES.ONBOARDING_LOGIN} replace />;
}

export default Splash;
