import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import PublicRootLayout from "./routes/layout/PublicRootLayout";
import DashboardRootLayout from "./routes/layout/DashboardRootLayout";
import PublicHomePage from "./pages/public/PublicHomePage";
import PublicAboutPage from "./pages/public/PublicAboutPage";
import ErrorPage from "./routes/Error";
import Login from "./pages/auth/Login";
import SignIn from "./pages/auth/Signin";
import SuccessStories from "./pages/public/blog/SuccessStories";
import WriteStory from "./pages/public/blog/WriteStory";
import DashboardHomePage from "./pages/dashboard/DashboardHomePage";
import BudgetPage from "./pages/dashboard/BudgetPage";
import CompleteProfilePage from "./pages/dashboard/CompleteProfilePage";
import ProfilePage from "./pages/dashboard/ProfilePage";
import AnalyticsPage from "./pages/dashboard/AnalyticsPage";
import UpgradePlansPage from "./pages/dashboard/UpgradePlansPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import PrivacyPolicy from "./pages/public/terms-and-policy/PrivacyPolicy";
import TermsAndConditions from "./pages/public/terms-and-policy/TermsAndConditions";
import PublicPricesPersonalPage from "./pages/public/PublicPricesPersonalPage";
import PersonalPayPage from "./pages/public/paypage/PersonalPayPage";
import { useEffect, useState } from "react";

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
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function auth() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/auth/get-user",
        );

        console.log("Raspuns:", response);

        const data = await response.json();

        console.log("Data", data);

        setUser(data);
      } catch (err) {
        console.log(err);
      }
    }

    auth();
  }, []);

  console.log("User la mount:", user?.email);

  return <RouterProvider router={router} />;
}

export default App;
