export function resolveOfficialLinkCard(message) {
  return message.metadata?.externalCard ?? null;
}

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
