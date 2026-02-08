import DashboardMainNavigation from "../navigation/DashboardMainNavigation";
import { Outlet } from "react-router";

export default function DashboardRootLayout() {
  return (
    <>
      <DashboardMainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}
