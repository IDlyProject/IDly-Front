// src/pages/AccountAction/index.jsx
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import { ROUTES } from "@/constants/routes";
import { getDetailByAccountId } from "@/pages/AccountDetail/mockDetailData";
import useChatFlow from "./hooks/useChatFlow";
import ChatHeader from "./components/ChatHeader";
import ChatMessage from "./components/ChatMessage";
import ChatInputBar from "./components/ChatInputBar";

function AccountAction() {
  const { accountId } = useParams();
  const navigate = useNavigate();
  const detail = getDetailByAccountId(accountId);

  const {
    messages,
    doneIds,
    inputEnabled,
    selectAction,
    confirmDone,
    confirmFail,
    sendMessage,
    totalActions,
    doneCount,
  } = useChatFlow(detail ?? { actions: [], chatBadge: "", chatIntro: "" });

  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  if (!detail) {
    navigate(ROUTES.HOME, { replace: true });
    return null;
  }

  const handleSend = () => {
    sendMessage(inputValue);
    setInputValue("");
  };

  return (
    <PageBackground variant="frost">
      <div className="flex min-h-dvh flex-col">
        <div className="pt-[max(8px,env(safe-area-inset-top))]">
          <ChatHeader
            title="지금 바로 조치하기"
            doneCount={doneCount}
            totalActions={totalActions}
            onBack={() => navigate(-1)}
          />
        </div>

        <div
          ref={scrollRef}
          className="flex-1 space-y-2.5 overflow-y-auto px-5 py-4"
        >
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              doneIds={doneIds}
              onSelectAction={selectAction}
              onDone={confirmDone}
              onFail={confirmFail}
              serviceName={detail.name}
              onHome={() => navigate(ROUTES.HOME)}
              onNextAccount={() => navigate(ROUTES.HOME)}
              onReport={() => navigate(ROUTES.SECURITY_REPORT)}
            />
          ))}
        </div>

        <ChatInputBar
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSend}
          disabled={!inputEnabled}
        />
      </div>
    </PageBackground>
  );
}

export default AccountAction;
