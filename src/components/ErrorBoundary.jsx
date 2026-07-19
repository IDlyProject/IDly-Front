// src/components/ErrorBoundary.jsx
import { Component } from "react";
import PageBackground from "@/components/layouts/PageBackground";
import ActionButton from "@/components/ui/ActionButton";

// 렌더링 중 예외가 나면 흰 화면 대신 폴백 UI를 보여준다.
// 클래스 컴포넌트만 getDerivedStateFromError/componentDidCatch를 지원하므로
// (아직 훅으로는 에러 바운더리를 만들 수 없음) 이 컴포넌트만 예외적으로 클래스로 작성.
class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // TODO: 실제 에러 모니터링 서비스(Sentry 등) 연동 시 여기서 전송
    console.error("Unhandled render error:", error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <PageBackground variant="frost">
        <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-8 text-center">
          <h1 className="text-b24 text-[18px] text-gray100">
            문제가 발생했어요
          </h1>
          <p className="text-r14 text-gray60">
            일시적인 오류로 화면을 표시할 수 없어요.
            <br />
            새로고침 후 다시 시도해주세요.
          </p>
          <ActionButton
            bgColor="var(--color-main100)"
            textColor="var(--color-white)"
            onClick={this.handleReload}
            className="max-w-50"
          >
            새로고침
          </ActionButton>
        </div>
      </PageBackground>
    );
  }
}

export default ErrorBoundary;
