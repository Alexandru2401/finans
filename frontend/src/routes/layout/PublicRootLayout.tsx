import { Outlet } from "react-router";
import PublicMainNavigation from "../navigation/PublicMainNavigation";

export default function PublicRootLayout() {
  return (
    <>
      <PublicMainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}
