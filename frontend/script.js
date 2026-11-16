const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Add message to chat
function addMessage(message, className) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add(className);

    const textDiv = document.createElement("div");
    textDiv.textContent = message;

    const timeDiv = document.createElement("div");
    timeDiv.classList.add("message-time");
    timeDiv.textContent = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    messageDiv.appendChild(textDiv);
    messageDiv.appendChild(timeDiv);

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Send message to Flask backend
async function sendMessage() {
    const message = userInput.value.trim();

    if (message === "") return;

    addMessage(message, "user-message");
    userInput.value = "";
    sendBtn.disabled = true;

    // Show typing indicator
    const typing = document.createElement("div");
    typing.classList.add("bot-message", "typing");
    typing.textContent = "Bot is typing...";
    chatBox.appendChild(typing);

    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: message })
        });

        await new Promise(resolve => setTimeout(resolve, 1000));


        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Something went wrong.");
        }

        typing.remove();
        addMessage(data.answer, "bot-message");

    } catch (error) {
        typing.remove();
        addMessage(
            "Unable to connect to the server. Please try again.",
            "bot-message"
        );
        console.error(error);

    } finally {
        sendBtn.disabled = false;
        userInput.focus();
    }
}
// Send button click
sendBtn.addEventListener("click", sendMessage);

// Send message using Enter key
userInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
// Suggested questions click
const suggestions = document.querySelectorAll(".suggestion");

suggestions.forEach(function(button) {
    button.addEventListener("click", function() {
        userInput.value = button.textContent;
        sendMessage();
    });
});
// Clear chat functionality
const clearChatBtn = document.getElementById("clear-chat");

clearChatBtn.addEventListener("click", function() {

    chatBox.innerHTML = `
        <div class="bot-message">
            Hello! Welcome to CodeAlpha. How can I help you today?
        </div>

        <div class="suggested-questions">
            <button class="suggestion">What is CodeAlpha?</button>
            <button class="suggestion">How can I register?</button>
            <button class="suggestion">What internships are available?</button>
            <button class="suggestion">How do I submit my project?</button>
        </div>
    `;

    // Make suggested questions clickable again
    document.querySelectorAll(".suggestion").forEach(button => {
        button.addEventListener("click", function() {
            userInput.value = this.textContent;
            sendMessage();
        });
    });
});