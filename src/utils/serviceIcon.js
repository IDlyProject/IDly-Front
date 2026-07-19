// src/utils/serviceIcon.js
import { getGradientByHash } from "./palette";

// 서비스별 고정 아이콘 색상이 없을 때, 이름을 해시해 팔레트에서 안정적으로 하나 고른다
export function getServiceIconGradient(serviceName) {
  return getGradientByHash(serviceName);
}
