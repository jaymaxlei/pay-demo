import { useState, useEffect } from "react";
import { ArrowRight, Wallet, Building2, Landmark, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { MachineContext } from "~/providers/state";

export default function Send() {
    const { send } = MachineContext.useActorRef();
    const noahUrl = MachineContext.useSelector((state) => state.context.noahUrl);
    const errorMessage = MachineContext.useSelector((state) => state.context.errorMessage);

    const [selectedFlow, setSelectedFlow] = useState<"crypto" | "bank" | null>(null);

    // Crypto Flow State
    const [token, setToken] = useState("USDC");
    const [amount, setAmount] = useState("");
    const [address, setAddress] = useState("");

    // Bank Flow State
    const [bankAmount, setBankAmount] = useState("100");

    useEffect(() => {
        return () => {
            send({ type: "RESET" });
        };
    }, [send]);

    const handleStartNoah = () => {
        send({ type: "configure", provider: "noah" });
    };

    const handleSendCrypto = () => {
        alert("Send functionality is mocked for this demo.");
    };

    if (!selectedFlow) {
        return (
            <div className="space-y-6 max-w-4xl mx-auto">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Send Funds</h2>
                    <p className="text-zinc-500">Choose how you would like to send money.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card
                        className="cursor-pointer transition-all hover:border-zinc-400 hover:shadow-md"
                        onClick={() => setSelectedFlow("crypto")}
                    >
                        <CardHeader className="pb-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 mb-2">
                                <Wallet className="h-6 w-6" />
                            </div>
                            <CardTitle>Send Crypto</CardTitle>
                            <CardDescription>
                                Transfer digital assets to another wallet address.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center text-sm text-blue-600 font-medium">
                                Continue <ArrowRight className="ml-1 h-4 w-4" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card
                        className="cursor-pointer transition-all hover:border-zinc-400 hover:shadow-md"
                        onClick={() => setSelectedFlow("bank")}
                    >
                        <CardHeader className="pb-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600 mb-2">
                                <Building2 className="h-6 w-6" />
                            </div>
                            <CardTitle>Send to Bank Account</CardTitle>
                            <CardDescription>
                                Withdraw funds directly to a bank account via Noah.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center text-sm text-green-600 font-medium">
                                Continue <ArrowRight className="ml-1 h-4 w-4" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => setSelectedFlow(null)}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
                        {selectedFlow === "crypto" ? "Send Crypto" : "Send to Bank Account"}
                    </h2>
                </div>
            </div>

            {selectedFlow === "crypto" && (
                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Transaction Details</CardTitle>
                        <CardDescription>Enter the recipient details and amount.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label>Select Asset</Label>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                            >
                                <option value="USDC">USDC (USD Coin)</option>
                                <option value="USDT">USDT (Tether)</option>
                                <option value="ETH">ETH (Ethereum)</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label>Amount</Label>
                            <div className="relative">
                                <Input
                                    type="number"
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="pr-16 text-lg"
                                />
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="absolute right-1 top-1 h-7 text-xs"
                                    onClick={() => setAmount("1234.56")}
                                >
                                    MAX
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Recipient Address</Label>
                            <Input
                                placeholder="0x..."
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>

                        <Button
                            className="w-full"
                            size="lg"
                            onClick={handleSendCrypto}
                            disabled={!amount || !address}
                        >
                            Send {token}
                        </Button>
                    </CardContent>
                </Card>
            )}

            {selectedFlow === "bank" && (
                <div className="space-y-6">
                    {!noahUrl ? (
                        <Card className="max-w-2xl">
                            <CardHeader>
                                <CardTitle>Withdrawal Details</CardTitle>
                                <CardDescription>Enter the amount you wish to withdraw to your bank.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label>You are sending</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            type="number"
                                            value={bankAmount}
                                            onChange={(e) => setBankAmount(e.target.value)}
                                            className="text-lg"
                                        />
                                        <div className="flex items-center justify-center rounded-md border border-input bg-muted px-4 font-medium text-sm">
                                            USDC
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-lg border border-border bg-muted/50 p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm border border-gray-100">
                                                <Landmark className="h-4 w-4 text-zinc-900" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-zinc-900">Noah</div>
                                                <div className="text-xs text-zinc-500">SEPA Instant Transfer</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-medium text-zinc-900">≈ €{Number(bankAmount) * 0.92}</div>
                                            <div className="text-xs text-emerald-600">Rate: 1 USDC = €0.92</div>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    className="w-full"
                                    size="lg"
                                    onClick={handleStartNoah}
                                    disabled={!bankAmount || Number(bankAmount) <= 0}
                                >
                                    Continue with Noah
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card className="max-w-4xl border-none shadow-none bg-transparent">
                            <div className="w-full rounded-xl overflow-hidden shadow-lg border border-border bg-white">
                                <iframe
                                    src={noahUrl}
                                    className="w-full h-[800px] border-none"
                                    title="Noah Withdrawal"
                                    sandbox="allow-popups allow-forms allow-scripts allow-same-origin"
                                    allow="camera; microphone; geolocation; clipboard-write"
                                />
                            </div>
                        </Card>
                    )}
                </div>
            )}
        </div>
    );
}
