import { Link, useLocation } from "react-router";
import { PanelLeftOpen, Menu, X } from "lucide-react";
import { useState } from "react";
import { dashboardNavigation } from "@/components/dashboard/routes/DashboardNavigation";
import clsx from "clsx";

export default function DashboardMainNavigation() {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const renderNav = (showLabels: boolean, onNavigate?: () => void) => (
    <nav className="flex h-full flex-col md:justify-between px-3 py-6 text-sm">
      {dashboardNavigation.map((section, index) => (
        <ul key={index} className="flex flex-col gap-1">
          {section.items.map(({ label, to, icon: Icon }) => {
            const isActive = location.pathname === to;

            return (
              <li key={to}>
                <Link
                  to={to}
                  onClick={onNavigate}
                  className={clsx(
                    "flex items-center gap-3 rounded-md px-3 mr-2 md:mr-1 py-2 transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    isActive && "bg-accent text-accent-foreground",
                  )}
                >
                  {Icon && (
                    <Icon className="h-5 w-5 shrink-0 text-muted-foreground" />
                  )}

                  {showLabels && (
                    <span className="truncate font-medium">{label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      ))}
    </nav>
  );

  return (
    <>
      {/* Buton hamburger - doar pe mobile */}
      <button
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
        className="absolute top-6 left-6 z-30 md:hidden"
      >
        <Menu size={26} />
      </button>

      {/* Sidebar desktop - logica ta neschimbata */}
      <aside
        className={clsx(
          "relative h-dvh hidden md:block border-r bg-background ",
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

        {renderNav(open)}
      </aside>

      {/* Backdrop drawer - mobile */}
      <div
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
        className={clsx(
          "fixed inset-0 z-40 bg-black/50 md:hidden transition-opacity duration-300",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* Drawer propriu-zis - mobile */}
      <aside
        className={clsx(
          "fixed left-0 top-0 z-50 h-dvh w-64 border-r bg-background md:hidden transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Close button */}
        <button
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
          className={`bg-accent absolute top-2 -right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full hover:bg-accent transition-colors ${mobileOpen ? "" : "hidden"}`}
        >
          <X className="h-4 w-4" />
        </button>

        {renderNav(true, () => setMobileOpen(false))}
      </aside>
    </>
  );
}
