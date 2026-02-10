import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Moon,
  Sun,
  Bell,
  CreditCard,
  HelpCircle,
  LogOut,
  User,
  Settings,
  Crown,
} from "lucide-react";

export default function ProfileBadge() {
  const [openProfile, setOpenProfile] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenProfile(false);
      }
    }

    if (openProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openProfile]);

  return (
    <div className="flex justify-end px-5 relative" ref={dropdownRef}>
      <Avatar
        className="cursor-pointer ring-2 ring-offset-2 ring-transparent hover:ring-primary transition-all"
        onClick={() => setOpenProfile(!openProfile)}
      >
        <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      {openProfile && (
        <Card className="absolute top-0 right-0 mt-16 w-80 shadow-xl border-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="User avatar"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-base">John Doe</h3>
                <p className="text-sm text-muted-foreground">
                  john.doe@example.com
                </p>
              </div>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="p-0">
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Profile Settings
                </h4>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="flex items-center gap-3">
                  {darkMode ? (
                    <Moon className="h-4 w-4 text-primary" />
                  ) : (
                    <Sun className="h-4 w-4 text-primary" />
                  )}
                  <Label
                    htmlFor="dark-mode"
                    className="cursor-pointer font-normal"
                  >
                    Dark mode
                  </Label>
                </div>
                <Switch
                  id="dark-mode"
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="flex items-center gap-3">
                  <Bell className="h-4 w-4 text-primary" />
                  <Label
                    htmlFor="notifications"
                    className="cursor-pointer font-normal"
                  >
                    Notifications
                  </Label>
                </div>
                <Switch
                  id="notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
            </div>

            <Separator />

            <div className="p-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
                <div className="flex items-center gap-3">
                  <Crown className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Current Plan</p>
                    <p className="text-xs text-muted-foreground">Basic</p>
                  </div>
                </div>
                <Link to="/change-plans">
                  <Button variant="outline" size="sm" className="text-xs">
                    <CreditCard className="h-3 w-3 mr-1" />
                    Upgrade
                  </Button>
                </Link>
              </div>
            </div>

            <Separator />

            <div className="p-2">
              <Link to="/dashboard/profile">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 hover:bg-muted"
                  onClick={() => setOpenProfile(false)}
                >
                  <User className="h-4 w-4" />
                  View Profile
                </Button>
              </Link>

              <Link to="/help">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 hover:bg-muted"
                  onClick={() => setOpenProfile(false)}
                >
                  <HelpCircle className="h-4 w-4" />
                  Get Help
                </Button>
              </Link>

              <Separator className="my-2" />

              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-red-600 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
              >
                <LogOut className="h-4 w-4" />
                Log out
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
