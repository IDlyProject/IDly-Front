import TypingIndicator from "./TypingIndicator";
import UserBubble from "./UserBubble";
import WarningIntroBubble from "./WarningIntroBubble";
import ActionListBubble from "./ActionListBubble";
import LinkCardBubble from "./LinkCardBubble";
import AdStripBubble from "./AdStripBubble";
import TipBubble from "./TipBubble";
import ConfirmOptionsBubble from "./ConfirmOptionsBubble";
import TextBubble from "./TextBubble";
import CelebrationBubble from "./CelebrationBubble";
import CtaListBubble from "./CtaListBubble";
import { resolveOfficialLinkCard, resolveCardNews } from "../utils/messageContent";

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

    case "celebration": {
      const c = message.metadata?.celebration;
      return (
        <CelebrationBubble
          emoji={c?.emoji}
          title={c?.title ?? message.text}
          subtitle={c?.subtitle}
        />
      );
    }

    case "exit_cta":
      return (
        <CtaListBubble
          ctas={message.metadata?.exitCtas ?? []}
          nextServiceAccountId={session?.completion?.nextServiceAccountId}
        />
      );

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
