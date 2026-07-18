// src/pages/SecurityReport/mockReportData.js
export const MOCK_REPORT = {
  baseDate: "2026년 7월 16일 기준",
  score: 72,
  riskCount: 3,
  actionCount: 2,
  safeCount: 4,
  isSafe: false,
  recommendations: [
    {
      id: "rec1",
      level: "high",
      title: "Disney+ 비밀번호 즉시 변경",
      desc: "유출된 비밀번호와 위험합니다",
    },
    {
      id: "rec2",
      level: "medium",
      title: "Apple 비밀번호 갱신 권장",
      desc: "6개월 이상 오래된 비밀번호 사용",
    },
    {
      id: "rec3",
      level: "low",
      title: "Netflix 기기 정리",
      desc: "사용하지 않는 기기의 로그인을 해제하세요",
    },
  ],
  riskItems: [
    {
      id: "risk1",
      type: "leak",
      title: "비밀번호 유출 감지",
      desc: "Disney+ 계정의 비밀번호가 유출 목록에서 발견됐습니다.",
      timeAgo: "3시간 전",
    },
    {
      id: "risk2",
      type: "login",
      title: "의심스러운 로그인",
      desc: "Disney+ 계정에서 새 IP 로그인 시도가 감지됐습니다.",
      timeAgo: "5시간 전",
    },
    {
      id: "risk3",
      type: "password",
      title: "비밀번호 장기 경과",
      desc: "Apple 계정의 비밀번호가 6개월 이상 변경되지 않았습니다.",
      timeAgo: "1일 전",
    },
    {
      id: "risk4",
      type: "device",
      title: "다중 기기 로그인",
      desc: "Netflix 계정에서 3개 기기가 동시에 로그인 중입니다.",
      timeAgo: "1일 전",
    },
    {
      id: "risk5",
      type: "safe",
      title: "Google 보안 점검 완료",
      desc: "2단계 인증이 활성화되어 있어 안전합니다.",
      timeAgo: "7일 전",
    },
  ],
};
