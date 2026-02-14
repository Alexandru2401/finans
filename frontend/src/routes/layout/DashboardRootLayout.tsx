import DashboardMainNavigation from "../navigation/DashboardMainNavigation";
import { Outlet } from "react-router";
import ProfileBadge from "@/components/dashboard/ProfileBadge";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function DashboardRootLayout() {
  return (
    <TooltipProvider>
      <div className="flex h-screen overflow-hidden">
        <DashboardMainNavigation />

        <main className="flex-1 overflow-y-auto px-10 py-6">
          <div className="text-right">
            <ProfileBadge />
          </div>
          <Outlet />
        </main>
      </div>
    </TooltipProvider>
  );
}
