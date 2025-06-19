import React, { useState } from 'react';

const Chatbox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage: { sender: 'user' | 'bot'; text: string } = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI response (replace with API call)
    setTimeout(() => {
      const botReply: { sender: 'user' | 'bot'; text: string } = { sender: 'bot', text: `AI: You said "${userMessage.text}"` };
      setMessages(prev => [...prev, botReply]);
    }, 800);
  };

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
