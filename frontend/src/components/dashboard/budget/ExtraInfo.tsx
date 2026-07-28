import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Pin } from "lucide-react"

const fixedCosts = [
    { label: "Chirie", amount: 1200, pct: 75 },
    { label: "Utilități", amount: 300, pct: 19 },
    { label: "Internet", amount: 60, pct: 4 },
]


export default function ExtraInfo() {
    return <Card className="w-full">
        <CardHeader>
            <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted">
                    <Pin
                        size={14}
                        className="text-muted-foreground"
                        aria-hidden="true"
                    />
                </span>
                <CardTitle className="text-sm">Cheltuieli fixe lunare</CardTitle>
                <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                    Recurente
                </span>
            </div>
        </CardHeader>

        <CardContent>
            <ul className="space-y-2.5">
                {fixedCosts.map(({ label, amount, pct }) => (
                    <li key={label} className="space-y-1">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{label}</span>
                            <span className="font-medium tabular-nums">
                                ${amount.toLocaleString()}
                            </span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-muted">
                            <div
                                className="h-1.5 rounded-full bg-blue-400"
                                style={{ width: `${pct}%` }}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </CardContent>

        <CardFooter className="border-t pt-4">
            <p className="text-xs text-muted-foreground">
                Total fix lunar:{" "}
                <span className="font-semibold text-foreground tabular-nums">
                    $1,560
                </span>
            </p>
        </CardFooter>
    </Card>
}