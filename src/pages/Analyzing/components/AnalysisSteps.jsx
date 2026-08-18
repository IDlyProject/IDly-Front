import CheckIcon from "@/assets/ic_check.svg";

const STEPS = [
  { key: "fetching_mails", label: "메일함에서 메일을 가져오고 있어요" },
  { key: "finding_security", label: "보안 관련 메일을 찾고 있어요" },
  { key: "grouping_accounts", label: "계정별로 묶고 있어요" },
  { key: "assessing_risks", label: "위험도를 분석하고 있어요" },
  { key: "preparing_actions", label: "조치 가이드를 준비하고 있어요" },
];

function getStepStatus(stepKey, currentStep) {
  if (currentStep === "waiting") return "pending";
  if (currentStep === "completed") return "done";

  const stepIndex = STEPS.findIndex((step) => step.key === stepKey);
  const currentIndex = STEPS.findIndex((step) => step.key === currentStep);
  if (currentIndex === -1) return "pending";
  if (stepIndex < currentIndex) return "done";
  if (stepIndex === currentIndex) return "active";
  return "pending";
}

function AnalysisSteps({ currentStep, displayMessage }) {
  return (
    <ul className="mt-6.5 w-full space-y-3 text-left">
      {STEPS.map((step) => {
        const stepStatus = getStepStatus(step.key, currentStep);
        return (
          <li key={step.key} className="flex items-center gap-2.5">
            <span
              className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                stepStatus === "done"
                  ? "bg-[#E8EEFF]"
                  : stepStatus === "active"
                    ? "border-2 border-main100 border-t-transparent animate-spin"
                    : "border-2 border-gray20"
              }`}
            >
              {stepStatus === "done" && (
                <img src={CheckIcon} alt="" className="h-2.5 w-2.5" />
              )}
            </span>
            <span
              className={`text-r14 text-[13px] ${
                stepStatus === "active"
                  ? "font-bold text-gray100"
                  : stepStatus === "done"
                    ? "text-gray60"
                    : "text-gray40"
              }`}
            >
              {stepStatus === "active" ? displayMessage : step.label}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export default AnalysisSteps;
