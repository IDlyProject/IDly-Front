// src/pages/SecurityAssistant/index.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";

function ArrowLeftIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#191f28"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  );
}

function BotMessage({ children }) {
  return (
    <div className="mb-3 flex items-start gap-2.5">
      <div className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-[#eef2ff] text-sm">
        🛡️
      </div>
      <div className="max-w-[75%] rounded-2xl rounded-tl-sm bg-white p-3 text-[13px] font-bold leading-relaxed text-[#191f28] shadow-sm">
        {children}
      </div>
    </div>
  );
}

function SecurityAssistant() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    // TODO: 실제 챗봇 API 연동 필요
    setInput("");
  };

  return (
    <PageBackground variant="default">
      <div className="flex min-h-dvh flex-col">
        <div className="flex items-center gap-3 px-4 pb-2 pt-[max(12px,env(safe-area-inset-top))]">
          <button onClick={() => navigate(-1)}>
            <ArrowLeftIcon />
          </button>
          <h1 className="text-base font-bold text-[#191f28]">
            보안 도우미에게 문의하기
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3">
          <BotMessage>
            IDly에서 분석한 계정에 대한 문의 안내라, 유출·해킹에 대한 질문이
            있다면 뭐든 물어보세요.
          </BotMessage>
          <BotMessage>
            바로 실행할 수 있는 대처 방법을 안내해드릴게요.
          </BotMessage>
        </div>

        <div className="flex items-center gap-2 border-t border-gray-100 bg-white px-3 py-3 pb-[calc(12px+env(safe-area-inset-bottom))]">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="메시지를 입력하세요"
            className="h-11 flex-1 rounded-full bg-[#f2f4f6] px-4 text-sm outline-none placeholder:text-gray-400"
          />
          <button
            onClick={handleSend}
            className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full bg-[#3b6cff]"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </PageBackground>
  );
}

export default SecurityAssistant;
