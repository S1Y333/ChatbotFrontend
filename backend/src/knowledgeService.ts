import { AgentsClient, MessageTextContent } from "@azure/ai-agents";
import { DefaultAzureCredential } from "@azure/identity";
import { projectEndpoint, agentId } from './config/env'; 


const credential = new DefaultAzureCredential();
const client = new AgentsClient(projectEndpoint, credential);

// get client's knowledge base
export async function getKnowledgeBase(): Promise<string[]> {
  
  return ['TestStore1', 'TestStore2'];


  // try {
  //   const vector_stores = client.vectorStores.list();
  //   const names: string[] = [];
  //   let found = false;

  //   for await (const vector_store of vector_stores) {
  //     found = true;
  //     console.log("Vector Store id:", vector_store.id, "Name:", vector_store.name);
  //     names.push(vector_store.name);
  //   }

  //   if (!found) {
  //     console.warn("✅ No vector stores found.");
  //   }

  //   return names;
  // } catch (error) {
  //   console.error("❌ Error fetching vector stores:", error);
  //   return [];
  // }
}

// export async function getKnowledgeBase(): Promise<string[]> {
//   const vector_stores = client.vectorStores.list();
//   const names: string[] = [];
//   for await (const vector_store of vector_stores) {
//     console.log("Vector Store id:", vector_store.id, "Name:", vector_store.name);
//     names.push(vector_store.name);
//   }
//   return names;
// }
  // const knowledgeBase = await client.vectorStoreFiles.get();
  // console.log("Knowledge Base:", JSON.stringify(knowledgeBase.data));
  
  // return knowledgeBase.data.map(item => item.filename);


// upload knowledge to the agent
// export async function uploadKnowledgeToAgent(file: File): Promise<void> {
//   const knowledgeBaseId = await client.files.upload({
//     name: file.name,
//     description: `Knowledge base for ${file.name}`,
//   });

//   const content = await file.text();
//   await client.files.upload(knowledgeBaseId, content);
  
//   console.log(`Knowledge base ${file.name} uploaded successfully.`);
// }