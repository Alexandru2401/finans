import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PublicMainNavigation() {
  return (
    <nav className="flex w-full justify-between md:justify-around p-8 md:py-8 text-xl">
      <div>logo</div>
      <ul className="hidden md:flex gap-4">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/about">
          <li>About</li>
        </Link>
        <Link to="/prices">
          <li>Prices</li>
        </Link>
      </ul>

      <Menu className="sm:hidden" />
      <ul className="hidden sm:flex gap-4">
        <Link to="/signin">
          <Button variant="ghost" className="cursor-pointer">
            Create Account
          </Button>
        </Link>
        <Link to="/login">
          <Button className="cursor-pointer">Login</Button>
        </Link>
      </ul>
    </nav>
  );
}
