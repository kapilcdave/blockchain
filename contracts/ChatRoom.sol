// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title ChatRoom - Simple on-chain chat using events only
/// @notice This contract allows users to send messages which are emitted as events.
/// @dev No storage is used; messages are logged via the MessageSent event.
contract ChatRoom {
    /// @dev Emitted when a user sends a message.
    /// @param sender The address of the message sender.
    /// @param message The message content.
    /// @param timestamp The block timestamp when the message was sent.
    event MessageSent(address indexed sender, string message, uint256 timestamp);

    /// @notice Send a message to the chat.
    /// @param message The message string. Must be non‑empty and <= 280 bytes.
    function sendMessage(string calldata message) external {
        // Ensure the message is not empty
        require(bytes(message).length > 0, "Message cannot be empty");
        // Ensure the message does not exceed 280 bytes
        require(bytes(message).length <= 280, "Message exceeds 280 bytes");
        emit MessageSent(msg.sender, message, block.timestamp);
    }
}
