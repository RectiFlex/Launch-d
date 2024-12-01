import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { mainnet, sepolia } from 'wagmi/chains';
import { QueryClient } from '@tanstack/react-query';

export const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;

const metadata = {
  name: 'AI Launchpad',
  description: 'Web3 Startup Launchpad Platform',
  url: 'https://ailaunchpad.example',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const chains = [mainnet, sepolia];

export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  enableWalletConnect: true,
  enableInjected: true,
  enableEIP6963: true,
  enableCoinbase: false, // Disabled to avoid COOP header issues
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#9333ea',
  },
});