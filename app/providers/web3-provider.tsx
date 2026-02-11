import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet, arbitrum } from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, type Config } from "wagmi";

// 1. Get projectId
const projectId = "c89658ec5549887754388439df67d64b"; // Public demo ID, replace with env var in production

// 2. Set the networks
const networks = [mainnet, arbitrum];

// 3. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
    projectId,
    networks,
    ssr: true, // Validate hydration for wallet detection
});

// 4. Create modal
createAppKit({
    adapters: [wagmiAdapter],
    networks: networks as any,
    projectId,
    metadata: {
        name: "NeoFinance",
        description: "Stablecoin Neobank Demo",
        url: "https://neofinance.demo", // localized
        icons: ["https://avatars.githubusercontent.com/u/37784886"],
    },
    themeMode: "light",
    themeVariables: {
        "--w3m-font-family": "Inter, sans-serif",
        "--w3m-accent": "#2563eb", // Blue-600 to match basic brand
    },
    features: {
        email: false,
        socials: [],
    },
});

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: React.ReactNode }) {
    return (
        <WagmiProvider config={wagmiAdapter.wagmiConfig as Config}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </WagmiProvider>
    );
}
