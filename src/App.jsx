import { Suspense, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes/router";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { ToastProvider } from "@/components/ui/ToastProvider";
import { InstallPromptProvider } from "@/components/ui/InstallPromptProvider";
import { initGA, trackPageView } from "@/lib/ga";

function App() {
  useEffect(() => {
    initGA();
    trackPageView(
      router.state.location.pathname + router.state.location.search,
    );

    return router.subscribe((state) => {
      trackPageView(state.location.pathname + state.location.search);
    });
  }, []);

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
