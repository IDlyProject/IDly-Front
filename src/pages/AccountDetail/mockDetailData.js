// src/pages/AccountDetail/mockDetailData.js
import { MOCK_ACCOUNTS } from "@/pages/Home/mockData";
import KeyIcon from "@/assets/ic_key.svg";
import ShieldIcon from "@/assets/ic_shield_check.svg";
import LogoutIcon from "@/assets/ic_logout.svg";

export const MOCK_DETAIL = {
  disney: {
    name: "Disney+",
    iconBg: "#1a3fae",
    iconText: "D",
    riskBadgeLabel: "보안 위험",
    isRisk: true,

    riskTitle: "보안 조치가 필요해요",
    summaryTitle: "새로운 기기에서 로그인되었습니다",
    summarySub: "다른 사이트와 같은 비밀번호를 쓰고 있어요",
    sourceLabel: "Disney+ 보안팀 · 2일 전 수신",
    ctaLabel: "지금 바로 조치하기",

    newsText:
      "비밀번호 하나 뚫리면 어디까지 털릴까?\n3분이면 끝나는 재사용 끊기",
    newsUrl: "https://idly-apt.tistory.com/2",

    events: [
      {
        id: "e1",
        type: "suspicious_login",
        name: "의심 로그인 감지",
        time: "오늘 오전 8:44 · 서울",
      },
      {
        id: "e2",
        type: "new_device",
        name: "새 기기에서 접근",
        time: "어제 오후 11:20",
      },
      {
        id: "e3",
        type: "password_change",
        name: "비밀번호 변경 감지",
        time: "3일 전 오후 2:05",
      },
      {
        id: "e4",
        type: "location_change",
        name: "로그인 위치 변경",
        time: "4일 전 오후 6:15",
      },
      {
        id: "e5",
        type: "recovery_email",
        name: "복구 이메일 등록",
        time: "6일 전 오전 11:40",
      },
    ],

    // ↓ AccountAction(챗봇 화면)에서 사용
    chatBadge: "보안 위험 감지",
    chatIntro:
      "새로운 기기에서 로그인이 감지되었고, 다른 사이트와 같은 비밀번호를 사용 중이에요.",
    actions: [
      {
        id: "password",
        name: "비밀번호 변경하기",
        sub: "고유한 비밀번호로 변경",
        icon: KeyIcon,
        color: "#08257e",
        title: "비밀번호 변경",
        url: "www.disneyplus.com/settings/password",
        help: "Disney+ 설정 → 비밀번호 순으로 들어가서, 현재 비밀번호 입력 후 새 비밀번호로 바꾸면 돼요. 아래 링크로 바로 이동할 수 있어요!",
        ad: {
          icon: "🔑",
          text: "비밀번호 하나 뚫리면 어디까지 털릴까?\n3분이면 끝나는 재사용 끊기",
          cta: "카드뉴스 ↗",
          url: "https://idly-apt.tistory.com/2",
        },
      },
      {
        id: "twofactor",
        name: "2단계 인증 설정",
        sub: "추가 보안 계층 활성화",
        icon: ShieldIcon,
        color: "#08257e",
        title: "2단계 인증 설정",
        url: "www.disneyplus.com/settings/security",
        help: "Disney+ 설정 → 보안에서 2단계 인증을 SMS나 인증 앱 중 편한 방식으로 켜면 돼요. 아래 링크로 바로 이동할 수 있어요!",
        ad: {
          icon: "🛡️",
          text: "Google Authenticator vs Authy\n내 상황엔 어떤 게 맞을까?",
          cta: "비교하기 ↗",
          url: "https://idly-apt.tistory.com/2",
        },
      },
      {
        id: "logout",
        name: "모든 기기 로그아웃",
        sub: "의심 기기 접근 차단",
        icon: LogoutIcon,
        color: "#08257e",
        title: "세션 관리",
        url: "www.disneyplus.com/settings/devices",
        help: "Disney+ 설정 → 기기 관리에서 '모든 기기 로그아웃' 버튼을 누르면 돼요. 아래 링크로 바로 이동할 수 있어요!",
        ad: {
          icon: "🔒",
          text: "로그아웃만으로 충분할까?\n세션 보안 완벽 체크리스트",
          cta: "확인하기 ↗",
          url: "https://idly-apt.tistory.com/2",
        },
      },
    ],
  },
};

export function getDetailByAccountId(accountId) {
  const account = MOCK_ACCOUNTS.find((a) => a.id === accountId);
  if (!account) return null;
  return MOCK_DETAIL[account.service] ?? null;
}
