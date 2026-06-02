import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from "@/components/ui/chart";
import { Info, Lightbulb } from "lucide-react";
import { CartesianGrid, Line, LineChart, ReferenceLine, XAxis } from "recharts";

// ─── Date ────────────────────────────────────────────────────────────────────

// Idee 3 — date reale + forecast punctat
const savingsWithForecast = [
  { month: "Ian", savings: 106, forecast: null },
  { month: "Feb", savings: 105, forecast: null },
  { month: "Mar", savings: 117, forecast: null },
  { month: "Apr", savings: -117, forecast: null },
  { month: "Mai", savings: 79, forecast: null },
  { month: "Iun", savings: 74, forecast: null },
  // forecast — savings devine null, forecast preia
  { month: "Iul", savings: null, forecast: 60 },
  { month: "Aug", savings: null, forecast: 44 },
  { month: "Sep", savings: null, forecast: 32 },
];

// Idee 4 — savings breakdown surse
const savingsBreakdown = [
  { source: "Surplus salariu", amount: 420, color: "#3B5BDB" },
  { source: "Reduceri cheltuieli", amount: 210, color: "#0A6640" },
  { source: "Cashback / bonusuri", amount: 95, color: "#C47A00" },
  { source: "Investiții", amount: 155, color: "#7C3AED" },
];

const savingsConfig = {
  savings: { label: "Economii", color: "var(--chart-3)" },
  forecast: { label: "Forecast", color: "var(--chart-3)" },
} satisfies ChartConfig;

const breakdownConfig = {
  amount: { label: "Sumă" },
} satisfies ChartConfig;

// ─── Tip card (Idee 2) ────────────────────────────────────────────────────────

const tips = [
  {
    icon: "🍽️",
    action: "Reduce restaurantele cu 30%",
    impact: "+$360/lună economisit",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-900",
  },
  {
    icon: "🛍️",
    action: "Limitează shoppingul la $200",
    impact: "+$100/lună economisit",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-900",
  },
  {
    icon: "📱",
    action: "Auditează subscripțiile inactive",
    impact: "~$40/lună economisit",
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    border: "border-violet-200 dark:border-violet-900",
  },
];

// ─── Custom tooltip forecast ──────────────────────────────────────────────────

const ForecastTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const entry = payload.find((p: any) => p.value !== null);
  if (!entry) return null;
  const isForecast = entry.dataKey === "forecast";
  return (
    <div className="bg-card border border-border rounded-xl px-3 py-2 shadow-md text-xs">
      <p className="font-medium text-card-foreground mb-1">{label}</p>
      <p
        className={
          isForecast ? "text-muted-foreground italic" : "text-card-foreground"
        }
      >
        {isForecast ? "Forecast: " : "Economii: "}
        <span className="font-semibold">${entry.value}</span>
      </p>
      {isForecast && (
        <p className="text-muted-foreground text-[10px] mt-0.5">Estimat</p>
      )}
    </div>
  );
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function AnalyticsRightColumn() {
  const totalBreakdown = savingsBreakdown.reduce((s, d) => s + d.amount, 0);

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 text-blue-800 dark:bg-blue-950/30 dark:border-blue-900 dark:text-blue-300 p-4 rounded-xl">
        <Info size={16} className="shrink-0 mt-0.5 text-blue-500" />
        <p className="text-sm leading-relaxed">
          Analizând cheltuielile și economiile din ultimele 6 luni, economiile
          tale vor scădea cu aproximativ{" "}
          <span className="font-semibold">25% pe lună</span> în următoarele 3
          luni.
        </p>
      </div>

      {/* ── IDEE 2 — Tip card acționabil ── */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-muted">
            <Lightbulb size={14} className="text-yellow-500" />
          </span>
          <h3 className="text-sm font-semibold text-card-foreground">
            Ce poți face?
          </h3>
          <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400">
            Recomandări
          </span>
        </div>
        <ul className="space-y-2.5">
          {tips.map(({ icon, action, impact, color, bg, border }) => (
            <li
              key={action}
              className={`flex items-center justify-between rounded-lg border px-3 py-2.5 ${bg} ${border}`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">{icon}</span>
                <span className="text-sm text-card-foreground">{action}</span>
              </div>
              <span className={`text-xs font-semibold shrink-0 ml-3 ${color}`}>
                {impact}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">
          Aplicând toate recomandările:{" "}
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            +$500/lună
          </span>
        </p>
      </div>

      {/* ── IDEE 3 — Forecast line chart ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Economii + Forecast</CardTitle>
          <CardDescription>Istoric și predicție — Ian–Sep 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={savingsConfig}>
            <LineChart
              data={savingsWithForecast}
              margin={{ top: 8, left: 4, right: 4, bottom: 0 }}
            >
              <CartesianGrid vertical={false} stroke="var(--border)" />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={8}
                axisLine={false}
                tick={{ fontSize: 11 }}
              />
              <ChartTooltip cursor={false} content={<ForecastTooltip />} />
              {/* Linie de referinta la 0 */}
              <ReferenceLine
                y={0}
                stroke="var(--destructive)"
                strokeDasharray="4 2"
                strokeWidth={1}
              />
              {/* Date reale */}
              <Line
                dataKey="savings"
                type="monotone"
                stroke="var(--color-savings)"
                strokeWidth={2}
                dot={{ fill: "var(--color-savings)", r: 4 }}
                activeDot={{ r: 6 }}
                connectNulls={false}
              />
              {/* Forecast punctat */}
              <Line
                dataKey="forecast"
                type="monotone"
                stroke="var(--color-savings)"
                strokeWidth={2}
                strokeDasharray="5 4"
                dot={{
                  fill: "var(--color-savings)",
                  r: 3,
                  strokeDasharray: "0",
                }}
                activeDot={{ r: 5 }}
                connectNulls={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-1 text-xs text-muted-foreground pt-0">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-4 h-0.5 bg-chart-3 rounded" />{" "}
              Istoric
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-4 h-0.5 border-t-2 border-dashed border-chart-3" />{" "}
              Forecast
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-4 h-0.5 border-t border-dashed border-destructive" />{" "}
              Zero
            </span>
          </div>
        </CardFooter>
      </Card>

      {/* ── IDEE 4 — Savings breakdown surse ── */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">De unde provin economiile?</CardTitle>
          <CardDescription>Breakdown pe surse — luna curentă</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {savingsBreakdown.map(({ source, amount, color }) => {
            const pct = Math.round((amount / totalBreakdown) * 100);
            return (
              <div key={source} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <span
                      className="inline-block w-2.5 h-2.5 rounded-sm flex-shrink-0"
                      style={{ background: color }}
                    />
                    {source}
                  </span>
                  <span className="font-medium text-card-foreground">
                    ${amount}{" "}
                    <span className="text-xs text-muted-foreground">
                      ({pct}%)
                    </span>
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-muted">
                  <div
                    className="h-1.5 rounded-full transition-all"
                    style={{ width: `${pct}%`, background: color }}
                  />
                </div>
              </div>
            );
          })}
          <p className="pt-2 border-t border-border text-xs text-muted-foreground">
            Total economisit:{" "}
            <span className="font-semibold text-card-foreground">
              ${totalBreakdown.toLocaleString()}
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
