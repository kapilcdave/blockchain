import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
    metaMaskWallet,
    rainbowWallet,
    coinbaseWallet,
    walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { mainnet, sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
    appName: 'Bun + React App',
    projectId: import.meta.env.BUN_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
    chains: [mainnet, sepolia],
    ssr: false,
    wallets: [
        {
            groupName: 'Popular',
            wallets: [
                metaMaskWallet,
                rainbowWallet,
                coinbaseWallet,
                walletConnectWallet,
            ],
        },
    ],
});
