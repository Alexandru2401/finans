import { Outlet } from "react-router";
import PublicMainNavigation from "../navigation/PublicMainNavigation";
import PublicFooter from "@/components/public/Footer";

export default function PublicRootLayout() {
  return (
    <>
      <PublicMainNavigation />
      <main className="max-w-250 flex justify-center mx-auto flex-col">
        <Outlet />
      </main>
      <PublicFooter />
    </>
  );
}
