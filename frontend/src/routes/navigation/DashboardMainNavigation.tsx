import { Link } from "react-router";
import { PanelLeftOpen } from "lucide-react";
import { useState } from "react";

export default function DashboardMainNavigation() {
  const [open, setOpen] = useState(true);

  return (
    <aside className={`bg-gray-400 p-5 ${open ? "w-64" : "w-16"}`}>
      <PanelLeftOpen onClick={() => setOpen((prev) => !prev)} />

      <nav className="flex flex-col justify-between h-full text-lg">
        <ul className="flex gap-4 flex-col">
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>

          <li>
            <Link to="/dashboard/budget">Budget</Link>
          </li>
        </ul>

        <ul className="flex gap-4 flex-col">
          <li>
            <Link to="/dashboard/complete-profile">Complete Profile</Link>
          </li>
          <li>
            <Link to="/dashboard/profile">Profile</Link>
          </li>
          <li>
            <Link to="/dashboard/analitics">Analytics</Link>
          </li>
        </ul>

        <ul className="flex gap-4 flex-col">
          <li>
            <Link to="/dashboard/plans">Upgrade to pro</Link>
          </li>
          <li>
            <Link to="/dashboard/settings">Settings</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
