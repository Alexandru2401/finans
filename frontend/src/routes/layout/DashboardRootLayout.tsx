import DashboardMainNavigation from "../navigation/DashboardMainNavigation";
import { Outlet } from "react-router";

export default function DashboardRootLayout() {
  return (
    <div className="flex min-h-screen">
      <DashboardMainNavigation />
      <main className="flex-1 mx-10">
        <Outlet />
      </main>
    </div>
  );
}
