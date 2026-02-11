import { useState } from "react";
import { Check, Copy, QrCode } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useUser } from "~/layouts/app";

export default function Receive() {
    const user = useUser();
    // Fallback or use actual address
    const address = user?.address || "0x0000000000000000000000000000000000000000";
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(address);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Receive Crypto</h2>
                    <p className="text-sm text-zinc-500">Share your address to receive funds</p>
                </div>
            </div>

            <Card className="max-w-md mx-auto text-center shadow-sm">
                <CardHeader>
                    <CardTitle>Your Wallet Address</CardTitle>
                    <CardDescription>Scan or copy to send funds to this wallet</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="flex justify-center">
                        <div className="h-64 w-64 rounded-xl bg-white border border-zinc-200 shadow-sm flex items-center justify-center p-4">
                            {/* Visual Placeholder for QR Code */}
                            <div className="relative w-full h-full bg-zinc-900 rounded-lg flex items-center justify-center overflow-hidden">
                                <QrCode className="h-32 w-32 text-zinc-100 opacity-20" />
                                <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-1 opacity-10">
                                    {Array.from({ length: 36 }).map((_, i) => (
                                        <div key={i} className="bg-white rounded-[1px]" />
                                    ))}
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="h-12 w-12 bg-white rounded-md flex items-center justify-center shadow-md">
                                        <div className="font-bold text-lg">N</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2 text-left">
                            <Label>Ethereum Address</Label>
                            <div className="relative">
                                <Input
                                    readOnly
                                    value={address}
                                    className="pr-10 font-mono text-xs bg-zinc-50/50 text-zinc-600"
                                />
                                <Button
                                    size="icon-sm"
                                    variant="ghost"
                                    className="absolute right-1 top-1 h-7 w-7 text-zinc-500 hover:text-zinc-900"
                                    onClick={handleCopy}
                                >
                                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                                </Button>
                            </div>
                        </div>

                        <Button
                            onClick={handleCopy}
                            className="w-full"
                            variant="outline"
                        >
                            {copied ? (
                                <>
                                    <Check className="mr-2 h-4 w-4" /> Copied
                                </>
                            ) : (
                                <>
                                    <Copy className="mr-2 h-4 w-4" /> Copy Address
                                </>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
