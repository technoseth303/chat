// Load current user
const user = localStorage.getItem("currentUser");
if (!user) location.href = "index.html";

document.getElementById("welcome").textContent = "Logged in as: " + user;

// Load stored chats
let publicChat = JSON.parse(localStorage.getItem("publicChat")) || [];
let privateChat = JSON.parse(localStorage.getItem("privateChat")) || [];

// Render public chat
function renderPublic() {
    const box = document.getElementById("publicMessages");
    box.innerHTML = "";

    publicChat.forEach(msg => {
        const li = document.createElement("li");
        li.textContent = msg.sender + ": " + msg.text;
        box.appendChild(li);
    });
}

// Render private messages for this user
function renderPM() {
    const box = document.getElementById("pmList");
    box.innerHTML = "";

    privateChat
        .filter(m => m.receiver === user)
        .forEach(msg => {
            const li = document.createElement("li");
            li.textContent = msg.sender + " → you: " + msg.text;
            box.appendChild(li);
        });
}

// Send public message
function sendPublic() {
    const text = document.getElementById("publicInput").value.trim();
    if (!text) return;

    publicChat.push({ sender: user, text });
    localStorage.setItem("publicChat", JSON.stringify(publicChat));

    document.getElementById("publicInput").value = "";
    renderPublic();
}

// Send private message
function sendPM() {
    const receiver = document.getElementById("pmUser").value.trim();
    const text = document.getElementById("pmText").value.trim();
    if (!receiver || !text) return;

    privateChat.push({ sender: user, receiver, text });
    localStorage.setItem("privateChat", JSON.stringify(privateChat));

    document.getElementById("pmText").value = "";
    renderPM();
}

// Clear everything
function clearAll() {
    localStorage.removeItem("publicChat");
    localStorage.removeItem("privateChat");
    publicChat = [];
    privateChat = [];
    renderPublic();
    renderPM();
}

// Initial render
renderPublic();
renderPM();
