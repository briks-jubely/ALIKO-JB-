// ===================== academy.js =====================

// 🔥 Imports (kama unatumia module system)
import "./academy.page.js";
import "./courses.js";

// ===================== AI CHAT LOGIC =====================

async function askAI(question) {
  try {
    const response = await fetch("http://10.55.0.158:3000/ask-ai", { // Badilisha IP kama inahitajika
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    const data = await response.json();
    return data.answer || "Samahani, nilikosa kujibu.";
  } catch (err) {
    console.error("AI request error:", err);
    return "⚠️ Kuna tatizo la kuwasiliana na AI backend";
  }
}

// ===================== DOM Elements =====================
const askAiBtn = document.getElementById("askAiBtn");
const aiQuestionInput = document.getElementById("aiQuestion");
const aiAnswerEl = document.getElementById("aiAnswer");

// ===================== Event Listener =====================
askAiBtn.addEventListener("click", async () => {
  const question = aiQuestionInput.value.trim();
  if (!question) {
    aiAnswerEl.textContent = "Tafadhali andika swali kwanza!";
    return;
  }

  aiAnswerEl.textContent = "🤖 Inatuma swali, subiri...";

  const answer = await askAI(question);
  aiAnswerEl.textContent = answer;
});

// ===================== Optional: Press Enter to Ask =====================
aiQuestionInput.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    askAiBtn.click();
  }
});
