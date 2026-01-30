import { useState } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CHAT_ROOM_ADDRESS, CHAT_ROOM_ABI } from "../contracts/chatRoom";

export function SendMessage() {
    const { isConnected } = useAccount();
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState<string | null>(null);

    const {
        data: txHash,
        isPending: isPendingWallet,
        writeContract,
        error: writeError,
        reset,
    } = useWriteContract();

    const {
        isLoading: isConfirming,
        isSuccess: isConfirmed,
        error: receiptError,
    } = useWaitForTransactionReceipt({
        hash: txHash,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess(null);
        if (!message.trim()) return;

        // Byte length check for 280 bytes
        if (new TextEncoder().encode(message).length > 280) {
            alert("Message exceeds 280 bytes");
            return;
        }

        writeContract({
            address: CHAT_ROOM_ADDRESS,
            abi: CHAT_ROOM_ABI,
            functionName: "sendMessage",
            args: [message],
        });
    };

    // Clear input on successful transaction confirmation
    if (isConfirmed && message !== "") {
        setSuccess("Message sent successfully!");
        setMessage("");
        reset(); // Reset the transaction state
    }

    // Determine button label based on transaction state
    let buttonLabel = "Send";
    const isBusy = isPendingWallet || isConfirming;

    if (!isConnected) {
        buttonLabel = "Connect Wallet";
    } else if (isPendingWallet) {
        buttonLabel = "Confirm in wallet...";
    } else if (isConfirming) {
        buttonLabel = "Sending...";
    }

    return (
        <div className="api-tester" style={{ marginTop: "2rem" }}>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="What's happening?"
                    disabled={!isConnected || isBusy}
                    maxLength={280}
                    className="response-area"
                    style={{
                        minHeight: "100px",
                        marginBottom: "0.5rem",
                        display: "block"
                    }}
                />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.8rem", color: message.length > 280 ? "#ff4d4d" : "rgba(251, 240, 223, 0.6)" }}>
                        {message.length} / 280
                    </span>

                    <button
                        type="submit"
                        disabled={!isConnected || isBusy || !message.trim()}
                        className="send-button"
                        style={{
                            opacity: (isConnected && !isBusy && message.trim()) ? 1 : 0.5,
                            cursor: (isConnected && !isBusy && message.trim()) ? "pointer" : "not-allowed"
                        }}
                    >
                        {buttonLabel}
                    </button>
                </div>
            </form>

            {writeError && (
                <p style={{ color: "#ff4d4d", marginTop: "1rem", fontSize: "0.9rem", textAlign: "left" }}>
                    Error: {writeError.message}
                </p>
            )}
            {receiptError && (
                <p style={{ color: "#ff4d4d", marginTop: "1rem", fontSize: "0.9rem", textAlign: "left" }}>
                    Transaction Error: {receiptError.message}
                </p>
            )}
            {success && (
                <p style={{ color: "#4ade80", marginTop: "1rem", fontSize: "0.9rem", fontWeight: "bold", textAlign: "left" }}>
                    {success}
                </p>
            )}
        </div>
    );
}
