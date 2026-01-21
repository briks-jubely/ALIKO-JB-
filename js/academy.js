import "./academy.page.js";
import "./courses.js";
/* ===================== AI CHAT LOGIC ===================== */
const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userQuestion");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", async () => {
  const question = input.value.trim();
  if (!question) return;
  addMessage(question, "user");
  input.value = "";

  const typingMsg = addMessage("⏳ AI inafikiria...", "ai");

  try {
    const response = await fetch("http://10.69.186.61:3000/ask-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });
    const data = await res.json();
    typingMsg.textContent = data.answer;

  } catch (err) {
    console.error(err);
    typingMsg.textContent = "⚠️ Kuna tatizo la kuwasiliana na AI";
  }
});

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = `msg ${type}`;
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
  return div;
}
