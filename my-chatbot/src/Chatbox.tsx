import React, { useState, useEffect } from 'react';
import { initAgent, sendMessageToAgent } from './services/agentService';
// Adjust the import based on your config file
import type { MessageTextContent} from "@azure/ai-agents";



const Chatbox: React.FC =  () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');
 
 

  const toggleChat = () => setIsOpen(!isOpen);


  const sendMessage = async () => {
        if (!input.trim()) return;
      setMessages(prev => [...prev, { sender: "user", text: input }]);

      const response = await fetch("http://localhost:8080/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { sender: "bot", text: data.reply }]);
      setInput("");
  }
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          💬
        </button>
      )}

      {isOpen && (
        <div className="w-80 h-96 bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center">
            <span>AI Chat</span>
            <button onClick={toggleChat}>✖</button>
          </div>

          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-[75%] ${
                  msg.sender === 'user' ? 'bg-blue-100 self-end ml-auto' : 'bg-gray-200 self-start'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="border-t p-2 flex">
            <input
              className="flex-1 border rounded px-3 py-1 text-sm"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage} className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbox;
