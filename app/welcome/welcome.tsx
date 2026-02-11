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
        setDebugStatus("Opening wallet modal...");
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
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50 text-gray-900 font-sans">
      <div className="w-full max-w-md space-y-8 bg-white p-10 shadow-xl rounded-2xl border border-gray-100">
        <header className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900 text-white shadow-md mb-6">
            <span className="text-xl font-bold">N</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            NeoFinance
          </h1>
          <p className="mt-2 text-sm text-gray-500 max-w-xs mx-auto">
            The modern way to hold, move, and grow your money with complete freedom.
          </p>
        </header>

        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={handleConnect}
            className="flex items-center justify-center w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition-all active:scale-[0.98]"
          >
            {isAuthenticated ? "Disconnect Wallet" : "Connect Wallet"}
          </button>

          <button
            type="button"
            onClick={handleDemoLogin}
            className="text-xs text-gray-500 hover:text-gray-900 underline underline-offset-4 decoration-gray-300 transition-colors"
          >
            Enter Demo Mode (Skip Wallet)
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="space-y-2 rounded-lg bg-gray-50 p-3 text-xs font-mono text-gray-500">
            <div className="flex justify-between">
              <span>Status:</span>
              <span className="font-medium text-gray-700">{debugStatus || "IDLE"}</span>
            </div>
            <div className="flex justify-between">
              <span>Connected:</span>
              <span className={isConnected ? "text-green-600 font-bold" : "text-gray-700"}>{isConnected ? "YES" : "NO"}</span>
            </div>
            <div className="flex justify-between">
              <span>Auth:</span>
              <span className={isAuthenticated ? "text-green-600 font-bold" : "text-gray-700"}>{isAuthenticated ? "YES" : "NO"}</span>
            </div>
            <div className="flex justify-between flex-wrap gap-2">
              <span>Address:</span>
              <span className="font-medium text-gray-700 truncate max-w-[150px]">{address || "None"}</span>
            </div>
          </div>
        </div>

        <footer className="text-center text-xs text-gray-400">
          Powered by <span className="font-medium text-gray-600">idOS</span>
        </footer>
      </div>
    </main>
  );
}
