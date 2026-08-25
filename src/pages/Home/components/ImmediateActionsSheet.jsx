import ActionButton from "@/components/ui/ActionButton";
import ChevronRightIcon from "@/assets/ic_chevron_right.svg";

const SEVERITY_DOT = {
  high: "bg-[#EF5350]",
  medium: "bg-[#FABF2E]",
};

function ImmediateActionsSheet({ actions, onClose, onSelectAction, onStart }) {
  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-[#000000]/[33.3%]"
        onClick={onClose}
      />
      <div className="fixed inset-x-0 bottom-0 z-50 flex h-130 flex-col rounded-t-3xl bg-white px-5 pt-3">
        <div className="mx-auto mb-4.5 h-1 w-10 shrink-0 rounded-full bg-[#D9DBE0]" />
        <h2 className="mb-5 shrink-0 text-sb20 font-bold text-[#171C26]">
          즉시 할일 {actions.length}개
        </h2>
        <div className="flex-1 space-y-2.5 overflow-y-auto">
          {actions.map((action) => (
            <button
              key={action.id}
              type="button"
              onClick={() => onSelectAction(action.serviceAccountId)}
              className="flex w-full items-center gap-3 rounded-2xl bg-[#F7F7FA] px-4 py-3.5 text-left"
            >
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${SEVERITY_DOT[action.severity]}`}
              />
              <div className="flex-1">
                <b className="block text-sb16 text-[14px] text-gray100">
                  {action.title}
                </b>
                {action.description && (
                  <small className="mt-0.5 block text-r14 text-[12px] text-gray50">
                    {action.description}
                  </small>
                )}
              </div>
              <img src={ChevronRightIcon} alt="" className="h-4 w-4" />
            </button>
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
