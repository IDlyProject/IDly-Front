// src/utils/serviceIcon.js
const SERVICE_ICON_GRADIENTS = [
  "linear-gradient(160deg,#3b6cff,#5b7dff)",
  "linear-gradient(160deg,#16b886,#0da87c)",
  "linear-gradient(160deg,#ff9f43,#ffb976)",
  "linear-gradient(160deg,#a06cff,#c48bff)",
  "linear-gradient(160deg,#ff6040,#e04e39)",
  "linear-gradient(160deg,#0e72ed,#2d8cff)",
];

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// 서비스별 고정 아이콘 색상이 없을 때, 이름을 해시해 팔레트에서 안정적으로 하나 고른다
export function getServiceIconGradient(serviceName) {
  return SERVICE_ICON_GRADIENTS[
    hashString(serviceName ?? "") % SERVICE_ICON_GRADIENTS.length
  ];
}
