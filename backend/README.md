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
- upload files to agent vector store - done
3. Todo: 
- Fix the error from backend, when chatbot closed it should be end the thread, next time start a new thread
- user can upload from frontend, then save uploaded file to backend and knowledge base (frontend +backend task)
- publish backend to Azure

#When to Close Threads
- Backend Strategies:
   Timeout-based Closure:

   Close threads after X minutes/hours of inactivity (e.g., 30-60 minutes)

   Track last interaction timestamp

   Conversation Completion:

   When the agent detects conversation is complete (e.g., "Is there anything else I can help with?")

   After receiving explicit "goodbye" or similar from user

   Session-based:

   Tie thread lifetime to user session (close when session expires)

   Error Conditions:

   Close threads that fail or become unresponsive

- Frontend Strategies:
   User-initiated Closure:

   Provide a "End Conversation" button

   Close when user navigates away from chat

   Session Management:

   Store thread ID in sessionStorage (cleared when tab closes)

   Or localStorage with expiration for returning users

   Periodic Cleanup:

   Frontend can ping backend to check thread status

   Close abandoned threads