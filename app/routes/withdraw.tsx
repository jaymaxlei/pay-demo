import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { MachineContext } from "~/providers/state";

export default function Withdraw() {
    const { send } = MachineContext.useActorRef();
    const state = MachineContext.useSelector((state) => state.value);
    const noahUrl = MachineContext.useSelector((state) => state.context.noahUrl);
    const provider = MachineContext.useSelector((state) => state.context.provider);
    const errorMessage = MachineContext.useSelector((state) => state.context.errorMessage);

    const [amount, setAmount] = useState<string>("100");
    const [currency, setCurrency] = useState("USDC");
    const [step, setStep] = useState<"input" | "widget">("input");

    const handleStartWithdraw = () => {
        setStep("widget");
        send({ type: "configure", provider: "noah" });
    };

    useEffect(() => {
        // If we navigate away or reset, we might want to handle it.
        // The global listener in AppLayout handles "noah-done".
    }, []);

    useEffect(() => {
        // Return cleanup to reset machine
        return () => {
            send({ type: "RESET" });
        };
    }, [send]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Withdraw Funds</h2>
                    <p className="text-sm text-zinc-500">Transfer back to your bank account via Noah</p>
                </div>
            </div>

            {step === "input" && (
                <Card className="max-w-2xl mx-auto shadow-sm">
                    <CardHeader>
                        <CardTitle>Withdraw to Bank</CardTitle>
                        <CardDescription>Enter amount to withdraw</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label>You are sending</Label>
                            <div className="flex gap-2">
                                <Input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
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
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm border border-gray-100 overflow-hidden p-1">
                                        <img src="https://noah.com/favicon.ico" alt="Noah" className="h-full w-full object-contain" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-zinc-900">Noah</div>
                                        <div className="text-xs text-zinc-500">SEPA Instant Transfer</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-medium text-zinc-900">≈ €{Number(amount) * 0.92}</div>
                                    <div className="text-xs text-emerald-600 font-medium">Rate: 1 USDC = €0.92</div>
                                </div>
                            </div>
                        </div>

                        <Button
                            className="w-full"
                            size="lg"
                            onClick={handleStartWithdraw}
                            disabled={!amount || Number(amount) <= 0}
                        >
                            Continue with Noah
                        </Button>
                    </CardContent>
                </Card>
            )}

            {step === "widget" && (
                <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg border border-border bg-white">
                    {!noahUrl ? (
                        <div className="p-10 text-center flex flex-col items-center justify-center h-[500px]">
                            <div className="animate-spin h-10 w-10 border-4 border-zinc-200 border-t-zinc-900 rounded-full mb-4"></div>
                            <p className="text-lg text-zinc-600">Connecting to Noah...</p>
                            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                        </div>
                    ) : (
                        <iframe
                            src={noahUrl}
                            className="w-full h-[800px] border-none"
                            title="Noah Withdrawal"
                            sandbox="allow-popups allow-forms allow-scripts allow-same-origin"
                            allow="camera; microphone; geolocation; clipboard-write"
                        />
                    )}
                </div>
            )}
        </div>
    );
}
