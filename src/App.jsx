import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes/router";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { ToastProvider } from "@/components/ui/ToastProvider";
import { InstallPromptProvider } from "@/components/ui/InstallPromptProvider";

function App() {
  return (
    <ToastProvider>
      <InstallPromptProvider>
        <Suspense fallback={<LoadingScreen />}>
          <RouterProvider router={router} />
        </Suspense>
      </InstallPromptProvider>
    </ToastProvider>
  );
}

export default App;
