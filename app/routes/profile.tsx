import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { useUser } from "~/layouts/app";
import { MachineContext } from "~/providers/state";
import { Check, Clock, User, HardDrive, Wallet } from "lucide-react";

export default function Profile() {
    const user = useUser();
    const address = user?.address;
    const profile = MachineContext.useSelector((state) => state.context.profile);
    const credential = MachineContext.useSelector((state) => state.context.credential);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Your Profile</h2>
                    <p className="text-sm text-zinc-500">Manage your identity and connected wallets</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="col-span-1 shadow-sm">
                    <CardHeader>
                        <CardTitle>Identity Status</CardTitle>
                        <CardDescription>Your verified identity credentials</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-full ${profile ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                                        <User className="h-4 w-4" />
                                    </div>
                                    <span className="font-medium text-zinc-700">Profile Exists</span>
                                </div>
                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${profile ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                                    }`}>
                                    {profile ? <Check className="mr-1 h-3 w-3" /> : <Clock className="mr-1 h-3 w-3" />}
                                    {profile ? "Verified" : "Checking"}
                                </span>
                            </div>

                            <div className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-full bg-emerald-50 text-emerald-600">
                                        <Wallet className="h-4 w-4" />
                                    </div>
                                    <span className="font-medium text-zinc-700">Wallet Connected</span>
                                </div>
                                <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                                    <Check className="mr-1 h-3 w-3" /> Active
                                </span>
                            </div>

                            {/* Credential Data Display */}
                            {credential && (
                                <div className="mt-4 p-4 bg-zinc-50 rounded-lg border border-zinc-100">
                                    <div className="flex items-center gap-2 mb-2 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                                        <HardDrive className="h-3 w-3" /> Credential Data
                                    </div>
                                    <pre className="text-xs text-zinc-600 font-mono overflow-auto max-h-40 whitespace-pre-wrap break-all">
                                        {JSON.stringify(credential, null, 2)}
                                    </pre>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-1 shadow-sm h-fit">
                    <CardHeader>
                        <CardTitle>Connected Wallets</CardTitle>
                        <CardDescription>Wallets linked to your profile</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 bg-zinc-50/50">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="h-8 w-8 rounded-full bg-zinc-900 flex items-center justify-center text-white font-bold text-xs shrink-0">W</div>
                                    <div className="text-sm font-mono text-zinc-600 truncate">{address}</div>
                                </div>
                                <div className="ml-2 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 border border-blue-100 shrink-0">Primary</div>
                            </div>
                        </div>

                        <Button variant="outline" className="w-full">
                            Link Another Wallet
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="pt-8 text-center border-t border-dashed border-zinc-200">
                <p className="text-xs text-zinc-400 mb-1">Decentralized Identity powered by</p>
                <div className="font-bold text-zinc-900 text-lg tracking-tight">idOS</div>
            </div>
        </div>
    );
}
