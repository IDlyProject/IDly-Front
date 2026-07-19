// src/pages/AccountAction/hooks/useActionSession.js
import { useCallback, useEffect, useState } from "react";
import {
  getActionSession,
  createActionSession,
  sendActionSessionMessage,
} from "@/api/actionSession";

// recommendedActions 배열은 응답마다 통째로 교체되므로, 과거 메시지가 참조하는
// actionId가 최신 배열엔 없을 수 있다 (완료/변경되어 빠진 경우). id로 한 번 본
// 항목은 계속 조회 가능하도록 누적 맵으로 따로 들고 있는다.
function mergeActionsById(current, actions) {
  if (!actions?.length) return current;
  const next = { ...current };
  for (const action of actions) {
    next[action.id] = action;
  }
  return next;
}

// official_link 메시지는 자기 메타데이터에 링크 정보를 안 담고 있고, 그 시점의
// activeActionItemId(=recommendedActions[].externalCard)로 찾아야 한다. 그런데
// activeActionItemId는 세션 전체에서 하나뿐인 "현재값"이라 나중에 최신값으로 덮이므로,
// 메시지가 도착한 시점의 값을 메시지 자체에 같이 저장해서 나중에도 정확히 찾을 수 있게 한다.
function tagWithActionItem(msgs, actionItemId) {
  return (msgs ?? []).map((m) => ({ ...m, _actionItemId: actionItemId }));
}

function useActionSession(serviceAccountId) {
  const [session, setSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setStatus("loading");
      try {
        const existing = await getActionSession(serviceAccountId);
        const data = existing ?? (await createActionSession(serviceAccountId));
        if (cancelled) return;
        setSession({
          ...data,
          recommendedActionsById: mergeActionsById({}, data.recommendedActions),
        });
        setMessages(tagWithActionItem(data.messages, data.activeActionItemId));
        setStatus("ready");
      } catch (err) {
        if (!cancelled) {
          console.error("action-session load failed:", err);
          setStatus("error");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [serviceAccountId]);

  const applyUpdate = useCallback((update) => {
    setSession((prev) => ({
      ...prev,
      sessionId: update.sessionId,
      activeActionItemId: update.activeActionItemId,
      feedbackEnabled: update.feedbackEnabled,
      composerEnabled: update.composerEnabled,
      composerPlaceholder: update.composerPlaceholder,
      sessionStatus: update.sessionStatus,
      readOnly: update.readOnly,
      progress: update.progress,
      recommendedActions: update.recommendedActions,
      recommendedActionsById: mergeActionsById(
        prev?.recommendedActionsById,
        update.recommendedActions,
      ),
      completion: update.completion,
    }));
    setMessages((prev) => [
      ...prev,
      ...tagWithActionItem(
        update.userMessage ? [update.userMessage] : [],
        update.activeActionItemId,
      ),
      ...tagWithActionItem(update.assistantMessages, update.activeActionItemId),
    ]);
  }, []);

  const send = useCallback(
    async (payload) => {
      if (!session?.sessionId || sending) return;
      setSending(true);
      setSendError("");
      try {
        const update = await sendActionSessionMessage(serviceAccountId, {
          sessionId: session.sessionId,
          ...payload,
        });
        applyUpdate(update);
      } catch (err) {
        console.error("action-session send failed:", err);
        setSendError("메시지 전송에 실패했어요. 다시 시도해주세요.");
      } finally {
        setSending(false);
      }
    },
    [serviceAccountId, session, sending, applyUpdate],
  );

  const selectAction = useCallback(
    (actionItemId) => send({ type: "action_select", actionItemId }),
    [send],
  );
  const confirmDone = useCallback(
    () => send({ type: "feedback", feedbackValue: "completed" }),
    [send],
  );
  const confirmFail = useCallback(
    () => send({ type: "feedback", feedbackValue: "failed" }),
    [send],
  );
  const sendFailureReason = useCallback(
    (message) => send({ type: "failure_reason", message }),
    [send],
  );

  return {
    session,
    messages,
    status,
    sending,
    sendError,
    selectAction,
    confirmDone,
    confirmFail,
    sendFailureReason,
  };
}

export default useActionSession;
