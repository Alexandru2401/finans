import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import Login from "./pages/auth/Login";
import SignIn from "./pages/auth/Signin";
import AnalyticsPage from "./pages/dashboard/AnalyticsPage";
import BudgetPage from "./pages/dashboard/BudgetPage";
import CompleteProfilePage from "./pages/dashboard/CompleteProfilePage";
import DashboardHomePage from "./pages/dashboard/DashboardHomePage";
import ProfilePage from "./pages/dashboard/ProfilePage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import UpgradePlansPage from "./pages/dashboard/UpgradePlansPage";
import PublicAboutPage from "./pages/public/PublicAboutPage";
import PublicHomePage from "./pages/public/PublicHomePage";
import PublicPricesPersonalPage from "./pages/public/PublicPricesPersonalPage";
import SuccessStories from "./pages/public/blog/SuccessStories";
import WriteStory from "./pages/public/blog/WriteStory";
import PersonalPayPage from "./pages/public/paypage/PersonalPayPage";
import PrivacyPolicy from "./pages/public/terms-and-policy/PrivacyPolicy";
import TermsAndConditions from "./pages/public/terms-and-policy/TermsAndConditions";
import ErrorPage from "./routes/Error";
import DashboardRootLayout from "./routes/layout/DashboardRootLayout";
import PublicRootLayout from "./routes/layout/PublicRootLayout";

import { Toaster } from "@/components/ui/sonner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <PublicHomePage />,
      },
      {
        path: "/about",
        element: <PublicAboutPage />,
      },
      {
        path: "/prices/personal",
        element: <PublicPricesPersonalPage />,
      },
      {
        path: "/blog",
        element: <Outlet />,
        children: [
          {
            path: "success-stories",
            element: <SuccessStories />,
          },
          {
            path: "write-story",
            element: <WriteStory />,
          },
        ],
      },

      {
        path: "/paypage/personal",
        element: <PersonalPayPage />,
      },
      {
        path: "/terms-and-services",
        element: <TermsAndConditions />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },

  // ACESTE RUTE VOR FII PROTEJATE
  {
    path: "/dashboard",
    element: <DashboardRootLayout />,
    children: [
      {
        index: true,
        element: <DashboardHomePage />,
      },
      {
        path: "/dashboard/budget",
        element: <BudgetPage />,
      },
      {
        path: "/dashboard/complete-profile",
        element: <CompleteProfilePage />,
      },
      {
        path: "/dashboard/profile",
        element: <ProfilePage />,
      },
      {
        path: "/dashboard/analytics",
        element: <AnalyticsPage />,
      },
      {
        path: "/dashboard/upgrade-plans",
        element: <UpgradePlansPage />,
      },
      {
        path: "/dashboard/settings",
        element: <SettingsPage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
