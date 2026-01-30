export const CHAT_ROOM_ADDRESS = (import.meta.env.BUN_PUBLIC_CHAT_ROOM_ADDRESS || "0x0000000000000000000000000000000000000000") as `0x${string}`;

export const CHAT_ROOM_ABI = [
    {
        inputs: [{ internalType: "string", name: "message", type: "string" }],
        name: "sendMessage",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "address", name: "sender", type: "address" },
            { indexed: false, internalType: "string", name: "message", type: "string" },
            { indexed: false, internalType: "uint256", name: "timestamp", type: "uint256" },
        ],
        name: "MessageSent",
        type: "event",
    },
] as const;
