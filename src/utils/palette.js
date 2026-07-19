// src/utils/palette.js
// 계정 아바타 / 서비스 아이콘에 안정적으로 색을 배정할 때 쓰는 공용 팔레트.
// 앱 전역에서 카드형 그라데이션은 135deg를 쓰는 컨벤션이라 여기도 맞춤.
export const PALETTE_GRADIENTS = [
  "linear-gradient(135deg,#3b6cff,#5b7dff)",
  "linear-gradient(135deg,#16b886,#0da87c)",
  "linear-gradient(135deg,#ff9f43,#ffb976)",
  "linear-gradient(135deg,#a06cff,#c48bff)",
  "linear-gradient(135deg,#ff6040,#e04e39)",
  "linear-gradient(135deg,#0e72ed,#2d8cff)",
];

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// 이름을 해시해 팔레트에서 안정적으로 하나 고른다 (서비스 아이콘 등, 순서가 안 바뀌는 식별자용)
export function getGradientByHash(name) {
  return PALETTE_GRADIENTS[hashString(name ?? "") % PALETTE_GRADIENTS.length];
}

// 목록 내 위치로 단순 순환 배정
export function getGradientByIndex(index) {
  return PALETTE_GRADIENTS[index % PALETTE_GRADIENTS.length];
}

// slot 0(팔레트 첫 색)은 대표 계정 전용으로 예약하고, 나머지는 1번 슬롯부터 순환
export function getGradientByIndexReservingPrimary(index) {
  return PALETTE_GRADIENTS[(index % (PALETTE_GRADIENTS.length - 1)) + 1];
}
