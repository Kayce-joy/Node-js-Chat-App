// public/chat.js
var socket = io();

// Handle incoming messages
socket.on("message", function (data) {
    var messagesDiv = document.getElementById("messages");
    var messageElement = document.createElement("div");
    messageElement.textContent = data.message;
    messagesDiv.appendChild(messageElement);
    console.log("Message added to DOM:", data.message);  // Log added message
});


// Send message to the server
document.getElementById("sendBtn").addEventListener("click", function () {
    var messageInput = document.getElementById("messageInput");
    var message = messageInput.value.trim();
    if (message) {
        console.log("Sending message:", message); // Check if message is being sent
        socket.emit("send", { message: message });
        messageInput.value = ""; // Clear input
    } else {
        console.log("Message input is empty!"); // Log if the input is empty
    }
});


