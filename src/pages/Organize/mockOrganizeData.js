// src/pages/Organize/mockOrganizeData.js
// TODO: 실제로는 /organize 또는 계정별 조치 목록 API로 대체
export const MOCK_ORGANIZE = {
  monthLabel: "이번 달 보안 조치",
  completedCount: 4,
  inProgressCount: 1,
  waitingCount: 2,
  services: [
    {
      id: "svc_disney",
      name: "Disney+",
      iconBg: "linear-gradient(160deg,#0a2fa8,#0063e5)",
      iconText: "D",
      actionCount: 4,
      expanded: true,
      tasks: [
        {
          id: "t1",
          title: "비밀번호 변경",
          status: "done",
          timeAgo: "2시간 전",
        },
        {
          id: "t2",
          title: "2단계 인증 설정",
          status: "done",
          timeAgo: "1일 전",
        },
        {
          id: "t3",
          title: "모든 기기 로그아웃",
          status: "pending",
          badge: "1개됨",
        },
        { id: "t4", title: "로그인 위치 확인", status: "waiting" },
      ],
    },
    {
      id: "svc_google",
      name: "Google",
      iconBg: "linear-gradient(160deg,#5488f3,#4285f4)",
      iconText: "G",
      actionCount: 2,
      expanded: false,
      tasks: [
        {
          id: "t5",
          title: "복구 이메일 점검",
          status: "done",
          timeAgo: "3일 전",
        },
        {
          id: "t6",
          title: "로그인 알림 설정",
          status: "pending",
          badge: "N개됨",
        },
      ],
    },
    {
      id: "svc_netflix",
      name: "Netflix",
      iconBg: "linear-gradient(160deg,#8b0000,#e50914)",
      iconText: "N",
      actionCount: 1,
      expanded: false,
      tasks: [
        { id: "t7", title: "비밀번호 변경", status: "done", timeAgo: "5일 전" },
      ],
    },
  ],
};
