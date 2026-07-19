export function formatTimeAgo(isoString) {
  if (!isoString) return "";
  const diffMs = Date.now() - new Date(isoString).getTime();
  const diffHours = Math.floor(diffMs / (60 * 60 * 1000));
  if (diffHours < 1) return "방금 전";
  if (diffHours < 24) return `${diffHours}시간 전`;
  return `${Math.floor(diffHours / 24)}일 전`;
}
