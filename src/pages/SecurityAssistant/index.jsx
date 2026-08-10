import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import { ROUTES } from "@/constants/routes";
import ChatHeader from "@/pages/AccountAction/components/ChatHeader";
import ChatInputBar from "@/pages/AccountAction/components/ChatInputBar";
import OwlAvatar from "@/pages/AccountAction/components/OwlAvatar";
import UserBubble from "@/pages/AccountAction/components/UserBubble";
import TextBubble from "@/pages/AccountAction/components/TextBubble";
import LinkCardBubble from "@/pages/AccountAction/components/LinkCardBubble";
import AdStripBubble from "@/pages/AccountAction/components/AdStripBubble";
import ActionListBubble from "@/pages/AccountAction/components/ActionListBubble";
import TypingIndicator from "@/pages/AccountAction/components/TypingIndicator";
import {
  resolveOfficialLinkCard,
  resolveCardNews,
} from "@/pages/AccountAction/utils/messageContent";
import CtaListBubble from "@/pages/AccountAction/components/CtaListBubble";
import {
  startSecurityChatSession,
  getSecurityChat,
  getSecurityChatHistory,
  sendSecurityChatMessage,
} from "@/services/securityChatService";
import { getErrorMessage } from "@/lib/api";

function normalizeMessages(raw) {
  return Array.isArray(raw) ? raw : (raw?.messages ?? []);
}

function ChatMessageBubble({ message }) {
  const navigate = useNavigate();

  if (message.role === "user") return <UserBubble text={message.text} />;

  switch (message.type) {
    case "official_link": {
      const card = resolveOfficialLinkCard(message);
      return card ? <LinkCardBubble card={card} /> : <TextBubble text={message.text} />;
    }
    case "card_news": {
      const news = resolveCardNews(message);
      return news ? <AdStripBubble news={news} /> : <TextBubble text={message.text} />;
    }
    case "exit_cta":
      return <CtaListBubble ctas={message.metadata?.exitCtas ?? []} />;

    case "action_list": {
      const items = (message.metadata?.actionList?.items ?? []).map((item) => ({
        id: item.id,
        title: item.actionTitle,
        subtitle: item.serviceName ?? item.displayName,
        status: item.status,
        iconEmoji: item.iconEmoji,
        serviceAccountId: item.serviceAccountId,
      }));
      return (
        <ActionListBubble
          title={message.text || "조치가 필요한 항목"}
          actions={items}
          onSelect={(id) => {
            const target = items.find((item) => item.id === id);
            if (target?.serviceAccountId) {
              navigate(ROUTES.ACCOUNT_ACTION(target.serviceAccountId));
            }
          }}
        />
      );
    }
    case "text":
    default:
      return <TextBubble text={message.text} />;
  }
}

function SecurityAssistant() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [hasHistory, setHasHistory] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historyMessages, setHistoryMessages] = useState(null);
  const [historyLoading, setHistoryLoading] = useState(false);
  const scrollRef = useRef(null);
  const historyScrollRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const session = await startSecurityChatSession();
        if (cancelled) return;
        setHasHistory(session.hasHistory ?? false);

        const data = await getSecurityChat();
        if (cancelled) return;
        setMessages(normalizeMessages(data));
      } catch (err) {
        console.error("security chat init failed:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, sending]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || sending) return;

    setInput("");
    setError("");

    const optimisticId = `local-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: optimisticId, role: "user", type: "text", text },
    ]);
    setSending(true);

    try {
      const result = await sendSecurityChatMessage(text);
      if (result?.userMessage && result?.assistantMessages) {
        setMessages((prev) => [
          ...prev.filter((m) => m.id !== optimisticId),
          result.userMessage,
          ...result.assistantMessages,
        ]);
      } else {
        const history = await getSecurityChat();
        setMessages(normalizeMessages(history));
      }
    } catch (err) {
      console.error("security chat send failed:", err);
      setMessages((prev) => prev.filter((m) => m.id !== optimisticId));
      if (err.status === 400) {
        setError("비밀번호, 인증코드, 카드번호 같은 민감정보는 보낼 수 없어요.");
      } else if (err.status === 429) {
        setError("메시지를 너무 빠르게 보내고 있어요. 잠시 후 다시 시도해주세요.");
      } else {
        setError(getErrorMessage(err, "메시지 전송에 실패했어요. 다시 시도해주세요."));
      }
    } finally {
      setSending(false);
    }
  };

  const handleOpenHistory = async () => {
    setShowHistory(true);
    if (historyMessages !== null) return;
    setHistoryLoading(true);
    try {
      const data = await getSecurityChatHistory();
      setHistoryMessages(normalizeMessages(data));
    } catch (err) {
      console.error("history load failed:", err);
      setHistoryMessages([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    if (showHistory) {
      setTimeout(() => {
        historyScrollRef.current?.scrollTo({
          top: historyScrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  }, [showHistory, historyMessages]);

  return (
    <PageBackground variant="frost">
      <div className="relative flex h-dvh flex-col">
        <div className="pt-[max(12px,env(safe-area-inset-top))]">
          <ChatHeader
            title="보안 도우미에게 문의하기"
            onBack={() => navigate(-1)}
          />
        </div>

        <div
          ref={scrollRef}
          className="flex-1 space-y-2.5 overflow-y-auto px-4 py-3"
        >
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

          {loading && <TypingIndicator />}

          {messages.map((message) => (
            <ChatMessageBubble key={message.id} message={message} />
          ))}

          {sending && <TypingIndicator />}

          {error && (
            <p className="text-center text-xs font-bold text-danger50">
              {error}
            </p>
          )}
        </div>

        {hasHistory && (
          <div className="flex justify-end px-4 pb-1">
            <button
              onClick={handleOpenHistory}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-bold text-white shadow-md"
              style={{ background: "#08257e" }}
            >
              <span>💬</span>
              <span>이전 대화 보기</span>
            </button>
          </div>
        )}

        <ChatInputBar
          value={input}
          onChange={setInput}
          onSend={handleSend}
          disabled={sending}
        />

        {/* 이전 대화 오버레이 */}
        {showHistory && (
          <div
            className="absolute inset-0 z-50 flex flex-col"
            style={{ background: "var(--color-frost, #f0f4ff)" }}
          >
            <div
              className="flex items-center gap-3 border-b border-[#e8eaf0] px-4 py-3"
              style={{ paddingTop: "max(12px, env(safe-area-inset-top))" }}
            >
              <button
                onClick={() => setShowHistory(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#191f28]"
                aria-label="닫기"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M12.5 5L7.5 10L12.5 15"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <span className="text-[15px] font-bold text-[#191f28]">이전 대화</span>
            </div>

            <div
              ref={historyScrollRef}
              className="flex-1 space-y-2.5 overflow-y-auto px-4 py-3"
            >
              {historyLoading && <TypingIndicator />}

              {!historyLoading && historyMessages?.length === 0 && (
                <p className="pt-8 text-center text-[13px] text-[#9097a6]">
                  이전 대화가 없어요
                </p>
              )}

              {historyMessages?.map((message) => (
                <ChatMessageBubble key={message.id} message={message} />
              ))}
            </div>
          </div>
        )}
      </div>
    </PageBackground>
  );
}

export default SecurityAssistant;
