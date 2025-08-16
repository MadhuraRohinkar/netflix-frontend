import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { Send } from 'lucide-react';

const socket = io('https://netflix-socket-tq7e.onrender.com'); // change if deployed

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMsg, setInputMsg] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on('newMsg', (msg) => {
      setMessages((prev) => [...prev, { type: 'received', text: msg }]);
    });

    return () => {
      socket.off('newMsg');
    };
  }, []);

  const sendMessage = () => {
    if (inputMsg.trim() === '') return;

    setMessages((prev) => [...prev, { type: 'sent', text: inputMsg }]);
    socket.emit('message', inputMsg);
    setInputMsg('');
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-5 right-5 w-[300px] bg-[#141414] text-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
      <div className="bg-red-600 px-4 py-2 font-semibold text-center">Netflix Assistant</div>

      <div className="flex-1 p-3 overflow-y-auto max-h-[300px]">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 text-sm flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}>
            <span className={`px-3 py-2 rounded-xl ${msg.type === 'sent' ? 'bg-red-500' : 'bg-gray-700'}`}>
              {msg.text}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center p-2 border-t border-gray-700 bg-[#1f1f1f]">
        <input
          type="text"
          className="flex-1 bg-transparent outline-none px-3 text-white placeholder-gray-400"
          placeholder="Ask Netflix..."
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          onKeyDown={handleEnter}
        />
        <button onClick={sendMessage} className="text-red-500 hover:text-red-600 p-1">
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
