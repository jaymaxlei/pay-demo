import { Transak } from "@transak/transak-sdk";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { MachineContext } from "~/providers/state";
import type { Route } from "./+types/add";
import { CreditCard, DollarSign } from "lucide-react";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Add Funds | NeoFinance" },
        { name: "description", content: "Buy stablecoins with fiat" },
    ];
}

export default function AddFunds() {
    const { send } = MachineContext.useActorRef();
    const state = MachineContext.useSelector((state) => state.value);
    const sharableToken = MachineContext.useSelector((state) => state.context.sharableToken);
    const provider = MachineContext.useSelector((state) => state.context.provider);
    const errorMessage = MachineContext.useSelector((state) => state.context.errorMessage);

    const transak = useRef<Transak | null>(null);
    const [amount, setAmount] = useState<string>("100");
    const [currency, setCurrency] = useState("USD");
    const [step, setStep] = useState<"input" | "widget">("input");

    useEffect(() => {
        return () => {
            send({ type: "RESET" });
        };
    }, [send]);

    useEffect(() => {
        if (state !== "dataOrTokenFetched" || !provider) return;

        if (provider === "transak" && !transak.current && sharableToken) {
            transak.current = new Transak({
                apiKey: "479983ae-3b37-4ac0-84f2-f42873b1a638", // (Required)
                environment: "STAGING" as any, // (Required)
                kycShareTokenProvider: "SUMSUB",
                kycShareToken: sharableToken,
                containerId: "transak-container", // Correct property name
                widgetHeight: "650px",
                widgetWidth: "100%",
                defaultCryptoCurrency: "USDC",
                fiatCurrency: currency,
                fiatAmount: Number(amount),
            });

            transak.current.init();

            Transak.on(Transak.EVENTS.TRANSAK_WIDGET_CLOSE, (orderData) => {
                transak.current?.close();
                send({ type: "revokeAccessGrant" });
                transak.current = null;
                setStep("input"); // Go back to input
            });

            // We can also listen for success events to show a success message
        }
    }, [sharableToken, state, provider, send, amount, currency]);

    const handleStartTransak = () => {
        setStep("widget");
        send({ type: "configure", provider: "transak" });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Add Funds</h2>
                    <p className="text-sm text-zinc-500">Buy crypto with your credit card or bank transfer</p>
                </div>
            </div>

            {step === "input" && (
                <Card className="max-w-2xl mx-auto shadow-sm">
                    <CardHeader>
                        <CardTitle>Buy Stablecoins</CardTitle>
                        <CardDescription>Select amount and currency</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label>I want to spend</Label>
                            <div className="flex gap-2">
                                <Input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="text-lg"
                                />
                                <div className="relative">
                                    <select
                                        className="h-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-24"
                                        value={currency}
                                        onChange={(e) => setCurrency(e.target.value)}
                                    >
                                        <option value="USD">USD</option>
                                        <option value="EUR">EUR</option>
                                        <option value="GBP">GBP</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg border border-border bg-muted/50 p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm border border-gray-100 overflow-hidden p-1">
                                        <img src="https://assets.transak.com/images/logo-transak.png" alt="Transak" className="h-full w-full object-contain" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-zinc-900">Transak</div>
                                        <div className="text-xs text-zinc-500">Global cards & bank transfers</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-medium text-zinc-900">≈ {amount} USDC</div>
                                    <div className="text-xs text-emerald-600 font-medium">Best rate</div>
                                </div>
                            </div>
                        </div>

                        <Button
                            onClick={handleStartTransak}
                            className="w-full"
                            size="lg"
                            disabled={!amount || Number(amount) <= 0}
                        >
                            Continue with Transak
                        </Button>
                    </CardContent>
                </Card>
            )}

            <div className={step === "widget" ? "block" : "hidden"}>
                <div id="transak-container" className="h-[700px] w-full max-w-2xl mx-auto rounded-xl overflow-hidden border border-border bg-white shadow-lg" />
                {state !== "dataOrTokenFetched" && step === "widget" && (
                    <div className="text-center p-10 flex flex-col items-center justify-center h-[500px]">
                        <div className="animate-pulse flex space-x-4">
                            <div className="h-10 w-10 bg-zinc-200 rounded-full"></div>
                        </div>
                        <p className="text-lg text-zinc-600 mt-4">Preparing secure checkout...</p>
                        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                    </div>
                )}
            </div>
        </div>
    );
}
