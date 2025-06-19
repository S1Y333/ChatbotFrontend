import type {
  MessageDeltaChunk,
  MessageDeltaTextContent,
  MessageImageFileContent,
  MessageTextContent,
  ThreadRun,
} from "@azure/ai-agents";
import {
  RunStreamEvent,
  MessageStreamEvent,
  DoneEvent,
  ErrorEvent,
  AgentsClient,
  isOutputOfType,
  ToolUtility,
} from "@azure/ai-agents";
import { projectEndpoint, apiKey, agentId, modelDeploymentName } from './config/env.js';
import { DefaultAzureCredential } from "@azure/identity";
import { AzureKeyCredential } from "@azure/core-auth";
import { createDefaultHttpClient, PipelineRequest, PipelineResponse, SendRequest } from "@azure/core-rest-pipeline";



export async function main(): Promise<void> {
    
 const credential = new DefaultAzureCredential();
    

   const client = new AgentsClient(projectEndpoint, credential);

    const agent = await client.getAgent(agentId);
    // console.log(`Agent: ${agent.name} (${agent.id})`);

    // create a new thread
    const thread = await client.threads.create();
    console.log(`Created thread, thread ID : ${thread.id}`);

    // create a new message
    const message = await client.messages.create(thread.id, "user",
            "What is Magnet's mission?");
    console.log(`Created message, message ID: ${message.id}`);

    // create a new run
    const run = await client.runs.create(thread.id, agentId, );

    // 3. Wait for the run to complete (polling)
let runStatus;
do {
  const currentRun = await client.runs.get(thread.id, run.id);
  runStatus = currentRun.status;
  if (runStatus !== "completed" && runStatus !== "failed") {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // wait 1 sec
  }
} while (runStatus !== "completed");

// 4. Now fetch all messages in the thread
for await (const msg of client.messages.list(thread.id)) {
  console.log(`Role: ${msg.role}`);
  for (const contentItem of msg.content ?? []) {
    if (contentItem.type === "text" && "text" in contentItem) {
        console.log(`Text: ${(contentItem as MessageTextContent).text.value}`);
    }
  }
}
//     for await (const msg of client.messages.list(thread.id)) {
//         console.log(msg);
//     if (msg.role === "assistant") {
//         for (const contentItem of msg.content ?? []) {
//             if (contentItem.type === "text" && "text" in contentItem) {
//                 console.log(`Agent response: ${(contentItem as MessageTextContent).text}`);
//             }
//         }
//     }
// }

    


}

main().catch((err) => {
    console.error("Error running main:", err);
});