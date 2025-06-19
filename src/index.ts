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
    console.log(`Agent: ${agent.name} (${agent.id})`);
}

main().catch((err) => {
    console.error("Error running main:", err);
});