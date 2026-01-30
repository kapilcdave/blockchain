# OnChain Chat

A decentralized, event-based chat application running on the blockchain, built with [Bun](https://bun.sh), [React](https://react.dev), and [Wagmi](https://wagmi.sh).

This dApp allows users to connect their Ethereum wallet and send messages to a smart contract (`ChatRoom`). Messages are emitted as events on the blockchain, ensuring transparency and immutability without storing data in contract state, effectively making it a gas-efficient public broadcasting system.

## Features

- **Decentralized Messaging**: Send messages directly to the blockchain.
- **Wallet Connection**: Seamlessly connect using RainbowKit (MetaMask, Coinbase Wallet, etc.).
- **Gas Optimized**: Uses smart contract events instead of storage for lower transaction costs.
- **Message Validation**: Enforces a 280-byte limit on messages.
- **Modern Stack**: Built with the speed of Bun and the power of React & Viem.

## Tech Stack

- **Runtime**: Bun
- **Frontend**: React, Vite (via Bun)
- **Blockchain Interaction**: Wagmi, Viem, TanStack Query
- **Wallet UI**: RainbowKit
- **Smart Contract**: Solidity

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed.
- A Web3 wallet (e.g., MetaMask, Rabby).

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd onchain-chat
    ```

2.  Install dependencies:
    ```bash
    bun install
    ```

3.  Set up environment variables:
    Create a `.env` file (or use `.env.example`) and add your configuration:
    ```env
    BUN_PUBLIC_CHAT_ROOM_ADDRESS="0x..." # Deployed contract address
    ```

4.  Start the development server:
    ```bash
    bun run dev
    ```

### Building for Production

To build the application for production:

```bash
bun run build
```

## Smart Contract

The application interacts with a `ChatRoom` contract that simply emits a `MessageSent` event for every message. No data is stored on-chain state, making it lightweight.

```solidity
event MessageSent(address indexed sender, string message, uint256 timestamp);
```
