// src/pages/AccountAction/utils/messageContent.js
// AccountAction(계정별 조치)과 SecurityAssistant(보안 도우미) 둘 다 같은 챗봇
// 메시지 모양(role/type/text/metadata)을 쓰고 있어서 카드 파싱 로직을 공유한다.

// type: "official_link" 메시지 → LinkCardBubble이 기대하는 모양
export function resolveOfficialLinkCard(message) {
  return message.metadata?.externalCard ?? null;
}

// type: "card_news" 메시지 → AdStripBubble이 기대하는 모양
export function resolveCardNews(message) {
  const cardNews = message.metadata?.cardNews;
  if (!cardNews) return null;
  return {
    emoji: cardNews.emoji,
    title: cardNews.title ?? message.text,
    url: cardNews.url,
    badge: cardNews.badge,
    ctaLabel: cardNews.ctaLabel,
  };
}
