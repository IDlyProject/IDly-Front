import { axiosInstance } from "@/lib/api";

/**
 * 계정 추가용 Google OAuth URL을 받아온다.
 *
 * `/api/auth/google`로 곧장 이동하면 브라우저 리다이렉트라 Authorization 헤더를
 * 실을 수 없어 백엔드가 쿠키로만 로그인 여부를 판별한다. 쿠키가 차단되는
 * 환경(시크릿창·카카오톡 인앱 브라우저·iOS Safari ITP)에서는 로그인으로 오인해
 * 기존 유저에 계정이 붙는 대신 신규 유저가 만들어진다.
 *
 * 그래서 URL을 받아오는 단계만 axios로 처리한다. 이 요청에는 Bearer 토큰이
 * 실리고, 응답 URL의 서명된 state에 유저 식별자가 담기므로 이후 이동은 쿠키와
 * 무관하게 동작한다.
 */
export async function fetchAddAccountUrl() {
  const { data } = await axiosInstance.post("/api/auth/add-account/start");
  return data.url;
}
