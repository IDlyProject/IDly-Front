import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";

function Bomb() {
  throw new Error("boom");
}

// 렌더링 중 예외가 나도 앱 전체가 흰 화면이 되지 않고 폴백 UI가 뜨는지 검증한다.
describe("ErrorBoundary", () => {
  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <p>safe content</p>
      </ErrorBoundary>,
    );
    expect(screen.getByText("safe content")).toBeInTheDocument();
  });

  it("renders a fallback UI when a child throws during render", () => {
    // React가 콘솔에 에러를 추가로 남기므로 이 테스트에서만 조용히 무시한다.
    vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>,
    );

    expect(screen.getByText("문제가 발생했어요")).toBeInTheDocument();
  });
});
