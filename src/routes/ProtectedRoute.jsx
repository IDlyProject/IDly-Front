import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { useUserStore } from "@/store/userStore";

function ProtectedRoute({ children }) {
  const location = useLocation();
  const status = useUserStore((state) => state.status);
  const user = useUserStore((state) => state.user);
  const fetchUser = useUserStore((state) => state.fetchUser);
  const clearUser = useUserStore((state) => state.clearUser);

  useEffect(() => {
    if (status === "idle") fetchUser();
  }, [status, fetchUser]);

  // 인증 확인 중
  if (status === "idle" || status === "loading") return null;

  // 네트워크/서버 에러 — 로그인 화면으로 튕기지 않고 재시도 유도
  if (status === "error" && !user) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100dvh",
          gap: 16,
          fontFamily: "inherit",
        }}
      >
        <p style={{ margin: 0, fontSize: 14, color: "#666" }}>
          서버에 연결할 수 없습니다.
        </p>
        <button
          onClick={clearUser}
          style={{
            padding: "8px 20px",
            borderRadius: 8,
            border: "1px solid #ddd",
            background: "#fff",
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          다시 시도
        </button>
      </div>
    );
  }

  // 미인증
  if (!user) {
    return (
      <Navigate to={ROUTES.ONBOARDING_LOGIN} state={{ from: location }} replace />
    );
  }

  return children;
}

export default ProtectedRoute;
