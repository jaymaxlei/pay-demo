import { BrowserProvider, JsonRpcSigner } from "ethers";
import { createContext, useContext, useEffect, useState } from "react";
import { type Address, getAddress } from "viem";
import { useAccount, useDisconnect, useSignMessage, type Connector } from "wagmi";
import { useAppKit } from "@reown/appkit/react";
// import { getWalletClient } from "@wagmi/core";

// Helper to convert Viem Wallet Client to Ethers Signer
// (Required because idOS SDK likely uses Ethers)
export async function walletClientToSigner(walletClient: any) {
  const { account, chain, transport } = walletClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new BrowserProvider(transport, network);
  const signer = new JsonRpcSigner(provider, account.address);
  return signer;
}

interface SiweContextType {
  address: string | null;
  isAuthenticated: boolean;
  isConnected: boolean;
  signIn: () => Promise<void>;
  signer: () => Promise<JsonRpcSigner | null>;
  signOut: () => void;
  open: () => void;
}

const SiweContext = createContext<SiweContextType | null>(null);

export function useSiwe() {
  const context = useContext(SiweContext);
  if (!context) {
    throw new Error("useSiwe must be used within a SiweProvider");
  }
  return context;
}

export function SiweProvider({ children }: { children: React.ReactNode }) {
  // Use Wagmi hooks
  const { address: wagmiAddress, isConnected, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const { open } = useAppKit();
  console.log("SiweProvider render: useAppKit open is", typeof open);

  const [address, setAddress] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Sync basic state from Wagmi
  useEffect(() => {
    if (isConnected && wagmiAddress) {
      setAddress(wagmiAddress);
    } else {
      setAddress(null);
    }
  }, [isConnected, wagmiAddress]);

  const [shouldSignIn, setShouldSignIn] = useState(false);

  const performSiwe = async (currentAddress: string) => {
    try {
      console.log("performSiwe: starting for", currentAddress);

      // Mock message generation
      const message = `Sign in to pay-demo as ${currentAddress} at ${Date.now()}`;

      console.log("performSiwe: requesting signature for message:", message);
      const signature = await signMessageAsync({
        message,
      });
      console.log("performSiwe: signature received", signature);

      // Mock verification success
      console.log("performSiwe: mocking server verification success");
      setIsAuthenticated(true);

      // Navigate to app after successful login (small delay for UX)
      setTimeout(() => {
        window.location.href = "/app";
      }, 500);

    } catch (error) {
      console.error("Sign in error:", error);
      alert("Sign in error: " + String(error));
    }
  };

  // Effect to trigger SIWE after connection if requested
  useEffect(() => {
    if (shouldSignIn && isConnected && wagmiAddress) {
      setShouldSignIn(false); // consume flag
      performSiwe(wagmiAddress);
    }
  }, [shouldSignIn, isConnected, wagmiAddress]);

  const signIn = async () => {
    console.log("SiweProvider: signIn called");
    console.log("Status:", { isConnected, wagmiAddress });

    if (isConnected && wagmiAddress) {
      await performSiwe(wagmiAddress);
    } else {
      setShouldSignIn(true);
      console.log("Opening AppKit modal...");
      try {
        if (!open) {
          alert("AppKit 'open' function is undefined");
          return;
        }
        await open();
        console.log("AppKit modal opened request sent");
      } catch (e) {
        console.error("Failed to open AppKit:", e);
        alert("Failed to open wallet modal: " + e);
      }
    }
  };

  const handleSignOut = async () => {
    // await fetch("/auth", { method: "DELETE" }); // No backend in demo
    setIsAuthenticated(false);
    disconnect();
    window.location.href = "/";
  };

  const getEthersSigner = async () => {
    // Logic to get ethers signer from wagmi connector
    // This is complex in v5/v6 transition but idOS needs a signer.
    // We'll try to use the browser provider directly if available (e.g. metamask)
    // or construct it from the connector provider.

    if (!connector) throw new Error("No connector");

    const provider = await connector.getProvider();
    const browserProvider = new BrowserProvider(provider as any);
    return browserProvider.getSigner();
  };

  return (
    <SiweContext.Provider
      value={{
        address: address || null,
        isAuthenticated,
        isConnected,
        signIn,
        signOut: handleSignOut,
        signer: getEthersSigner,
        open
      }}
    >
      {children}
    </SiweContext.Provider>
  );
}
