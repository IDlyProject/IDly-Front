// src/pages/AccountAction/hooks/useActionSession.js
import { useCallback, useEffect, useState } from "react";
import {
  getActionSession,
  createActionSession,
  sendActionSessionMessage,
} from "@/api/actionSession";

function useActionSession(serviceAccountId) {
  const [session, setSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [sending, setSending] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setStatus("loading");
      try {
        const existing = await getActionSession(serviceAccountId);
        const data = existing ?? (await createActionSession(serviceAccountId));
        if (cancelled) return;
        setSession(data);
        setMessages(data.messages ?? []);
        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
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
      completion: update.completion,
    }));
    setMessages((prev) => [
      ...prev,
      ...(update.userMessage ? [update.userMessage] : []),
      ...(update.assistantMessages ?? []),
    ]);
  }, []);

  const send = useCallback(
    async (payload) => {
      if (!session?.sessionId || sending) return;
      setSending(true);
      try {
        const update = await sendActionSessionMessage(serviceAccountId, {
          sessionId: session.sessionId,
          ...payload,
        });
        applyUpdate(update);
      } finally {
        setSending(false);
      }
    },
    [serviceAccountId, session?.sessionId, sending, applyUpdate],
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
    selectAction,
    confirmDone,
    confirmFail,
    sendFailureReason,
  };
}

export default useActionSession;
