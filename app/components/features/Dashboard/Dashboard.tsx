import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { useUser } from "~/layouts/app";
import { ArrowDownLeft, ArrowUpRight, DollarSign, Wallet } from "lucide-react";

export function Dashboard() {
    const user = useUser();
    const address = user?.address;

    // Mock data for now
    const tokens = [
        { symbol: "USDC", balance: "1,234.56", value: "$1,234.56", icon: "🇺🇸" },
        { symbol: "USDT", balance: "500.00", value: "$500.00", icon: "T" },
        { symbol: "ETH", balance: "0.5", value: "$1,500.00", icon: "Ξ" },
    ];

    const transactions = [
        { type: "Received", amount: "+$10.00", token: "USDC", date: "2 hours ago" },
        { type: "Sent", amount: "-$50.00", token: "USDC", date: "1 day ago" },
        { type: "Received", amount: "+$25.00", token: "USDC", date: "3 days ago" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Dashboard</h2>
                    <p className="text-sm text-zinc-500">Welcome back, {address}</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="col-span-1 lg:col-span-2 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle>Total Balance</CardTitle>
                        <CardDescription>Your aggregated portfolio value</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-baseline gap-2">
                            <div className="text-4xl font-bold tracking-tight text-zinc-900">$3,234.56</div>
                            <span className="text-sm font-medium text-emerald-600">+12.5%</span>
                        </div>
                        <p className="text-xs text-zinc-500 mt-1">from last month</p>

                        {/* Placeholder for chart */}
                        <div className="mt-6 h-48 w-full rounded-lg bg-zinc-50 border border-dashed border-zinc-200 flex flex-col items-center justify-center text-zinc-400 gap-2">
                            <div className="h-8 w-8 rounded-full bg-zinc-100 flex items-center justify-center">
                                <DollarSign className="h-4 w-4" />
                            </div>
                            <span className="text-sm">Portfolio Chart Placeholder</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle>Tokens</CardTitle>
                        <CardDescription>Your assets distribution</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {tokens.map((token) => (
                                <div key={token.symbol} className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-sm font-bold border border-zinc-200">
                                            {token.icon === "Ξ" ? <span className="font-sans">Ξ</span> : token.icon}
                                        </div>
                                        <div>
                                            <div className="font-medium text-zinc-900">{token.symbol}</div>
                                            <div className="text-xs text-zinc-500">{token.balance} {token.symbol}</div>
                                        </div>
                                    </div>
                                    <div className="font-medium text-zinc-900">{token.value}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>History of your transfers</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-1">
                        {transactions.map((tx, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-50 transition-colors border-b border-zinc-100 last:border-0">
                                <div className="flex items-center gap-3">
                                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${tx.type === "Received" ? "bg-emerald-50 text-emerald-600" : "bg-zinc-100 text-zinc-600"
                                        }`}>
                                        {tx.type === "Received" ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                                    </div>
                                    <div>
                                        <div className="font-medium text-zinc-900">{tx.type} {tx.token}</div>
                                        <div className="text-xs text-zinc-500">{tx.date}</div>
                                    </div>
                                </div>
                                <div className={`font-medium ${tx.type === "Received" ? "text-emerald-600" : "text-zinc-900"}`}>
                                    {tx.amount}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div >
    );
}
