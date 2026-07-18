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
import CelebrationBubble from "./CelebrationBubble";
import CtaListBubble from "./CtaListBubble";

function ChatMessage({
  message,
  doneIds,
  onSelectAction,
  onDone,
  onFail,
  serviceName,
  onHome,
  onNextAccount,
  onReport,
}) {
  switch (message.type) {
    case "typing":
      return <TypingIndicator />;
    case "user":
      return <UserBubble text={message.text} />;
    case "warning-intro":
      return <WarningIntroBubble badge={message.badge} text={message.text} />;
    case "action-list":
      return (
        <ActionListBubble
          title="추천 조치 사항"
          actions={message.actions}
          doneIds={doneIds}
          onSelect={(actionId) => onSelectAction(message.id, actionId)}
        />
      );
    case "remaining-list":
      return (
        <ActionListBubble
          title="남은 조치 사항"
          actions={message.actions}
          doneIds={doneIds}
          onSelect={(actionId) => onSelectAction(message.id, actionId)}
        />
      );
    case "alldone-list":
      return (
        <ActionListBubble
          title="모든 조치 완료"
          titleColor="#43a047"
          actions={message.actions}
          doneIds={doneIds}
        />
      );
    case "link-card":
      return <LinkCardBubble action={message.action} />;
    case "ad-strip":
      return <AdStripBubble ad={message.ad} />;
    case "tip":
      return <TipBubble text={message.text} />;
    case "options":
      return (
        <ConfirmOptionsBubble
          onDone={() => onDone(message.id, message.actionId)}
          onFail={() => onFail(message.id, message.actionId)}
        />
      );
    case "text":
      return <TextBubble text={message.text} />;
    case "celebrate":
      return <CelebrationBubble serviceName={serviceName} />;
    case "cta-list":
      return (
        <CtaListBubble
          onHome={onHome}
          onNextAccount={onNextAccount}
          onReport={onReport}
        />
      );
    default:
      return null;
  }
}

export default ChatMessage;
