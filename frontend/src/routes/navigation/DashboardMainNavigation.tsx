import { Link } from "react-router";
import { PanelLeftOpen } from "lucide-react";
import { useState } from "react";
import { dashboardNavigation } from "@/components/dashboard/data/DashboardNavigation";

export default function DashboardMainNavigation() {
  const [open, setOpen] = useState(true);

  return (
    <aside
      className={`bg-gray-400 p-5 relative ${open ? "w-64" : "w-16"} transition-width duration-300`}
    >
      <PanelLeftOpen
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer w-10 h-10 mb-4 absolute top-2 right-0 translate-x-5 bg-slate-100 p-2 rounded-2xl"
      />

      <nav className="flex flex-col justify-between h-full text-lg">
        {dashboardNavigation.map((section, index) => (
          <ul key={index} className="flex gap-4 flex-col mt-10">
            {section.items.map(({ label, to, icon: Icon }) => (
              <li key={to}>
                <Link to={to} className="flex gap-2 items-center">
                  {Icon && <Icon className="h-5 w-5 shrink-0" />}
                  {open && <span>{label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </nav>
    </aside>
  );
}
