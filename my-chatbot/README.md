# ChatbotFrontend

This frontend is part of my WP AI chatbot assistant development and this repository is specialized for frontend looking and functions testing before integrated into plugin

## Roadmap
  1. connect to AI
  Phase 1.1- get  AI agent response -done
  1.2 get user input and send as question prompt
  2. set up the frame for React frontend
  Phase 2.1 set up the frame and get input - done
  2.2 
  3. polish frontend to be chatbubbles

  3.1 Install Tailwind CSS and its dependencies 
   Tailwind v3 (stable, Create React App-compatible)
   Tailwind v4 (experimental, Vite-only and uses a new engine)
  3.2 Advanced feature
  - deploy AI backend to Azure app service 
  - able to upload knowledge to AI agent, the UI will be used for admin dashboard for WP (front +back logic)
    - install react-router-dom
    - Upload knowledge:
      - Store the selected file in state.
      - Send the file to backend using FormData and fetch when the user clicks "Upload Knowledge".
      - backend should handle the upload to Azure (Blob Storage, Azure AI, etc).
    - Read knowledge:
      - Store the selected file in state.
      - Send the file to your backend using FormData and 
      - fetch when the user clicks "Upload Knowledge".
      - backend should handle the upload to Azure (Blob Storage, Azure AI, etc).
  - revise create thread id from frontend instead of backend, because backend persist the thread id
  - add options for users to ask the first question and get more traffic