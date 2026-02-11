import { ArrowDownLeft, ArrowUpRight, Plus, ScanLine, Wallet } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { useUser } from "~/layouts/app";

export function Dashboard() {
    const user = useUser();

    return (
        <div className="flex-1 space-y-8 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h2>
                    <p className="text-muted-foreground text-gray-500">
                        Overview of your financial activity.
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    {/* Calendar Date Picker or similar could go here */}
                    <Button variant="outline" className="border-gray-200 bg-white text-gray-900 hover:bg-gray-50">Download Report</Button>
                </div>
            </div>

            {/* Overview Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Total Balance</CardTitle>
                        <Wallet className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900">$45,231.89</div>
                        <p className="text-xs text-gray-500">+20.1% from last month</p>
                    </CardContent>
                </Card>

                <Card className="border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Monthly Spending</CardTitle>
                        <ArrowUpRight className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900">$2,350.00</div>
                        <p className="text-xs text-gray-500">+4% from last month</p>
                    </CardContent>
                </Card>

                <Card className="border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Income</CardTitle>
                        <ArrowDownLeft className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900">$12,234.00</div>
                        <p className="text-xs text-gray-500">+12% from last month</p>
                    </CardContent>
                </Card>

                <Card className="border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Active Cards</CardTitle>
                        <ScanLine className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900">3</div>
                        <p className="text-xs text-gray-500">2 Physical, 1 Virtual</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">

                {/* Main Chart Area (Mocked) */}
                <Card className="col-span-4 border-gray-200 bg-white shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-gray-900">Revenue Overview</CardTitle>
                        <CardDescription className="text-gray-500">
                            Your spending patterns over the last 30 days.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[300px] flex items-end justify-between gap-2 px-4 pb-4">
                            {/* CSS Bar Chart Mock */}
                            {[40, 65, 30, 80, 55, 90, 40, 70, 50, 60, 75, 50].map((h, i) => (
                                <div key={i} className="group relative flex w-full flex-col justify-end gap-2 group hover:opacity-80 cursor-pointer transition-opacity">
                                    <div
                                        style={{ height: `${h}%` }}
                                        className="w-full rounded-t-md bg-zinc-900"
                                    ></div>
                                    <span className="text-[10px] text-center text-gray-400 opacity-0 group-hover:opacity-100 absolute -bottom-4 left-0 right-0">{i + 1}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Transactions */}
                <Card className="col-span-3 border-gray-200 bg-white shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-gray-900">Recent Transactions</CardTitle>
                        <CardDescription className="text-gray-500">
                            You made 265 transactions this month.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {[
                                { name: "Olivia Martin", email: "olivia.martin@email.com", amount: "+$1,999.00", initials: "OM" },
                                { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "+$39.00", initials: "JL" },
                                { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: "-$299.00", initials: "IN" },
                                { name: "William Kim", email: "will@email.com", amount: "+$99.00", initials: "WK" },
                                { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "+$39.00", initials: "SD" }
                            ].map((tx, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 border border-gray-200">
                                            <span className="text-xs font-medium text-gray-700">{tx.initials}</span>
                                        </div>
                                        <div className="grid gap-0.5">
                                            <p className="text-sm font-medium leading-none text-gray-900">{tx.name}</p>
                                            <p className="text-xs text-gray-500">{tx.email}</p>
                                        </div>
                                    </div>
                                    <div className="font-medium text-gray-900 text-sm">{tx.amount}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
