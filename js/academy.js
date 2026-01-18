import "./academy.page.js";
import "./courses.js";
/* ===================== AI CHAT LOGIC ===================== */
const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userQuestion");
const sendBtn = document.getElementById("sendBtn");

if (chatBox && input && sendBtn) {
  sendBtn.addEventListener("click", sendMessage);

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    const typingMsg = addMessage("⏳ AI inafikiria...", "ai");

    fetch("/ask-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: text })
    })
      .then(res => res.json())
      .then(data => {
        typingMsg.textContent = data.answer || "Samahani, nilikosa kujibu.";
      })
      .catch(err => {
        console.error(err);
        typingMsg.textContent = "⚠️ Kuna tatizo la kuwasiliana na AI";
      });
  }

  function addMessage(text, type) {
    const div = document.createElement("div");
    div.className = `msg ${type}`;
    div.textContent = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
    return div;
  }
             }
