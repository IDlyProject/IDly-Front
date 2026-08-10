import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AccountReportCard from "./AccountReportCard";

const baseDetail = {
  status: "watch",
  riskBadgeLabel: "주의 필요",
  actionCount: 0,
  completedActionCount: 0,
  remainingActionCount: 0,
  evidenceCount: 1,
  analyzedAt: null,
};

describe("AccountReportCard", () => {
  it("does not mark a watch account as completed when it has no actions", () => {
    render(<AccountReportCard detail={baseDetail} />);

    expect(screen.getByText("확인이 필요한 계정이에요")).toBeInTheDocument();
    expect(screen.queryByText("모든 보안 조치를 완료했어요")).not.toBeInTheDocument();
  });

  it("shows completion only for a resolved account", () => {
    render(
      <AccountReportCard
        detail={{
          ...baseDetail,
          status: "resolved",
          actionCount: 2,
          completedActionCount: 2,
        }}
      />,
    );

    expect(screen.getByText("모든 보안 조치를 완료했어요")).toBeInTheDocument();
  });
});
