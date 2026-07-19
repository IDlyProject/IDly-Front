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
import { resolveOfficialLinkCard, resolveCardNews } from "../utils/messageContent";

// session.messages[] 항목(role/type/text/metadata)을 화면 버블로 변환.
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
      // metadata.externalCard가 비어있는 경우(관찰됨)를 대비해, 메시지가 온 시점의
      // 활성 조치(externalCard)로 폴백
      const activeAction = session?.recommendedActionsById?.[message._actionItemId];
      const card = resolveOfficialLinkCard(message) ?? activeAction?.externalCard;
      return card ? <LinkCardBubble card={card} /> : <TextBubble text={message.text} />;
    }

    case "card_news": {
      const news = resolveCardNews(message);
      return news ? <AdStripBubble news={news} /> : <TextBubble text={message.text} />;
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
