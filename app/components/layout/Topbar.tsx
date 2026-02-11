import { useUser } from "~/layouts/app";
import { Bell, CreditCard, Menu, UserCircle } from "lucide-react";
import { Button } from "~/components/ui/button";

export function Topbar() {
    const user = useUser();
    const address = user?.address || "";

    const shortAddress = address
        ? `${address.slice(0, 6)}...${address.slice(-4)}`
        : "Not Connected";

    return (
        <header className="flex h-16 w-full items-center justify-between border-b border-border bg-white px-6">
            <div className="flex items-center gap-4 md:hidden">
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                </Button>
                <div className="font-bold text-lg">NeoFinance</div>
            </div>

            <div className="flex items-center gap-4 ml-auto">
                <div className="hidden items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600 sm:flex">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Mainnet</span>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 transition-colors cursor-pointer">
                    <div className="h-6 w-6 overflow-hidden rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold">
                        {address ? address.slice(2, 4).toUpperCase() : "?"}
                    </div>
                    <span className="font-mono text-xs">{shortAddress}</span>
                </div>
            </div>
        </header>
    );
}
