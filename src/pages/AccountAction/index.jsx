import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { ROUTES } from "@/constants/routes";
import FeedbackButton from "@/components/ui/FeedbackButton";
import useActionSession from "./hooks/useActionSession";
import ChatHeader from "./components/ChatHeader";
import ChatMessage from "./components/ChatMessage";
import ChatInputBar from "./components/ChatInputBar";
import TypingIndicator from "./components/TypingIndicator";

function AccountAction() {
  const { accountId } = useParams();
  const navigate = useNavigate();
  const {
    session,
    messages,
    status,
    sending,
    sendError,
    selectAction,
    confirmDone,
    confirmFail,
    sendFailureReason,
  } = useActionSession(accountId);

  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, sending]);

  if (status === "loading") return <LoadingScreen />;
  if (status === "error" || !session) {
    navigate(ROUTES.HOME, { replace: true });
    return null;
  }

  const handleSend = () => {
    if (!inputValue.trim() || !session.composerEnabled) return;
    sendFailureReason(inputValue.trim());
    setInputValue("");
  };

  const lastMessageId = messages[messages.length - 1]?.id;

  return (
    <PageBackground variant="frost">
      <div className="flex h-dvh flex-col">
        <div className="pt-[max(8px,env(safe-area-inset-top))]">
          <ChatHeader
            title={session.title ?? "지금 바로 조치하기"}
            doneCount={session.progress?.doneCount}
            totalActions={
              session.recommendedActions?.length ??
              session.progress?.totalRequired
            }
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
              session={session}
              isLatest={message.id === lastMessageId}
              onSelectAction={selectAction}
              onDone={confirmDone}
              onFail={confirmFail}
            />
          ))}

          {sending && <TypingIndicator />}

          {sendError && (
            <p className="text-center text-xs font-bold text-danger50">
              {sendError}
            </p>
          )}
        </div>

        {/* 제보 버튼을 입력창 바로 위에 붙인다 — placeholder가 상태에 따라
            바뀌면서 입력창 높이도 달라지기 때문이다. */}
        <div className="relative">
          <FeedbackButton variant="chatbot" anchor="above" />
          <ChatInputBar
            value={inputValue}
            onChange={setInputValue}
            onSend={handleSend}
            disabled={!session.composerEnabled || sending}
            placeholder={
              session.composerEnabled
                ? (session.composerPlaceholder ?? "막힌 부분을 알려주세요")
                : "조치가 막히면 아래 버튼을 눌러주세요"
            }
          />
        </div>
      </div>
    </PageBackground>
  );
}

export default AccountAction;
