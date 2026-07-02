// src/routes/router.jsx
import { ROUTES } from "@/constants/routes";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "@/components/layouts/MainLayout";
import Splash from "@/pages/Splash";
import Onboarding from "@/pages/Onboarding";
import Home from "@/pages/Home";
import Organize from "@/pages/Organize";
import My from "@/pages/My";
import AccountManagement from "@/pages/AccountDetail";
import SecurityAction from "@/pages/AccountDetail/SecurityAction";
import SecurityMail from "@/pages/AccountDetail/SecurityAction/SecurityMail";

export const router = createBrowserRouter([
  { path: ROUTES.SPLASH, element: <Splash /> },
  { path: ROUTES.ONBOARDING, element: <Onboarding /> },

  {
    path: ROUTES.ACCOUNT_DETAIL,
    element: (
      <ProtectedRoute>
        <AccountManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.SECURITY_ACTION,
    element: (
      <ProtectedRoute>
        <SecurityAction />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.SECURITY_MAIL,
    element: (
      <ProtectedRoute>
        <SecurityMail />
      </ProtectedRoute>
    ),
  },

  {
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: ROUTES.HOME, element: <Home /> },
      { path: ROUTES.ORGANIZE, element: <Organize /> },
      { path: ROUTES.MY, element: <My /> },
    ],
  },
]);
