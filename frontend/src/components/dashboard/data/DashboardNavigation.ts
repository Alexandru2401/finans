import {
  LayoutDashboard,
  PiggyBank,
  UserRoundPen,
  UserRound,
  ChartNoAxesCombined,
  Settings,
  CircleFadingArrowUp,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

export type DashboardNavItem = {
  label: string;
  to: string;
  icon?: LucideIcon;
};

export type DashboardNavSection = {
  items: DashboardNavItem[];
};

export const dashboardNavigation: DashboardNavSection[] = [
  {
    items: [
      {
        label: "Dashboard",
        to: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "Budget",
        to: "/dashboard/budget",
        icon: PiggyBank,
      },
    ],
  },
  {
    items: [
      {
        label: "Complete Profile",
        to: "/dashboard/complete-profile",
        icon: UserRoundPen,
      },
      {
        label: "Profile",
        to: "/dashboard/profile",
        icon: UserRound,
      },
      {
        label: "Analytics",
        to: "/dashboard/analytics",
        icon: ChartNoAxesCombined,
      },
    ],
  },
  {
    items: [
      {
        label: "Upgrade to pro",
        to: "/dashboard/upgrade-plans",
        icon: CircleFadingArrowUp,
      },
      {
        label: "Settings",
        to: "/dashboard/settings",
        icon: Settings,
      },
    ],
  },
];
