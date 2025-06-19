import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// export async function main(): Promise<void> {
    
//  const credential = new DefaultAzureCredential();
    

//    const client = new AgentsClient(projectEndpoint, credential);

//     const agent = await client.getAgent(agentId);
//     // console.log(`Agent: ${agent.name} (${agent.id})`);

//     // 0. create a new thread
//     const thread = await client.threads.create();
//     console.log(`Created thread, thread ID : ${thread.id}`);

//     // 1.create a new message
//     const message = await client.messages.create(thread.id, "user",
//             "What is Magnet's mission?");
//     console.log(`Created message, message ID: ${message.id}`);

//     // 2.create a new run
//     const run = await client.runs.create(thread.id, agentId, );

//     // 3. Wait for the run to complete (polling)
// let runStatus;
// do {
//   const currentRun = await client.runs.get(thread.id, run.id);
//   runStatus = currentRun.status;
//   if (runStatus !== "completed" && runStatus !== "failed") {
//     await new Promise((resolve) => setTimeout(resolve, 1000)); // wait 1 sec
//   }
// } while (runStatus !== "completed");

// // 4. Now fetch all messages in the thread
// for await (const msg of client.messages.list(thread.id)) {
//   console.log(`Role: ${msg.role}`);
//   for (const contentItem of msg.content ?? []) {
//     if (contentItem.type === "text" && "text" in contentItem) {
//         console.log(`Text: ${(contentItem as MessageTextContent).text.value}`);
//     }
//   }
// }


// }

// main().catch((err) => {
//     console.error("Error running main:", err);
// });