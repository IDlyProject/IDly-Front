// src/components/ui/LoadingScreen.jsx
import PageBackground from "@/components/layouts/PageBackground";

// 여러 페이지가 반복하던 "전체 화면 로딩" 마크업을 통일. 각 페이지의 로딩/에러
// 분기 조건(재요청 중엔 기존 데이터 유지, 실패 시 리다이렉트 등)은 페이지마다
// 다르므로 그 로직은 그대로 두고, 마크업만 공용화한다.
function LoadingScreen({ variant = "frost", text = "불러오는 중..." }) {
  return (
    <PageBackground variant={variant}>
      <div className="flex min-h-dvh items-center justify-center">
        <p className="text-sm font-bold text-[#6b7684]">{text}</p>
      </div>
    </PageBackground>
  );
}

export default LoadingScreen;
