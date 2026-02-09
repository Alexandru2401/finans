import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useState } from "react";

type SubmenuKey = "blog" | "prices";

export default function PublicMainNavigation() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<Record<SubmenuKey, boolean>>({
    blog: false,
    prices: false,
  });

  function handleMenuToggle() {
    setOpenMenu((prev) => !prev);
  }

  function handleSubMenuToggle(identifier: SubmenuKey) {
    setOpenSubMenu((prev) => ({
      ...prev,
      [identifier]: !prev[identifier],
    }));
  }

  return (
    <nav className="flex w-full justify-between md:justify-around p-8 md:py-8 text-xl relative">
      <div>logo</div>

      {/* Desktop Navigation */}
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link to="/">Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link to="/#about">About</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Doar de test */}
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link to="/dashboard">Dashboard</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link to="/dashboard">Challenges</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem className="relative">
            <NavigationMenuTrigger>Prices</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-96 p-4">
                <ListItem href="/prices/personal" title="Personal use">
                  Unlock the full potential and control for your finances.
                </ListItem>
                <ListItem href="/prices/enterprise" title="Enterprise level">
                  Manage your business finances with ease and confidence.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem className="relative">
            <NavigationMenuTrigger>Blog</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-96 p-4">
                <ListItem
                  href="/blog/write-story"
                  title="Become part of our community"
                >
                  Tell us about your experience with our product and share your
                  story.
                </ListItem>
                <ListItem href="/blog/success-stories" title="Success stories">
                  People changing their financial lives with our product.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem className="relative">
            <NavigationMenuTrigger>Info </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-96 p-4">
                <ListItem
                  href="/info/terms-and-services"
                  title="Read our terms and services"
                >
                  Terms and services
                </ListItem>
                <ListItem
                  href="/info/privacy-policy"
                  title="Read our privacy policy"
                >
                  Privacy Policy
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Desktop Auth Buttons */}
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

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden cursor-pointer"
        onClick={handleMenuToggle}
        aria-label="Toggle menu"
      >
        {openMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Menu Dropdown */}
      {openMenu && (
        <div className="absolute top-full left-0 w-full bg-background border-b shadow-lg md:hidden z-50">
          <div className="flex flex-col p-6 gap-4">
            <Link
              to="/"
              className="text-sm font-medium hover:text-primary transition-colors py-2 border-b"
              onClick={() => setOpenMenu(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium hover:text-primary transition-colors py-2 border-b"
              onClick={() => setOpenMenu(false)}
            >
              About
            </Link>
            {/* Prices Section */}
            <div className="border-b pb-4">
              <p
                className="text-sm font-semibold mb-2 text-muted-foreground cursor-pointer"
                onClick={() => handleSubMenuToggle("prices")}
              >
                Prices
              </p>
              {openSubMenu.prices && (
                <div className="flex flex-col gap-2 pl-4">
                  <Link
                    to="/prices/personal"
                    className="text-sm hover:text-primary transition-colors"
                    onClick={() => setOpenMenu(false)}
                  >
                    Personal use
                  </Link>
                  <Link
                    to="/prices/enterprise"
                    className="text-sm hover:text-primary transition-colors"
                    onClick={() => setOpenMenu(false)}
                  >
                    Enterprise level
                  </Link>
                </div>
              )}
            </div>
            {/* Blog Section */}
            <div className="border-b pb-4">
              <p
                className="text-sm font-semibold mb-2 text-muted-foreground cursor-pointer"
                onClick={() => handleSubMenuToggle("blog")}
              >
                Blog
              </p>
              {openSubMenu.blog && (
                <div className="flex flex-col gap-2 pl-4">
                  <Link
                    to="/blog/write-story"
                    className="text-sm hover:text-primary transition-colors"
                    onClick={() => setOpenMenu(false)}
                  >
                    Write your story
                  </Link>
                  <Link
                    to="/blog/success-stories"
                    className="text-sm hover:text-primary transition-colors"
                    onClick={() => setOpenMenu(false)}
                  >
                    Success stories
                  </Link>
                </div>
              )}
            </div>
            {/* Auth Buttons */}
            <div className="flex flex-col gap-3 mt-4 pt-4 border-t sm:hidden">
              <Button asChild variant="outline" className="w-full">
                <Link to="/signin" onClick={() => setOpenMenu(false)}>
                  Create Account
                </Link>
              </Button>
              <Button asChild className="w-full">
                <Link to="/login" onClick={() => setOpenMenu(false)}>
                  Login
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          to={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
