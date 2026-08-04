import { Outlet } from "react-router";
import PublicMainNavigation from "../routes/navigation/PublicMainNavigation";
import PublicFooter from "@/components/public/Footer";

export default function PublicRootLayout() {
  return (
    <>
      <PublicMainNavigation />

      <main className="relative max-w-7xl flex justify-center mx-auto flex-col">
        <Outlet />
      </main>

      <PublicFooter />
    </>
  );
}
