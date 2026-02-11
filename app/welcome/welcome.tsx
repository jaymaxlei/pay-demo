import { useState } from "react";
import { useSiwe } from "../providers/siwe-provider";

export function Welcome() {
  const { address, isAuthenticated, signIn, signOut, isConnected } = useSiwe();
  const [debugStatus, setDebugStatus] = useState("");

  const handleConnect = async () => {
    setDebugStatus("Initiating connection...");
    try {
      if (isAuthenticated) {
        setDebugStatus("Signing out...");
        signOut();
      } else {
        setDebugStatus("Calling signIn()...");
        await signIn();
        setDebugStatus("signIn() called. Waiting for modal/signature...");
      }
    } catch (e) {
      console.error("Error:", e);
      setDebugStatus("Error: " + String(e));
      alert("Error: " + String(e));
    }
  };

  const handleDemoLogin = async () => {
    // Direct bypass
    window.location.href = "/app";
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50/50">
      <div className="flex w-full max-w-sm flex-col items-center gap-8 p-8">
        <header className="flex flex-col items-center gap-2">
          {/* Logo Placeholder */}
          <div className="h-10 w-10 mb-2 rounded bg-zinc-900 flex items-center justify-center text-white text-lg font-bold">
            N
          </div>
          <h1 className="text-center text-xl font-semibold tracking-tight text-zinc-900">
            NeoFinance
          </h1>
          <p className="text-center text-sm text-zinc-500">
            The modern way to hold and move money.
          </p>
        </header>

        <div className="w-full space-y-4">
          <button
            type="button"
            className="w-full h-10 rounded-md bg-zinc-900 font-medium text-sm text-white hover:bg-zinc-800 transition-colors focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 cursor-pointer active:scale-95"
            onClick={handleConnect}
          >
            {isAuthenticated
              ? `Disconnect (${address?.slice(0, 6)}...${address?.slice(-4)})`
              : "Connect Wallet"}
          </button>

          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full text-xs text-zinc-400 hover:text-zinc-600 underline cursor-pointer"
          >
            Start Demo Mode (Skip Wallet)
          </button>
        </div>

        <div className="text-xs text-left w-full bg-gray-100 p-2 rounded text-zinc-500 font-mono break-all">
          <p>Status: {debugStatus || "IDLE"}</p>
          <p>Connected: {isConnected ? "YES" : "NO"}</p>
          <p>Auth: {isAuthenticated ? "YES" : "NO"}</p>
          <p>Address: {address || "None"}</p>
        </div>

        <footer className="mt-4 text-center text-xs text-zinc-400">
          <p>this is a <span className="font-medium text-zinc-600">idOS demo</span></p>
        </footer>
      </div>
    </main>
  );
}
