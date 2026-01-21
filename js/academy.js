import "./academy.page.js";
import "./courses.js";
/* ===================== AI CHAT LOGIC ===================== */
async function askAI(question) {
  try {
    const response = await fetch("http://10.69.186.61:3000/ask-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    const data = await response.json();
    return data.answer || "Samahani, nilikosa kujibu.";
  } catch (err) {
    console.error("AI request error:", err);
    return "⚠️ Kuna tatizo la kuwasiliana na AI.";
  }
}

// 🔥 Example usage
const askBtn = document.getElementById("askBtn");
const questionInput = document.getElementById("questionInput");
const answerBox = document.getElementById("answerBox");

askBtn.addEventListener("click", async () => {
  const question = questionInput.value.trim();
  if (!question) return;
  answerBox.textContent = "💬 AI inafikiria...";
  const answer = await askAI(question);
  answerBox.textContent = answer;
});
