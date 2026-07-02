// src/routes/router.jsx
import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "@/components/layouts/MainLayout";

import Splash from "@/pages/Splash";
import Login from "@/pages/Onboarding/Login";
import Consent from "@/pages/Onboarding/Consent";
import AccountConfirm from "@/pages/Onboarding/AccountConfirm";
import AccountComplete from "@/pages/Onboarding/AccountComplete";
import AddAccount from "@/pages/Onboarding/AddAccount";
import RegistrationComplete from "@/pages/Onboarding/RegistrationComplete";

import Home from "@/pages/Home";
import Organize from "@/pages/Organize";
import My from "@/pages/My";
import AccountManagement from "@/pages/AccountDetail";
import SecurityAction from "@/pages/AccountDetail/SecurityAction";
import SecurityMail from "@/pages/AccountDetail/SecurityAction/SecurityMail";

export const router = createBrowserRouter([
  { path: ROUTES.SPLASH, element: <Splash /> },

  { path: ROUTES.ONBOARDING_LOGIN, element: <Login /> },
  { path: ROUTES.ONBOARDING_CONSENT, element: <Consent /> },
  { path: ROUTES.ONBOARDING_ACCOUNT_CONFIRM, element: <AccountConfirm /> },
  { path: ROUTES.ONBOARDING_ACCOUNT_COMPLETE, element: <AccountComplete /> },
  { path: ROUTES.ONBOARDING_ADD_ACCOUNT, element: <AddAccount /> },
  { path: ROUTES.ONBOARDING_COMPLETE, element: <RegistrationComplete /> },

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
