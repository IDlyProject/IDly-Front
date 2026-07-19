import { useCallback, useEffect, useState } from "react";
import {
  getActionSession,
  createActionSession,
  sendActionSessionMessage,
} from "@/api/actionSession";

function mergeActionsById(current, actions) {
  if (!actions?.length) return current;
  const next = { ...current };
  for (const action of actions) {
    next[action.id] = action;
  }
  return next;
}

function tagWithActionItem(msgs, actionItemId) {
  return (msgs ?? []).map((m) => ({ ...m, _actionItemId: actionItemId }));
}

function useActionSession(serviceAccountId) {
  const [session, setSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("loading");
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
