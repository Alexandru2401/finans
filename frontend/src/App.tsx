import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import PublicRootLayout from "./routes/layout/PublicRootLayout";
import DashboardRootLayout from "./routes/layout/DashboardRootLayout";
import PublicHomePage from "./pages/public/PublicHomePage";
import PublicPricesPage from "./pages/public/PublicPricesPage";
import PublicAboutPage from "./pages/public/PublicAboutPage";
import ErrorPage from "./routes/Error";
import Login from "./pages/auth/Login";
import SignIn from "./pages/auth/Signin";
import SuccessStories from "./pages/public/blog/SuccessStories";
import WriteStory from "./pages/public/blog/WriteStory";

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
        path: "/prices",
        element: <PublicPricesPage />,
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
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
