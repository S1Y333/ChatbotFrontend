// entry point of express server
// src/index.ts
import express from "express";
import multer from "multer";
import cors from "cors";
import { sendMessageToAgent } from "./agentService";
import { uploadKnowledgeToAgent } from "./knowledgeService";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Test route to check if the server is running
app.get("/", (req, res) => {
  res.send("Server is running!");
});

const upload = multer({ dest: "uploads/" }); 

app.post("/api/knowledgebase", async (req, res): Promise<void> => {
 
  try {
   
    // const filePath = "/uploads/swpp_knowledge.txt"; // Assuming the file is saved with this name
    const knowledgeBase = await uploadKnowledgeToAgent();
    res.json({ knowledgeBase });
      console.log("Knowledge base uploaded successfully:", knowledgeBase);
  
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
    console.error("Upload failed:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
