import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";

const REQUIRED_ITEMS = [
  { id: "terms", label: "서비스 이용 약관 동의 (필수)", hasDetail: true },
  { id: "privacy", label: "개인정보 처리방침 동의 (필수)", hasDetail: true },
  {
    id: "gmailReadonly",
    label: "Gmail 읽기 전용 연결 동의 (필수)",
    desc: "메일 발송·삭제 권한은 요청하지 않아요.",
    hasDetail: true,
  },
  {
    id: "notification",
    label: "알림 설정 (필수)",
    desc: "실시간 보안 알림을 받아야 조치할 수 있어요.",
    hasDetail: false,
  },
];

// 체크박스 하나를 표현하는 컴포넌트
function Checkbox({ checked }) {
  return (
    <span
      className={`grid h-5 w-5 flex-shrink-0 place-items-center rounded-md border transition-colors ${
        checked
          ? "border-[#3b6cff] bg-[#3b6cff]"
          : "border-gray-300 bg-[#f8fafc]"
      }`}
    >
      {checked && (
        <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
          <path
            d="M1 5L4.5 8.5L11 1.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );
}

function Consent() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState({});

  const allChecked = REQUIRED_ITEMS.every((item) => checked[item.id]);

  const toggleAll = () => {
    const next = {};
    REQUIRED_ITEMS.forEach((item) => (next[item.id] = !allChecked));
    setChecked(next);
  };

  const toggleOne = (id) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleViewDetail = (id) => {
    // TODO: 약관 상세 모달/페이지 오픈
    console.log(`${id} 상세 보기`);
  };

  return (
    <div className="flex min-h-dvh flex-col bg-[#f2f4f6] px-6 pt-10 pb-8">
      <h1 className="text-[26px] font-bold leading-snug text-[#191f28]">
        안녕하세요,
        <br />
        계정을 지키는
        <br />
        IDly입니다!
      </h1>

      <div className="mt-8 flex-1 space-y-3">
        {/* 전체 동의하기 */}
        <button
          onClick={toggleAll}
          className="flex w-full items-center gap-3 rounded-2xl bg-white p-4 text-left shadow-sm active:bg-gray-50"
        >
          <Checkbox checked={allChecked} />
          <b className="text-[15px] text-[#191f28]">전체 동의하기</b>
        </button>

        {/* 개별 항목 */}
        {REQUIRED_ITEMS.map((item) => (
          <div
            key={item.id}
            className="flex w-full items-center gap-3 rounded-2xl bg-white p-4 shadow-sm"
          >
            {/* 체크박스만 클릭 → 체크 토글 */}
            <button
              onClick={() => toggleOne(item.id)}
              className="flex flex-shrink-0 items-center"
              aria-label={`${item.label} 동의`}
            >
              <Checkbox checked={!!checked[item.id]} />
            </button>

            {/* 텍스트도 클릭 → 체크 토글 (터치 영역 넓힘) */}
            <button
              onClick={() => toggleOne(item.id)}
              className="flex-1 text-left"
            >
              <b className="block text-[14px] text-[#191f28]">{item.label}</b>
              {item.desc && (
                <small className="mt-1 block text-[11px] text-gray-400">
                  {item.desc}
                </small>
              )}
            </button>

            {/* 상세보기는 별도 버튼 → 약관 상세로 이동 */}
            {item.hasDetail && (
              <button
                onClick={() => handleViewDetail(item.id)}
                className="flex-shrink-0 px-1 text-gray-300"
                aria-label="상세 보기"
              >
                ›
              </button>
            )}
          </div>
        ))}
      </div>

      <Button
        variant="primary"
        disabled={!allChecked}
        className={!allChecked ? "opacity-40" : ""}
        onClick={() => navigate(ROUTES.ONBOARDING_ACCOUNT_CONFIRM)}
      >
        다음
      </Button>
    </div>
  );
}

export default Consent;
