/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "@/components/layouts/MainLayout";

import Splash from "@/pages/Splash";
import Login from "@/pages/Onboarding/Login";
import AuthCallback from "@/pages/AuthCallback";

const Consent = lazy(() => import("@/pages/Onboarding/Consent"));
const AccountConfirm = lazy(() => import("@/pages/Onboarding/AccountConfirm"));
const AccountComplete = lazy(
  () => import("@/pages/Onboarding/AccountComplete"),
);
const AddAccount = lazy(() => import("@/pages/Onboarding/AddAccount"));
const RegistrationComplete = lazy(
  () => import("@/pages/Onboarding/RegistrationComplete"),
);
const Analysis = lazy(() => import("@/pages/Analysis"));
const Home = lazy(() => import("@/pages/Home"));
const Organize = lazy(() => import("@/pages/Organize"));
const My = lazy(() => import("@/pages/My"));
const AccountManagement = lazy(() => import("@/pages/AccountManagement"));
const DormantAccounts = lazy(() => import("@/pages/DormantAccounts"));
const NotificationSettings = lazy(
  () => import("@/pages/NotificationSettings"),
);
const Withdraw = lazy(() => import("@/pages/Withdraw"));
const WithdrawReason = lazy(() => import("@/pages/WithdrawReason"));
const AccountDetail = lazy(() => import("@/pages/AccountDetail"));
const AccountAction = lazy(() => import("@/pages/AccountAction"));
const NotificationCenter = lazy(() => import("@/pages/NotificationCenter"));
const SecurityReport = lazy(() => import("@/pages/SecurityReport"));
const SecurityAssistant = lazy(() => import("@/pages/SecurityAssistant"));
const NotFound = lazy(() => import("@/pages/NotFound"));

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

  { path: "*", element: <NotFound /> },
]);
