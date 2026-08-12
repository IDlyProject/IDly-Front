import ActionButton from "@/components/ui/ActionButton";
import ChevronRightIcon from "@/assets/ic_chevron_right.svg";

// TODO: 실제 조치 목록 API가 생기면 mock 대신 서버 데이터로 교체
const MOCK_ACTIONS = [
  {
    id: "disney",
    severity: "high",
    title: "Disney+ 비밀번호 즉시 변경",
    description: "유출된 비밀번호로 계정이 위험합니다",
  },
  {
    id: "apple",
    severity: "medium",
    title: "Apple 비밀번호 갱신 권장",
    description: "6개월 이상 같은 비밀번호 사용 중",
  },
  {
    id: "netflix",
    severity: "medium",
    title: "Netflix 기기 정리",
    description: "사용하지 않는 기기의 로그인을 해제하세요",
  },
];

const SEVERITY_DOT = {
  high: "bg-[#EF5350]",
  medium: "bg-[#FABF2E]",
};

function ImmediateActionsSheet({ onClose, onStart }) {
  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-[#000000]/[33.3%]"
        onClick={onClose}
      />
      <div className="fixed inset-x-0 bottom-0 z-50 flex h-130 flex-col rounded-t-3xl bg-white px-5 pt-3">
        <div className="mx-auto mb-4.5 h-1 w-10 shrink-0 rounded-full bg-[#D9DBE0]" />
        <h2 className="mb-5 shrink-0 text-sb20 font-bold text-[#171C26]">
          즉시 할일 {MOCK_ACTIONS.length}개
        </h2>
        <div className="flex-1 space-y-2.5 overflow-y-auto">
          {MOCK_ACTIONS.map((action) => (
            <div
              key={action.id}
              className="flex items-center gap-3 rounded-2xl bg-[#F7F7FA] px-4 py-3.5"
            >
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${SEVERITY_DOT[action.severity]}`}
              />
              <div className="flex-1">
                <b className="block text-sb16 text-[14px] text-gray100">
                  {action.title}
                </b>
                <small className="mt-0.5 block text-r14 text-[12px] text-gray50">
                  {action.description}
                </small>
              </div>
              <img src={ChevronRightIcon} alt="" className="h-4 w-4" />
            </div>
          ))}
        </div>
        <div className="shrink-0 pt-4 pb-[calc(16px+env(safe-area-inset-bottom))]">
          <ActionButton
            bgColor="var(--color-main100)"
            textColor="var(--color-white)"
            onClick={onStart}
          >
            가장 위험한 것부터 시작하기
          </ActionButton>
        </div>
      </div>
    </>
  );
}

export default ImmediateActionsSheet;
