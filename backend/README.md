Debugging notes:
1. server port is running but can't get, try to change another port to see it works
2. backend debugging steps: 
   - let function console.log to see if it connects the functions
   - this is the tutorial for upload knowledge to vector store 
   https://learn.microsoft.com/en-us/azure/ai-foundry/agents/how-to/tools/file-search-upload-files?pivots=javascript
   The process of make upload knowledge possible is:
   1. upload file to AI agent 
      const file = await client.files.upload(localFileStream, "assistants", {
       fileName: "swpp_knowledge.txt",
      });
    2. put file into the ideal vector store using the following function
   const knowledgefile = await client.vectorStoreFiles.createAndPoll(vectorStoreId, {
    fileId: process.env.FILE_ID, // Use the file ID from environment variables
   
   }  );
3. Todo: 
- publish backend to Azure
- upload files to agent vector store
