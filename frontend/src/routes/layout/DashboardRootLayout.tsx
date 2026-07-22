import ProfileBadge from "@/components/dashboard/budget/ProfileBadge";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BudgetStoreProvider } from "@/store/dashboardStore/BudgetStoreContext";
import { Outlet } from "react-router";
import DashboardMainNavigation from "../navigation/DashboardMainNavigation";

export default function DashboardRootLayout() {
  return (
    <BudgetStoreProvider>
      <TooltipProvider>
        <div className="flex h-screen overflow-hidden">
          <DashboardMainNavigation />

          <main className="flex-1 overflow-y-auto md:px-4 py-6">
            <div className="text-right">
              <ProfileBadge />
            </div>
            <Outlet />
          </main>
        </div>
      </TooltipProvider>
    </BudgetStoreProvider>
  );
}
