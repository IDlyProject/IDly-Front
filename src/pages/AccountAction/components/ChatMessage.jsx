// src/pages/AccountAction/components/ChatMessage.jsx
import TypingIndicator from "./TypingIndicator";
import UserBubble from "./UserBubble";
import WarningIntroBubble from "./WarningIntroBubble";
import ActionListBubble from "./ActionListBubble";
import LinkCardBubble from "./LinkCardBubble";
import AdStripBubble from "./AdStripBubble";
import TipBubble from "./TipBubble";
import ConfirmOptionsBubble from "./ConfirmOptionsBubble";
import TextBubble from "./TextBubble";

// session.messages[] 항목(role/type/text/metadata)을 화면 버블로 변환.
// metadata 구조는 문서에 action_list({actionList:{title,actionIds}})만 명시돼 있고
// official_link/card_news/risk_intro는 실제 응답을 보고 조정이 필요할 수 있음 — 없으면 text로 폴백.
function ChatMessage({ message, session, isLatest, onSelectAction, onDone, onFail }) {
  if (message.type === "typing") return <TypingIndicator />;
  if (message.role === "user") return <UserBubble text={message.text} />;

  switch (message.type) {
    case "risk_intro":
      return (
        <WarningIntroBubble
          badge={session?.riskIntroCard?.title ?? "보안 위험 감지"}
          text={session?.riskIntroCard?.description ?? message.text}
        />
      );

    case "action_list": {
      const actionIds = message.metadata?.actionList?.actionIds;
      const items = actionIds
        ? actionIds
            .map((id) => session?.recommendedActionsById?.[id])
            .filter(Boolean)
        : (session?.recommendedActions ?? []);
      return (
        <ActionListBubble
          title={message.metadata?.actionList?.title ?? "추천 조치 사항"}
          actions={items}
          onSelect={session?.readOnly ? undefined : onSelectAction}
        />
      );
    }

    case "official_link": {
      // metadata엔 링크 정보가 없고, 메시지가 온 시점의 활성 조치(externalCard)에 들어있음
      const activeAction = session?.recommendedActionsById?.[message._actionItemId];
      const card = message.metadata?.officialLink ?? activeAction?.externalCard;
      return card ? <LinkCardBubble card={card} /> : <TextBubble text={message.text} />;
    }

    case "card_news": {
      const cardNews = message.metadata?.cardNews;
      // 헤드라인은 metadata가 아니라 메시지 자체의 text에 들어있음
      return cardNews ? (
        <AdStripBubble
          news={{ emoji: cardNews.emoji, title: message.text, url: cardNews.url }}
          badge={cardNews.badge}
        />
      ) : (
        <TextBubble text={message.text} />
      );
    }

    case "tip":
      return <TipBubble text={message.text} />;

    case "feedback_actions":
      return (
        <ConfirmOptionsBubble
          onDone={onDone}
          onFail={onFail}
          disabled={!isLatest || !session?.feedbackEnabled}
        />
      );

    case "text":
    default:
      return <TextBubble text={message.text} />;
  }
}

export default ChatMessage;
