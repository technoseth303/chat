// Load chat history from your computer
let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];

// Render chat messages
function renderChat() {
    const box = document.getElementById("messages");
    box.innerHTML = "";

    chatHistory.forEach(msg => {
        const li = document.createElement("li");
        li.textContent = msg;
        box.appendChild(li);
    });
}

// Save a new message
function sendMessage() {
    const input = document.getElementById("msgInput");
    const text = input.value.trim();
    if (!text) return;

    chatHistory.push(text);

    // Save to your computer
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));

    input.value = "";
    renderChat();
}

// Clear chat history
function clearChat() {
    localStorage.removeItem("chatHistory");
    chatHistory = [];
    renderChat();
}

// Load chat on page start
window.onload = renderChat;
