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
import Analysis from "@/pages/Analysis";
import Home from "@/pages/Home";
import Organize from "@/pages/Organize";
import My from "@/pages/My";
import AccountManagement from "@/pages/AccountManagement";
import DormantAccounts from "@/pages/DormantAccounts";
import NotificationSettings from "@/pages/NotificationSettings";
import Withdraw from "@/pages/Withdraw";
import WithdrawReason from "@/pages/WithdrawReason";
import AccountDetail from "@/pages/AccountDetail";
import AccountAction from "@/pages/AccountAction";
import AuthCallback from "@/pages/AuthCallback";
import NotificationCenter from "../pages/NotificationCenter";
import SecurityReport from "../pages/SecurityReport";
import SecurityAssistant from "../pages/SecurityAssistant";

export const router = createBrowserRouter([
  { path: ROUTES.SPLASH, element: <Splash /> },
  { path: ROUTES.AUTH_CALLBACK, element: <AuthCallback /> },
  { path: ROUTES.ONBOARDING_LOGIN, element: <Login /> },
  {
    path: ROUTES.ONBOARDING_CONSENT,
    element: (
      <ProtectedRoute>
        <Consent />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.ONBOARDING_ACCOUNT_CONFIRM,
    element: (
      <ProtectedRoute>
        <AccountConfirm />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.ONBOARDING_ACCOUNT_COMPLETE,
    element: (
      <ProtectedRoute>
        <AccountComplete />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.ONBOARDING_ADD_ACCOUNT,
    element: (
      <ProtectedRoute>
        <AddAccount />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.ONBOARDING_COMPLETE,
    element: (
      <ProtectedRoute>
        <RegistrationComplete />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.NOTIFICATION,
    element: (
      <ProtectedRoute>
        <NotificationCenter />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.ACCOUNT_MANAGEMENT,
    element: (
      <ProtectedRoute>
        <AccountManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.DORMANT_ACCOUNTS,
    element: (
      <ProtectedRoute>
        <DormantAccounts />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.NOTIFICATION_SETTINGS,
    element: (
      <ProtectedRoute>
        <NotificationSettings />
      </ProtectedRoute>
    ),
  },

  {
    path: ROUTES.ANALYSIS,
    element: (
      <ProtectedRoute>
        <Analysis />
      </ProtectedRoute>
    ),
  },

  {
    path: "/account/:accountId",
    element: (
      <ProtectedRoute>
        <AccountDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: "/account/:accountId/action",
    element: (
      <ProtectedRoute>
        <AccountAction />
      </ProtectedRoute>
    ),
  },

  {
    path: ROUTES.SECURITY_REPORT,
    element: (
      <ProtectedRoute>
        <SecurityReport />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.SECURITY_ASSISTANT,
    element: (
      <ProtectedRoute>
        <SecurityAssistant />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.WITHDRAW,
    element: (
      <ProtectedRoute>
        <Withdraw />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.WITHDRAW_REASON,
    element: (
      <ProtectedRoute>
        <WithdrawReason />
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
