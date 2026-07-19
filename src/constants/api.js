// src/constants/api.js
// Vite는 클라이언트에 노출할 env를 VITE_ 접두사로만 읽는다 (빌드 시점에 번들에 박힘).
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error(
    "VITE_API_BASE_URL이 설정되지 않았습니다. .env 또는 배포 환경변수를 확인하세요.",
  );
}
