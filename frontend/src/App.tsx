import { createBrowserRouter, RouterProvider } from "react-router";
import PublicRootLayout from "./routes/layout/PublicRootLayout";
import DashboardRootLayout from "./routes/layout/DashboardRootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRootLayout />,
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
