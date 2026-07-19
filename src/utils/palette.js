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

export function getGradientByHash(name) {
  return PALETTE_GRADIENTS[hashString(name ?? "") % PALETTE_GRADIENTS.length];
}

export function getGradientByIndex(index) {
  return PALETTE_GRADIENTS[index % PALETTE_GRADIENTS.length];
}

export function getGradientByIndexReservingPrimary(index) {
  return PALETTE_GRADIENTS[(index % (PALETTE_GRADIENTS.length - 1)) + 1];
}
