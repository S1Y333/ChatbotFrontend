import React, { useState, useEffect } from 'react';

// Adjust the import based on your config file
import type { MessageTextContent} from "@azure/ai-agents";

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
};


const Chatbox: React.FC =  () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Hello! Welcome to Magnet website. How can I help you today?', sender: 'bot' }
  ]);
  const [input, setInput] = useState<string>('');
 
 

  const toggleChat = () => setIsOpen(!isOpen);


  const sendMessage = async (event?: React.FormEvent) => {
     if (event) event.preventDefault();
        if (!input.trim()) return;
      setMessages(prev => [...prev, { id: messages.length +1, sender: "user", text: input }]);

      const response = await fetch("http://localhost:8080/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      
      const data = await response.json();
      console.log("Response from server:", data);

      setMessages(prev => [...prev, {  id: prev.length + 1,sender: "bot", text: data.reply }]);
      setInput("");
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
       {/* Chatbox */}
      {isOpen ? (
        <div className="w-80 h-96 bg-white rounded-t-lg shadow-xl flex flex-col border border-gray-200">
          {/* Header */}
          <div 
            className="bg-red-700 text-white p-3 rounded-t-lg flex justify-between items-center cursor-pointer"
            onClick={toggleChat}
          >
            <h3 className="font-semibold">Magnet Chatbot</h3>
            <button className="text-white focus:outline-none">
              {isOpen ? '−' : '+'}
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`mb-3 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
              >
                <div 
                  className={`inline-block p-2 rounded-lg ${message.sender === 'user' 
                    ? 'bg-red-700 text-white' 
                    : 'bg-gray-200 text-gray-800'}`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          
          {/* Input */}
          <form onSubmit={sendMessage} className="p-3 border-t border-gray-200">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-red-600"
              />
              <button
                type="submit"
                className="bg-red-700 text-white px-4 py-2 rounded-r-lg hover:bg-red-800 focus:outline-none"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      ) : (
        // Closed chat button
        <button
          onClick={toggleChat}
          className="bg-red-700 text-white p-4 rounded-full shadow-lg hover:bg-red-800 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Chatbox;
