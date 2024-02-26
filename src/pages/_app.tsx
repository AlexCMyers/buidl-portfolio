import "@/styles/globals.css";
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { ThemeProvider } from "@/components/themes";

import type { AppProps } from "next/app";
//createConfig is from wagami
const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    //ethereum mainnet
    chains: [mainnet],
    transports: {
      // RPC URL for each chain
      // what RPC do I want to connect to
      [mainnet.id]: http(
        `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_MAINNET}`,
      ),
    },

    // Required API Keys
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',

    // Required App Info
    appName: "Crypto Portfolio",

    // Optional App Info
    appDescription: "A great app for managing your portfolio",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);
export default function App({ Component, pageProps }: AppProps) {

const queryClient = new QueryClient();
// everything in Component is the page itself. the rest of this is the configuration.
//ordered by most to least important. ConnectKit needs Wagami, so Wagami goes first  
return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
        <Component {...pageProps} />;
        </ThemeProvider>
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
