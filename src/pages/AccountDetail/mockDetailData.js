// src/pages/AccountDetail/mockDetailData.js
// TODO: 실제로는 GET /accounts/:accountId 응답으로 대체
// 서버는 accountId로 조회하되, 응답에 service 정보(로고/이름/대응템플릿)를 포함해서 내려줄 것으로 예상

import { MOCK_ACCOUNTS } from "@/pages/Home/mockData";

// service별 위험 신호/대응 템플릿 (실제로는 riskType 기반 템플릿을 서버가 매칭해서 내려줌)
const SERVICE_TEMPLATES = {
  disney: {
    riskLevel: "높음",
    meta: ["새 기기 로그인", "월 9,900원"],
    summaryTitle: "오늘 안에 확인 필요",
    summaryDesc: "새 기기 로그인과 오래된 비밀번호 신호가 함께 확인됐습니다.",
    signals: [
      {
        id: 1,
        level: "red",
        title: "새 기기 로그인 감지",
        desc: "6월 23일 02:14 · Windows PC 로그인",
        source: "Disney+ 보안팀 메일",
      },
      {
        id: 2,
        level: "yellow",
        title: "비밀번호 변경 기록 부족",
        desc: "최근 6개월 내 변경 신호 없음",
      },
      {
        id: 3,
        level: "gray",
        title: "결제 정보가 연결된 계정",
        desc: "월 9,900원 결제 계정 · 우선 확인",
        source: "Disney+ 결제 알림 메일",
      },
    ],
    responseDesc:
      "본인 활동이 아니면 비밀번호를 바꾸고 알 수 없는 기기에서 로그아웃합니다.",
    responseSteps: [
      { label: "1. 비밀번호 변경", required: true },
      { label: "2. 모든 기기 로그아웃", required: true },
      { label: "3. 같은 비밀번호 계정 점검", required: false },
    ],
    officialUrl: "https://www.disneyplus.com/",
    tasks: [
      {
        id: "open",
        type: "link",
        title: "Disney+ 공식 페이지 열기",
        desc: "메일 링크가 아니라 공식 사이트로 이동해요",
        required: false,
      },
      {
        id: "password",
        type: "check",
        title: "새 비밀번호로 변경",
        desc: "이전 조합과 겹치지 않게 설정",
        required: true,
      },
      {
        id: "logout",
        type: "check",
        title: "알 수 없는 기기 로그아웃",
        desc: "최근 로그인 기기 목록 확인",
        required: true,
      },
      {
        id: "reuse",
        type: "check",
        title: "같은 비밀번호 사용 계정 점검",
        desc: "Adobe, Dropbox 등 함께 점검",
        required: false,
      },
    ],
  },
  // TODO: adobe 등 다른 위험 서비스도 필요하면 추가
};

export function getDetailByAccountId(accountId) {
  const account = MOCK_ACCOUNTS.find((a) => a.id === accountId);
  if (!account) return null;

  const template = SERVICE_TEMPLATES[account.service];
  if (!template) return null;

  return {
    name: account.name,
    iconBg: account.iconBg,
    iconText: account.iconText,
    status: account.status,
    emailGroup: account.emailGroup,
    ...template,
  };
}
