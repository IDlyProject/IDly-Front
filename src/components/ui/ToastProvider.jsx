/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useState } from "react";

const ToastContext = createContext(null);
const TOAST_DURATION_MS = 2600;

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message) => {
    const id = ++idCounter;
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, TOAST_DURATION_MS);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-[max(24px,env(safe-area-inset-bottom))] z-999 flex flex-col items-center gap-2 px-4">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto max-w-sm rounded-full bg-[#212125]/92 px-4 py-2.5 text-center text-[13px] font-bold text-white shadow-lg"
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const showToast = useContext(ToastContext);
  if (!showToast) {
    throw new Error("useToast는 ToastProvider 안에서만 사용할 수 있어요.");
  }
  return showToast;
}
