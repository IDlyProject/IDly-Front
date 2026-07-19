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
import { getSecurityChat, sendSecurityChatMessage } from "@/api/securityChat";

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
    case "action_list": {

      const items = (message.metadata?.actionList?.items ?? []).map((item) => ({
        id: item.id,
        title: item.actionTitle,
        subtitle: item.serviceName ?? item.displayName,
        status: item.status,
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
  const scrollRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    getSecurityChat()
      .then((data) => {
        if (cancelled) return;
        setMessages(normalizeMessages(data));
      })
      .catch((err) => {
        console.error("security chat history load failed:", err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
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

    setMessages((prev) => [
      ...prev,
      { id: `local-${Date.now()}`, role: "user", type: "text", text },
    ]);
    setSending(true);

    try {
      await sendSecurityChatMessage(text);
      const history = await getSecurityChat();
      setMessages(normalizeMessages(history));
    } catch (err) {
      console.error("security chat send failed:", err);
      if (err.status === 400) {
        setError("비밀번호, 인증코드, 카드번호 같은 민감정보는 보낼 수 없어요.");
      } else if (err.status === 429) {
        setError("메시지를 너무 빠르게 보내고 있어요. 잠시 후 다시 시도해주세요.");
      } else {
        setError("메시지 전송에 실패했어요. 다시 시도해주세요.");
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <PageBackground variant="frost">
      <div className="flex h-dvh flex-col">
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

        <ChatInputBar
          value={input}
          onChange={setInput}
          onSend={handleSend}
          disabled={sending}
        />
      </div>
    </PageBackground>
  );
}

export default SecurityAssistant;
