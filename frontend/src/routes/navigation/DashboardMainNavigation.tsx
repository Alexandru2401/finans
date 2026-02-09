import { Link, useLocation } from "react-router";
import { PanelLeftOpen } from "lucide-react";
import { useState } from "react";
import { dashboardNavigation } from "@/components/dashboard/data/DashboardNavigation";
import clsx from "clsx";

export default function DashboardMainNavigation() {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  return (
    <aside
      className={clsx(
        "relative h-screen border-r bg-background transition-all duration-300",
        open ? "w-64" : "w-16",
      )}
    >
      {/* Toggle button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="absolute cursor-pointer top-4 -right-5 z-10 flex h-8 w-8 items-center justify-center rounded-full border bg-background shadow hover:bg-accent transition-colors"
        aria-label="Toggle sidebar"
      >
        <PanelLeftOpen className="h-4 w-4" />
      </button>

      <nav className="flex h-full flex-col justify-between px-3 py-6 text-sm">
        {dashboardNavigation.map((section, index) => (
          <ul key={index} className="flex flex-col gap-1">
            {section.items.map(({ label, to, icon: Icon }) => {
              const isActive = location.pathname === to;

              return (
                <li key={to}>
                  <Link
                    to={to}
                    className={clsx(
                      "flex items-center gap-3 rounded-md px-3 py-2 transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      isActive && "bg-accent text-accent-foreground",
                    )}
                  >
                    {Icon && (
                      <Icon className="h-5 w-5 shrink-0 text-muted-foreground" />
                    )}

                    {open && (
                      <span className="truncate font-medium">{label}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        ))}
      </nav>
    </aside>
  );
}
