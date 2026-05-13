import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { useStore } from '../store';

export function MessagesSidebar() {
  const { isMessagesOpen, toggleMessages, messages, sendMessage, currentUser } = useStore();
  const [text, setText] = useState('');

  if (!isMessagesOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      sendMessage(text);
      setText('');
    }
  };

  return (
    <div className="fixed right-0 top-0 bottom-0 w-[320px] bg-[#1A1D23] border-l border-slate-800 shadow-2xl z-40 flex flex-col transform transition-transform">
      <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-[#1A1D23]">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Direct Messaging</h3>
        <button onClick={toggleMessages} className="text-slate-500 hover:text-slate-300">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isMe = msg.senderId === currentUser.id;
          return (
            <div key={msg.id} className={`flex items-start gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
              {!isMe && <div className="w-8 h-8 rounded-full bg-indigo-400 flex-shrink-0 border border-slate-700"></div>}
              <div className={`max-w-[80%] rounded-lg p-3 text-xs border ${
                isMe 
                  ? 'bg-[#14171C] border-[#1A1D23] text-blue-400' 
                  : 'bg-[#262A33] border-slate-700 text-slate-300'
              }`}>
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSend} className="p-4 bg-[#14171C] border-t border-slate-800 border-l border-slate-800/50">
        <div className="relative">
          <input
            type="text"
            className="w-full bg-[#0F1115] border border-slate-700 rounded-lg pl-3 pr-10 py-2 text-xs focus:outline-none text-slate-200 placeholder-slate-500 focus:border-blue-500"
            placeholder="Quick reply..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button 
            type="submit"
            disabled={!text.trim()}
            className="absolute right-2 top-1.5 p-1 text-slate-500 hover:text-blue-500 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
