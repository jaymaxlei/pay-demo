import { NavLink } from "react-router";
import { Home, Plus, ArrowDown, Send, QrCode, User, Database, Building2 } from "lucide-react";

const navigation = [
    { name: "Home", href: "/app", icon: Home },
    { name: "Add Funds", href: "/app/add", icon: Plus },
    { name: "Withdraw", href: "/app/withdraw", icon: ArrowDown },
    { name: "Send", href: "/app/send", icon: Send },
    { name: "Receive", href: "/app/receive", icon: QrCode },
    { name: "Profile", href: "/app/profile", icon: User },
];

export function Sidebar() {
    return (
        <aside className="hidden w-64 flex-col border-r border-border bg-white md:flex">
            <div className="flex h-16 items-center border-b border-border px-6">
                <div className="flex items-center gap-2 font-semibold text-lg tracking-tight text-zinc-900">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white shadow-sm">
                        <span className="font-bold">N</span>
                    </div>
                    NeoFinance
                </div>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-4">
                {navigation.map((item) => (
                    <NavLink
                        key={item.href}
                        to={item.href}
                        end={item.href === "/app"}
                        className={({ isActive }) =>
                            `group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive
                                ? "bg-zinc-100 text-zinc-900 shadow-sm"
                                : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                            }`
                        }
                    >
                        <item.icon className="h-4 w-4 shrink-0 opacity-70" />
                        {item.name}
                    </NavLink>
                ))}
            </nav>
            <div className="border-t border-border p-4 bg-zinc-50/50">
                <div className="flex items-center gap-3 text-xs text-zinc-400">
                    <Database className="h-3 w-3" />
                    <span className="font-medium">this is a idOS demo</span>
                </div>
            </div>
        </aside>
    );
}
