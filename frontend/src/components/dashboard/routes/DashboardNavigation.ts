import {
  ChartNoAxesCombined,
  CircleFadingArrowUp,
  LayoutDashboard,
  PiggyBank,
  UserRound,
  UserRoundPen
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

export type DashboardNavItem = {
  label: string;
  to: string;
  icon?: LucideIcon;
};

export type DashboardNavSection = {
  items: DashboardNavItem[];
  title?: string;
};

export const dashboardNavigation: DashboardNavSection[] = [
  {
    items: [
      {
        label: "Overview",
        to: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "Budget",
        to: "/dashboard/budget",
        icon: PiggyBank,
      },
    ],
    title: "Dashobard",
  },
  {
    items: [
      {
        label: "Transactions",
        to: "/dashboard/transactions",
        icon: UserRoundPen,
      },
      {
        label: "Analytics",
        to: "/dashboard/analytics",
        icon: ChartNoAxesCombined,
      },
    ],
    title: "Budget info",
  },
  {
    items: [
      {
        label: "Upgrade to pro",
        to: "/dashboard/upgrade-plans",
        icon: CircleFadingArrowUp,
      },
      {
        label: "Profile",
        to: "/dashboard/profile",
        icon: UserRound,
      },
    ],
    title: "Settings",
  },
];
