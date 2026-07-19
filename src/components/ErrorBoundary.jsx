import { Component } from "react";
import PageBackground from "@/components/layouts/PageBackground";
import ActionButton from "@/components/ui/ActionButton";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {

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
