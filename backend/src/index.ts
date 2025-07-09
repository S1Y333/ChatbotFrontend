// entry point of express server
// src/index.ts
import express from "express";
import cors from "cors";
import { sendMessageToAgent } from "./agentService";
import { getKnowledgeBase } from "./knowledgeService";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Test route to check if the server is running
app.get("/", (req, res) => {
  res.send("Server is running!");
});


app.get("/api/knowledgebase", async (req, res) => {
 
  try {
    const knowledgeBase = await getKnowledgeBase();
    res.json({ knowledgeBase });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch knowledge base." });
  }
});

app.post("/api/agent", async (req, res) => {
  const { message } = req.body;

  try {
    const aiResponse = await sendMessageToAgent(message);
    console.log("AI Response:", aiResponse);
    res.json({ reply: aiResponse });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get response from AI agent." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
