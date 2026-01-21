import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ⚡ POST endpoint ya AI
app.post("/ask-ai", async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: "Question required" });

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
You are an Automotive Expert AI Assistant.
Answer any question about cars, engines, EFI systems, sensors, actuators, diagnostics, repairs, and general automotive knowledge.
Use Kiswahili if the user asks in Kiswahili, English if the user asks in English.
`
          },
          { role: "user", content: question }
        ],
        temperature: 0.2
      })
    });

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || "Samahani, nilikosa kujibu.";
    res.json({ answer });

  } catch (err) {
    console.error(err);
    res.status(500).json({ answer: "⚠️ Kuna tatizo la server" });
  }
});

app.listen(3000, "0.0.0.0", () => console.log("AI backend running on port 3000"));
