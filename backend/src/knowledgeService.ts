import { AgentsClient, MessageTextContent } from "@azure/ai-agents";
import { DefaultAzureCredential } from "@azure/identity";
import { projectEndpoint, agentId } from './config/env'; 
import { json } from "stream/consumers";


const credential = new DefaultAzureCredential();
const client = new AgentsClient(projectEndpoint, credential);

// get client's knowledge base
export async function getKnowledgeBase(): Promise<string[]> {

  // Get the vector store ID from environment variables
  const vectorStoreId = process.env.VECTORSTORE_ID;

  // get vector store knowledge
  if (!vectorStoreId) {
    throw new Error("Vector store ID is not defined in environment variables.");
  }

  try {
    // Fetch the vector store by ID
    const files = await client.vectorStoreFiles.list(vectorStoreId);
    

    const ids: string[] = [];
    for await (const file of files) {
      //use file.id to get the content of the file
      // GET {endpoint}/vector_stores/{vectorStoreId}/files/{fileId}?api-version=v1
     const content = await client.vectorStoreFiles.get(vectorStoreId, file.id)
    
      console.log(`File ID: ${file.id}, Content: ${JSON.stringify(content)}`);
            ids.push(file.id);
    }
    return ids;
    // Check if the vector store has a knowledge base
    // if (!vectorStore.knowledgeBase) {
    //   console.warn("✅ No knowledge base found in the vector store.");
    //   return [];
    // }

    // // Return the knowledge base content
    // return vectorStore.knowledgeBase.content;
  } catch (error) {
    console.error("❌ Error fetching knowledge base:", error);
    throw error;
  }
  // this code helps to list all vector stores, then I can use the vector store id to get the knowledge base
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