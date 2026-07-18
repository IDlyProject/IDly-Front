// src/pages/SecurityAssistant/index.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import {
  OwlIcon,
  ChevronLeftIcon,
  SendIcon,
} from "@/pages/AccountAction/icons";

function SecurityAssistant() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    // TODO: 실제 챗봇 API 연동 필요
    setInput("");
  };

  return (
    <PageBackground variant="frost">
      <div className="flex min-h-dvh flex-col">
        <div className="flex items-center gap-3 px-4 pb-2 pt-[max(12px,env(safe-area-inset-top))]">
          <button
            onClick={() => navigate(-1)}
            className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
          >
            <img src={ChevronLeftIcon} alt="" className="h-5 w-5" />
          </button>
          <h1 className="text-base font-bold text-[#191f28]">
            보안 도우미에게 문의하기
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3">
          <div className="flex items-start gap-2.5">
            <img src={OwlIcon} alt="" className="h-10 w-10 flex-shrink-0" />
            <div className="max-w-[280px] rounded-[4px_18px_18px_18px] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,46,0.04)]">
              <p className="text-[13px] font-bold leading-relaxed text-[#191f28]">
                IDly에서 분석한 계정에 대한 문의 안내라, 유출·해킹에 대한 질문이
                있다면 뭐든 물어보세요!
              </p>
              <p className="mt-3 text-[13px] font-bold leading-relaxed text-[#191f28]">
                바로 실행할 수 있는 대처 방법을 안내해드릴게요
              </p>
            </div>
          </div>
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
            <img src={SendIcon} alt="" className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </PageBackground>
  );
}

export default SecurityAssistant;
