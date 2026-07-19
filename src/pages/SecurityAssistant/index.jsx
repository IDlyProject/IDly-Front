// src/pages/SecurityAssistant/index.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import ChatHeader from "@/pages/AccountAction/components/ChatHeader";
import ChatInputBar from "@/pages/AccountAction/components/ChatInputBar";
import OwlAvatar from "@/pages/AccountAction/components/OwlAvatar";
import UserBubble from "@/pages/AccountAction/components/UserBubble";

function SecurityAssistant() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    if (!input.trim()) return;
    // TODO: 실제 챗봇 API 연동 필요
    setMessages((prev) => [...prev, { id: prev.length, text: input }]);
    setInput("");
  };

  return (
    <PageBackground variant="frost">
      <div className="flex min-h-dvh flex-col">
        <div className="pt-[max(12px,env(safe-area-inset-top))]">
          <ChatHeader
            title="보안 도우미에게 문의하기"
            onBack={() => navigate(-1)}
          />
        </div>

        <div className="flex-1 space-y-2.5 overflow-y-auto px-4 py-3">
          <div className="flex items-start gap-2.5">
            <OwlAvatar />
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

          {messages.map((message) => (
            <UserBubble key={message.id} text={message.text} />
          ))}
        </div>

        <ChatInputBar value={input} onChange={setInput} onSend={handleSend} />
      </div>
    </PageBackground>
  );
}

export default SecurityAssistant;
