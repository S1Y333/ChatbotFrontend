// src/services/AgentService.ts
import { DefaultAzureCredential } from "@azure/identity";
import { AgentsClient, MessageTextContent } from "@azure/ai-agents";
// import { projectEndpoint, agentId } from '../config/env'; 


let client: AgentsClient;
let threadId: string;

const projectEndpoint = process.env.PROJECT_ENDPOINT || '';
const model = process.env.MODEL_DEPLOYMENT_NAME || 'gpt-4o';
const agentId = process.env.AGENT_ID || '';

export async function initAgent() {
  const credential = new DefaultAzureCredential();
  client = new AgentsClient(projectEndpoint, credential);

  const agent = await client.getAgent(agentId);
  console.log(`Agent connected: ${agent.name} (${agent.id})`);

  const thread = await client.threads.create();
  threadId = thread.id;
  console.log(`Thread started: ${threadId}`);
}

export async function sendMessageToAgent(userMessage: string): Promise<string> {
  if (!client || !threadId) {
    throw new Error("Agent not initialized. Call initAgent() first.");
  }
  console.log(`Sending message to agent: ${userMessage}`);
  // Send message
  await client.messages.create(threadId, "user",userMessage);

  // Run the agent
  const run = await client.runs.create(threadId, agentId);

  // Wait for the run to complete
  let runStatus;
  do {
    const currentRun = await client.runs.get(threadId, run.id);
    runStatus = currentRun.status;
    if (runStatus !== "completed" && runStatus !== "failed") {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // wait 1 sec
    }
  } while (runStatus !== "completed");
  
  // 4. Now fetch all messages in the thread
  for await (const msg of client.messages.list(threadId)) {
    console.log(`Role: ${msg.role}`);
    for (const contentItem of msg.content ?? []) {
      if (contentItem.type === "text" && "text" in contentItem) {
        return (contentItem as MessageTextContent).text.value;
      }
    }
  }
  return "No response from AI.";
}
