// src/hooks/useAsync.js
import { useCallback, useEffect, useRef, useState } from "react";

// useHomeData/useSummary/useSecurityReport/useGmailAccounts/useServiceAccountDetail
// 등이 각자 반복하던 "로딩 상태 + 취소 처리 + 에러 로깅" 보일러플레이트를 하나로 통합.
// requestId를 증가시켜 stale 응답(언마운트/재요청 이후 늦게 도착한 응답)을 무시한다.
//
// fetcher는 반드시 안정된 참조여야 한다: 인자가 없으면 import한 API 함수를 그대로,
// 인자가 있으면 호출부에서 useCallback(() => fn(arg), [arg])로 감싸서 넘긴다.
// initialValue: 첫 로딩 동안 data의 기본값 (기본 null). 로딩 상태를 가드하지 않고
//   바로 배열 메서드를 쓰는 화면이 있다면 []를 넘겨서 깨지지 않게 한다.
export function useAsync(fetcher, initialValue = null) {
  const [data, setData] = useState(initialValue);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const requestIdRef = useRef(0);

  const load = useCallback(async () => {
    const requestId = ++requestIdRef.current;
    setStatus("loading");
    try {
      const result = await fetcher();
      if (requestIdRef.current !== requestId) return;
      setData(result);
      setStatus("ready");
    } catch (err) {
      if (requestIdRef.current !== requestId) return;
      console.error("useAsync fetch failed:", err);
      setStatus("error");
    }
  }, [fetcher]);

  useEffect(() => {
    // load() 내부의 setStatus("loading")은 React 공식 문서의 "마운트 시 데이터 페칭" 패턴과
    // 동일하게 의도된 것으로, cascading render를 일으키지 않는다.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
    return () => {
      // requestIdRef는 DOM ref가 아니라 취소 플래그로 쓰는 일반 mutable ref라
      // cleanup 시점의 "최신 값"을 읽는 게 의도된 동작이다.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      requestIdRef.current++; // 언마운트/fetcher 변경 시 진행 중이던 요청을 무효화
    };
  }, [load]);

  return { data, status, reload: load };
}
