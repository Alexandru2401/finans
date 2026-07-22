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
          {/* test test test */}
          <main className="flex-1 overflow-y-auto px-4 py-6 bg-gray-100">
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
