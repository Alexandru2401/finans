import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  ChevronRight,
  Mail,
  Lock,
  RefreshCw,
  Trash2,
  PlusCircle,
  Coins,
  Star,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const user = {
  username: "alex.doe",
  email: "alex.doe@email.com",
  plan: "Pro",
  memberSince: "March 2023",
  currency: "USD",
};

type ActionId =
  | "currency"
  | "plan"
  | "email"
  | "password"
  | "add-account"
  | "reset"
  | "delete"
  | null;

const actions = [
  {
    id: "currency",
    label: "Change Currency",
    icon: Coins,
    danger: false,
    description: "Update your preferred display currency",
  },
  {
    id: "plan",
    label: "Change Plan",
    icon: Star,
    danger: false,
    description: "Upgrade or downgrade your subscription",
  },
  {
    id: "email",
    label: "Change Email",
    icon: Mail,
    danger: false,
    description: "Update your login email address",
  },
  {
    id: "password",
    label: "Change Password",
    icon: Lock,
    danger: false,
    description: "Keep your account secure",
  },
  {
    id: "add-account",
    label: "Add an Account",
    icon: PlusCircle,
    danger: false,
    description: "Link a new bank or wallet account",
  },
  {
    id: "reset",
    label: "Reset Data",
    icon: RefreshCw,
    danger: true,
    description: "Permanently delete all your transactions",
  },
  {
    id: "delete",
    label: "Delete Account",
    icon: Trash2,
    danger: true,
    description: "Permanently remove your account",
  },
] as const;

interface profileBtnProps {
  label: string;
}

function ProfileBtn({ label }: profileBtnProps) {
  return (
    <Button
      size="sm"
      className="bg-lime-500 hover:bg-lime-600 text-white font-semibold cursor-pointer"
    >
      {label}
    </Button>
  );
}

export default function ProfilePage() {
  const [openSection, setOpenSection] = useState<ActionId>(null);

  const toggle = (id: ActionId) =>
    setOpenSection((prev) => (prev === id ? null : id));

  return (
    <div className="py-8 px-4 md:px-8 max-w-7xl flex items-center justify-center">
      <div className="p-10 w-2xl border border-slate-200 rounded-2xl bg-white shadow-sm flex flex-col gap-4">
        {/* ── Header ── */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-lime-400 to-emerald-500 flex items-center justify-center text-2xl font-bold text-white shadow-sm">
                {user.username[0].toUpperCase()}
              </div>
              <span className="absolute bottom-0 -right-1 bg-white border border-slate-200 rounded-full p-0.5 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-lime-500" />
              </span>
            </div>
            <div>
              <p className="text-lg font-semibold text-zinc-900">
                @{user.username}
              </p>
              <Badge
                variant="outline"
                className="border-lime-500/40 text-lime-600 bg-lime-50 text-xs mt-1"
              >
                ⭐ {user.plan} Plan
              </Badge>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-400 cursor-pointer hover:text-red-500 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>

        {/* ── Account Info ── */}
        <Card className="bg-slate-50 border-slate-200 shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Account Info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "Email", value: user.email },
              { label: "Current Plan", value: user.plan, highlight: true },
              { label: "Member Since", value: user.memberSince },
              { label: "Currency", value: user.currency },
            ].map(({ label, value, highlight }, i, arr) => (
              <div key={label}>
                <div className="flex items-center justify-between py-1">
                  <span className="text-sm text-zinc-500">{label}</span>
                  <span
                    className={cn(
                      "text-sm font-medium",
                      highlight ? "text-lime-600" : "text-zinc-900",
                    )}
                  >
                    {value}
                  </span>
                </div>
                {i < arr.length - 1 && <Separator className="bg-slate-200" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* ── Settings ── */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-3">
            Settings
          </p>
          <div className="space-y-2">
            {actions.map(({ id, label, description, icon: Icon, danger }) => (
              <Collapsible
                key={id}
                open={openSection === id}
                onOpenChange={() => toggle(id as ActionId)}
              >
                <CollapsibleTrigger asChild className="cursor-pointer">
                  <button
                    className={cn(
                      "w-full flex items-center justify-between p-4 rounded-xl border transition-all text-left",
                      "bg-white border-slate-200",
                      danger
                        ? "hover:border-red-300 hover:bg-red-50"
                        : "hover:border-lime-400 hover:bg-lime-50/50",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "p-2 rounded-lg",
                          danger
                            ? "bg-red-100 text-red-500"
                            : "bg-slate-100 text-zinc-600",
                        )}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p
                          className={cn(
                            "text-sm font-medium",
                            danger ? "text-red-500" : "text-zinc-900",
                          )}
                        >
                          {label}
                        </p>
                        <p className="text-xs text-zinc-400">{description}</p>
                      </div>
                    </div>
                    <ChevronRight
                      className={cn(
                        "w-4 h-4 text-zinc-300 transition-transform duration-200",
                        openSection === id && "rotate-90",
                      )}
                    />
                  </button>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="mt-1 ml-4 border-l-2 border-slate-200 pl-4 py-3 pr-2">
                    <ActionPanel id={id as ActionId} />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-zinc-300 pb-2">
          Budget Tracker · v2.1.0
        </p>
      </div>
    </div>
  );
}

function ActionPanel({ id }: { id: ActionId }) {
  if (id === "currency")
    return (
      <div className="space-y-3">
        <Label className="text-zinc-500 text-xs">Select Currency</Label>
        <Select defaultValue="usd">
          <SelectTrigger className="bg-white border-slate-200 text-zinc-900 cursor-pointer">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white border-slate-200 text-zinc-900">
            {[
              ["usd", "USD – US Dollar ($)"],
              ["eur", "EUR – Euro (€)"],
              ["gbp", "GBP – British Pound (£)"],
              ["ron", "RON – Romanian Leu (lei)"],
            ].map(([val, label]) => (
              <SelectItem key={val} value={val} className="cursor-pointer">
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <ProfileBtn label="Save currency" />
      </div>
    );

  if (id === "plan")
    return (
      <div className="grid grid-cols-3 gap-2">
        {["Free", "Pro", "Business"].map((p) => (
          <button
            key={p}
            className={cn(
              "py-2 px-3 rounded-lg border text-sm font-medium transition-all",
              p === "Pro"
                ? "border-lime-500 bg-lime-50 text-lime-600"
                : "border-slate-200 bg-white text-zinc-700 hover:border-slate-300 hover:bg-slate-50",
            )}
          >
            {p}
          </button>
        ))}
      </div>
    );

  if (id === "email")
    return (
      <div className="space-y-3">
        <div className="space-y-1">
          <Label className="text-zinc-500 text-xs">New Email Address</Label>
          <Input
            type="email"
            placeholder="you@example.com"
            className="bg-white border-slate-200 text-zinc-900 placeholder:text-zinc-300"
          />
        </div>
        <ProfileBtn label="Update mail" />
      </div>
    );

  if (id === "password")
    return (
      <div className="space-y-3">
        <div className="space-y-1">
          <Label className="text-zinc-500 text-xs">Current Password</Label>
          <Input
            type="password"
            placeholder="••••••••"
            className="bg-white border-slate-200 text-zinc-900 placeholder:text-zinc-300"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-zinc-500 text-xs">New Password</Label>
          <Input
            type="password"
            placeholder="••••••••"
            className="bg-white border-slate-200 text-zinc-900 placeholder:text-zinc-300"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-zinc-500 text-xs">Confirm New Password</Label>
          <Input
            type="password"
            placeholder="••••••••"
            className="bg-white border-slate-200 text-zinc-900 placeholder:text-zinc-300"
          />
        </div>
        <ProfileBtn label="Change Password" />
      </div>
    );

  if (id === "add-account")
    return (
      <div className="space-y-3">
        <div className="space-y-1">
          <Label className="text-zinc-500 text-xs">Account Name</Label>
          <Input
            placeholder="e.g. Savings, Revolut, ING"
            className="bg-white border-slate-200 text-zinc-900 placeholder:text-zinc-300"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-zinc-500 text-xs">
            Initial Balance (optional)
          </Label>
          <Input
            type="number"
            placeholder="0.00"
            className="bg-white border-slate-200 text-zinc-900 placeholder:text-zinc-300"
          />
        </div>
        <ProfileBtn label="Add Account" />
      </div>
    );

  if (id === "reset")
    return (
      <div className="space-y-3">
        <p className="text-xs text-zinc-400">
          This will permanently delete{" "}
          <span className="text-zinc-700 font-medium">
            all your transactions, budgets, and categories
          </span>
          . Your account will remain active.
        </p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              className="border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-400"
            >
              Reset All Data
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white border-slate-200">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-zinc-900">
                Reset all data?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-zinc-500">
                This action cannot be undone. All your transactions, budgets and
                categories will be permanently deleted.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-slate-200 text-zinc-700 hover:bg-slate-50">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction className="bg-red-500 hover:bg-red-600 text-white border-0">
                Yes, Reset Everything
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );

  if (id === "delete")
    return (
      <div className="space-y-3">
        <p className="text-xs text-zinc-400">
          Your account and{" "}
          <span className="text-zinc-700 font-medium">all associated data</span>{" "}
          will be permanently removed. This cannot be undone.
        </p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              className="border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-400"
            >
              Delete My Account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white border-slate-200">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-zinc-900">
                Delete your account?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-zinc-500">
                This is permanent. Your profile, data and subscription will be
                immediately and irreversibly deleted.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-slate-200 text-zinc-700 hover:bg-slate-50">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction className="bg-red-500 hover:bg-red-600 text-white border-0">
                Yes, Delete Account
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );

  return null;
}
