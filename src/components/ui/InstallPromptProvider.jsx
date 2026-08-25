/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { useInstallPrompt } from "@/hooks/useInstallPrompt";

const InstallPromptContext = createContext(null);

/**
 * beforeinstallprompt는 세션당 한 번만 오고 리스너가 없으면 놓친다.
 * 사용할 페이지에서 훅을 직접 부르면 그 페이지에 도달하기 전에 이벤트를
 * 놓칠 수 있으므로, 앱 루트에서 한 번만 구독해 값을 전역으로 공유한다.
 */
export function InstallPromptProvider({ children }) {
  const value = useInstallPrompt();
  return (
    <InstallPromptContext.Provider value={value}>
      {children}
    </InstallPromptContext.Provider>
  );
}

export function useInstallPromptContext() {
  const ctx = useContext(InstallPromptContext);
  if (!ctx) {
    throw new Error(
      "useInstallPromptContext는 InstallPromptProvider 안에서만 사용할 수 있어요.",
    );
  }
  return ctx;
}
