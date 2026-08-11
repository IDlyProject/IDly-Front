import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBackground from "@/components/layouts/PageBackground";
import { ROUTES } from "@/constants/routes";
import ChatHeader from "@/pages/AccountAction/components/ChatHeader";
import OwlAvatar from "@/pages/AccountAction/components/OwlAvatar";
import UserBubble from "@/pages/AccountAction/components/UserBubble";
import TextBubble from "@/pages/AccountAction/components/TextBubble";
import LinkCardBubble from "@/pages/AccountAction/components/LinkCardBubble";
import ActionListBubble from "@/pages/AccountAction/components/ActionListBubble";
import TypingIndicator from "@/pages/AccountAction/components/TypingIndicator";
import {
  resolveOfficialLinkCard,
} from "@/pages/AccountAction/utils/messageContent";
import CtaListBubble from "@/pages/AccountAction/components/CtaListBubble";
import {
  startSecurityChatSession,
  getSecurityChatSessionList,
  getSecurityChatSessionMessages,
  sendSecurityChatMessage,
} from "@/services/securityChatService";
import { getErrorMessage } from "@/lib/api";
import { SendIcon } from "@/pages/AccountAction/icons";

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
      // 일반 보안 도우미에서는 완료 전 카드뉴스를 노출하지 않는다.
      return null;
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

function BackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M12.5 5L7.5 10L12.5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 3.25a4.75 4.75 0 1 1-4.32 2.77M3.5 3.25v3h3"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 5.4v2.85l1.9 1.1"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SecurityAssistantComposer({
  value,
  onChange,
  onSend,
  disabled,
  hasHistory,
  onOpenHistory,
}) {
  const sendDisabled = disabled || !value.trim();

  return (
    <div className="border-t border-[#E6EAF1] bg-white px-4 pt-2.5 pb-[calc(12px+env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(20,35,70,0.035)]">
      {hasHistory && (
        <button
          type="button"
          onClick={onOpenHistory}
          className="mb-2 flex min-h-8 items-center gap-1.5 rounded-lg px-1.5 text-[12px] font-semibold text-[#52637E] transition-colors hover:text-[#08257E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#08257E]"
        >
          <HistoryIcon />
          <span>이전 대화</span>
        </button>
      )}

      <div className="relative flex h-12 items-center rounded-2xl border border-[#E1E6EE] bg-[#F4F6F9] pl-4 pr-1.5 transition-colors focus-within:border-[#8FA5E6] focus-within:bg-white">
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.nativeEvent.isComposing) onSend();
          }}
          disabled={disabled}
          placeholder="보안 관련 질문을 입력하세요"
          aria-label="보안 관련 질문"
          className="min-w-0 flex-1 bg-transparent pr-3 text-[14px] font-medium text-[#191F28] outline-none placeholder:text-[#7B8494] disabled:cursor-not-allowed disabled:opacity-60"
        />
        <button
          type="button"
          onClick={onSend}
          disabled={sendDisabled}
          aria-label="메시지 보내기"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#08257E] transition-[transform,background-color,opacity] active:scale-95 disabled:bg-[#D8DDE7] disabled:opacity-100"
        >
          <img src={SendIcon} alt="" className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function formatSessionDate(isoString) {
  const d = new Date(isoString);
  const now = new Date();
  const diffMs = now - d;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "오늘";
  if (diffDays === 1) return "어제";
  if (diffDays < 7) return `${diffDays}일 전`;
  return `${d.getMonth() + 1}월 ${d.getDate()}일`;
}

function SecurityAssistant() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [hasHistory, setHasHistory] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  // 이전 대화 오버레이 상태
  const [historyView, setHistoryView] = useState(null); // null | "list" | "session"
  const [sessionList, setSessionList] = useState(null);
  const [sessionListLoading, setSessionListLoading] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null); // { id, summary, startedAt }
  const [sessionMessages, setSessionMessages] = useState(null);
  const [sessionMessagesLoading, setSessionMessagesLoading] = useState(false);

  const scrollRef = useRef(null);
  const overlayScrollRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const session = await startSecurityChatSession();
        if (cancelled) return;
        setSessionId(session.sessionId);
        setHasHistory(session.hasHistory ?? false);
        setMessages([]);
      } catch (err) {
        console.error("security chat init failed:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  useEffect(() => {
    if (historyView) {
      setTimeout(() => {
        overlayScrollRef.current?.scrollTo({ top: 0 });
      }, 50);
    }
  }, [historyView, sessionMessages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || sending || !sessionId) return;

    setInput("");
    setError("");

    const optimisticId = `local-${Date.now()}`;
    setMessages((prev) => [...prev, { id: optimisticId, role: "user", type: "text", text }]);
    setSending(true);

    try {
      const result = await sendSecurityChatMessage(sessionId, text);
      if (result?.userMessage && result?.assistantMessages) {
        setMessages((prev) => [
          ...prev.filter((m) => m.id !== optimisticId),
          result.userMessage,
          ...result.assistantMessages,
        ]);
      } else {
        setError("응답을 불러오지 못했어요. 다시 시도해주세요.");
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

  const handleOpenHistoryList = async () => {
    setHistoryView("list");
    if (sessionList !== null) return;
    setSessionListLoading(true);
    try {
      const data = await getSecurityChatSessionList(sessionId);
      setSessionList(data.sessions ?? []);
    } catch (err) {
      console.error("session list load failed:", err);
      setSessionList([]);
    } finally {
      setSessionListLoading(false);
    }
  };

  const handleSelectSession = async (session) => {
    setSelectedSession(session);
    setHistoryView("session");
    setSessionMessages(null);
    setSessionMessagesLoading(true);
    try {
      const data = await getSecurityChatSessionMessages(session.id);
      setSessionMessages(normalizeMessages(data));
    } catch (err) {
      console.error("session messages load failed:", err);
      setSessionMessages([]);
    } finally {
      setSessionMessagesLoading(false);
    }
  };

  const handleOverlayBack = () => {
    if (historyView === "session") {
      setHistoryView("list");
      setSelectedSession(null);
      setSessionMessages(null);
    } else {
      setHistoryView(null);
    }
  };

  return (
    <PageBackground variant="frost">
      <div className="relative flex h-dvh flex-col">
        <div className="pt-[max(12px,env(safe-area-inset-top))]">
          <ChatHeader title="보안 도우미에게 문의하기" onBack={() => navigate(-1)} />
        </div>

        <div ref={scrollRef} className="flex-1 space-y-2.5 overflow-y-auto px-4 py-3">
          <div className="flex items-start gap-2.5">
            <OwlAvatar />
            <div className="max-w-[280px] rounded-[4px_18px_18px_18px] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,46,0.04)]">
              <p className="text-[13px] font-bold leading-relaxed text-[#191f28]">
                IDly에서 분석한 계정에 대한 문의 뿐만 아니라, 유출 • 해킹에 대한
                질문이 있다면 뭐든 알려주세요 !
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
            <p className="text-center text-xs font-bold text-danger50">{error}</p>
          )}
        </div>

        <SecurityAssistantComposer
          value={input}
          onChange={setInput}
          onSend={handleSend}
          disabled={sending || !sessionId}
          hasHistory={hasHistory}
          onOpenHistory={handleOpenHistoryList}
        />

        {/* 이전 대화 오버레이 */}
        {historyView && (
          <div
            className="absolute inset-0 z-50 flex flex-col"
            style={{ background: "var(--color-frost, #f0f4ff)" }}
          >
            {/* 헤더 */}
            <div
              className="flex items-center gap-3 border-b border-[#e8eaf0] bg-white px-4 py-3"
              style={{ paddingTop: "max(12px, env(safe-area-inset-top))" }}
            >
              <button
                onClick={handleOverlayBack}
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#191f28]"
                aria-label="뒤로"
              >
                <BackIcon />
              </button>
              <span className="text-[15px] font-bold text-[#191f28]">
                {historyView === "list" ? "이전 대화" : (selectedSession?.summary?.slice(0, 20) ?? "대화 내용")}
              </span>
            </div>

            <div ref={overlayScrollRef} className="flex-1 overflow-y-auto">
              {/* 세션 목록 */}
              {historyView === "list" && (
                <>
                  {sessionListLoading && (
                    <div className="px-4 py-6"><TypingIndicator /></div>
                  )}
                  {!sessionListLoading && sessionList?.length === 0 && (
                    <p className="pt-8 text-center text-[13px] text-[#9097a6]">이전 대화가 없어요</p>
                  )}
                  {!sessionListLoading && sessionList?.map((session) => (
                    <button
                      key={session.id}
                      onClick={() => handleSelectSession(session)}
                      className="flex w-full items-start gap-3 border-b border-[#f0f2f5] bg-white px-4 py-4 text-left active:bg-[#f5f7ff]"
                    >
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#e8eeff]">
                        <span className="text-[16px]">💬</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-bold text-[#191f28]">
                          {session.summary}
                        </p>
                        <p className="mt-0.5 text-[11px] text-[#9097a6]">
                          {formatSessionDate(session.startedAt)} · {session.messageCount}개 메시지
                        </p>
                      </div>
                      <svg className="mt-1 flex-shrink-0 text-[#c0c6d4]" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  ))}
                </>
              )}

              {/* 세션 메시지 */}
              {historyView === "session" && (
                <div className="space-y-2.5 px-4 py-3">
                  {sessionMessagesLoading && <TypingIndicator />}
                  {!sessionMessagesLoading && sessionMessages?.length === 0 && (
                    <p className="pt-8 text-center text-[13px] text-[#9097a6]">메시지가 없어요</p>
                  )}
                  {sessionMessages?.map((message) => (
                    <ChatMessageBubble key={message.id} message={message} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </PageBackground>
  );
}

export default SecurityAssistant;
