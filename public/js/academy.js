// ===================== academy.js =====================

// 🔥 Imports ya modules kama unatumia module system
import "./academy.page.js";
import "./courses.js";

// ===================== CONFIG =====================
const AI_API_URL = "https://abcd1234.ngrok.io/ask-ai"; // badilisha na ngrok URL yako

// ===================== DOM ELEMENTS =====================
const askBtn = document.getElementById("askAiBtn");
const questionInput = document.getElementById("aiQuestion");
const chatBox = document.getElementById("chatBox");

// ===================== HELPER FUNCTION =====================
function addMessage(content, sender = "ai") {
  const msgEl = document.createElement("div");
  msgEl.classList.add("msg", sender);
  msgEl.textContent = content;
  chatBox.appendChild(msgEl);
  chatBox.scrollTop = chatBox.scrollHeight; // auto scroll down
}
// ===================== AI greeting message =====================
addMessage("👋Niulize chochote, usichoelewa nitakusaidia kwa kina...", "ai");

// ===================== SEND QUESTION FUNCTION =====================
async function sendQuestion() {
  const question = questionInput.value.trim();
  if (!question) return;

  // Ongeza message ya user
  addMessage(question, "user");
  questionInput.value = "";

  // Message ya AI inafikiria
  addMessage("🤖 Inafikiria...", "ai");

  try {
    const res = await fetch(AI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    const data = await res.json();
    chatBox.lastChild.textContent = data.answer || "Samahani, nilikosa kujibu.";
  } catch (err) {
    console.error(err);
    chatBox.lastChild.textContent = "⚠️ Kuna tatizo la kuwasiliana na AI backend";
  }
}

// ===================== EVENT LISTENERS =====================
askBtn.addEventListener("click", sendQuestion);

questionInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendQuestion();
  }
});
