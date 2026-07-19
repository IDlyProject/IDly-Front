// src/App.jsx
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes/router";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { ToastProvider } from "@/components/ui/ToastProvider";

function App() {
  return (
    <ToastProvider>
      <Suspense fallback={<LoadingScreen />}>
        <RouterProvider router={router} />
      </Suspense>
    </ToastProvider>
  );
}

export default App;
