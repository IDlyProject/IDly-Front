// src/pages/AccountAction/hooks/useChatFlow.js
import { useCallback, useState } from "react";

let idCounter = 0;
const uid = () => `m${idCounter++}`;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function useChatFlow(detail) {
  const actions = detail.actions ?? [];

  const [messages, setMessages] = useState(() => [
    {
      id: uid(),
      type: "warning-intro",
      badge: detail.chatBadge,
      text: detail.chatIntro,
    },
    { id: uid(), type: "action-list", actions },
  ]);
  const [doneIds, setDoneIds] = useState(() => new Set());
  const [failActionId, setFailActionId] = useState(null);
  const [inputEnabled, setInputEnabled] = useState(false);

  const appendMessage = useCallback((msg) => {
    setMessages((prev) => [...prev, { id: uid(), ...msg }]);
  }, []);

  const replaceMessage = useCallback((id, msg) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { id, ...msg } : m)));
  }, []);

  const showTyping = useCallback(async (delay = 700) => {
    const typingId = uid();
    setMessages((prev) => [...prev, { id: typingId, type: "typing" }]);
    await wait(delay);
    setMessages((prev) => prev.filter((m) => m.id !== typingId));
  }, []);

  const respondWithAction = useCallback(
    async (action, remainingAfter) => {
      await showTyping(700);
      appendMessage({ type: "link-card", action });
      if (action.ad) appendMessage({ type: "ad-strip", ad: action.ad });
      const tipText =
        remainingAfter === 1
          ? "완료하면 모든 보안 조치가 끝나요!"
          : "변경 완료 후 다시 돌아오시면, 나머지 조치도 도와드릴게요!";
      appendMessage({ type: "tip", text: tipText });
      appendMessage({ type: "options", actionId: action.id });
    },
    [appendMessage, showTyping],
  );

  const selectAction = useCallback(
    async (listMessageId, actionId) => {
      const action = actions.find((a) => a.id === actionId);
      if (!action) return;
      replaceMessage(listMessageId, { type: "user", text: action.name });
      await respondWithAction(action, actions.length - doneIds.size);
    },
    [actions, doneIds, replaceMessage, respondWithAction],
  );

  const confirmDone = useCallback(
    async (optionsMessageId, actionId) => {
      replaceMessage(optionsMessageId, {
        type: "user",
        text: "조치를 완료했어요 !",
      });

      const nextDoneIds = new Set(doneIds);
      nextDoneIds.add(actionId);
      setDoneIds(nextDoneIds);

      if (nextDoneIds.size === actions.length) {
        await showTyping(800);
        appendMessage({ type: "alldone-list", actions });
        await wait(500);
        await showTyping(600);
        appendMessage({ type: "celebrate" });
        await wait(400);
        await showTyping(500);
        appendMessage({ type: "cta-list" });
      } else {
        const remaining = actions.length - nextDoneIds.size;
        await showTyping(400);
        appendMessage({
          type: "text",
          text:
            remaining === 1
              ? "완료! 이제 마지막 하나만 남았어요."
              : `완료! 남은 조치 ${remaining}가지 같이 해요.`,
        });
        await wait(300);
        await showTyping(500);
        appendMessage({ type: "remaining-list", actions });
      }
    },
    [actions, appendMessage, doneIds, replaceMessage, showTyping],
  );

  const confirmFail = useCallback(
    async (optionsMessageId, actionId) => {
      replaceMessage(optionsMessageId, {
        type: "user",
        text: "조치하지 못했어요",
      });
      setFailActionId(actionId);
      await showTyping(600);
      appendMessage({
        type: "text",
        text: "어떤 부분이 막히셨나요? IDly와 다시 해봐요!",
      });
      setInputEnabled(true);
    },
    [appendMessage, replaceMessage, showTyping],
  );

  const sendMessage = useCallback(
    async (text) => {
      if (!text.trim() || !failActionId) return;
      appendMessage({ type: "user", text });
      setInputEnabled(false);

      const action = actions.find((a) => a.id === failActionId);
      setFailActionId(null);
      if (!action) return;

      await showTyping(600);
      appendMessage({ type: "text", text: action.help });
      await wait(300);
      await respondWithAction(action, actions.length - doneIds.size);
    },
    [
      actions,
      appendMessage,
      doneIds,
      failActionId,
      respondWithAction,
      showTyping,
    ],
  );

  return {
    messages,
    doneIds,
    inputEnabled,
    selectAction,
    confirmDone,
    confirmFail,
    sendMessage,
    totalActions: actions.length,
    doneCount: doneIds.size,
  };
}

export default useChatFlow;
