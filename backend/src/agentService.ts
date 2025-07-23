// azure AI logic
// src/agentService.ts
import { AgentsClient, MessageTextContent } from "@azure/ai-agents";
import { DefaultAzureCredential } from "@azure/identity";
import { projectEndpoint, agentId } from './config/env'; 


const credential = new DefaultAzureCredential();
const client = new AgentsClient(projectEndpoint, credential);

let threadId: string | null = null;

export async function sendMessageToAgent(userInput: string): Promise<string> {
  if (!threadId) {
    const thread = await client.threads.create();
    threadId = thread.id;
    console.log(`Created thread ID: ${threadId}`);
  }

  await client.messages.create(threadId, "user",userInput,);
  // question: how to decide when to close a thread from both backend and frontend?

  const run = await client.runs.create(threadId, agentId);

  let status = run.status;
  while (status !== "completed" && status !== "failed") {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const updated = await client.runs.get(threadId, run.id);
    status = updated.status;
  }

  if (status === "failed") {
    throw new Error("AI agent run failed");
  }

//   const messages = await client.messages.list(threadId);
//   const lastMessage = messages.items.find(msg => msg.role === "assistant");
  for await (const msg of client.messages.list(threadId)) {
    console.log(`Role: ${msg.role}`);
    for (const contentItem of msg.content ?? []) {
      if (contentItem.type === "text" && "text" in contentItem) {
        return (contentItem as MessageTextContent).text.value;
      }
    }
  }
//   const content = lastMessage?.content?.[0] as MessageTextContent;
  return "No response from AI.";
}
