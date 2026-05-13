import React, { useState } from 'react';
import { Search, Shield, ShieldOff, MessageCircle, User } from 'lucide-react';
import { useStore } from '../store';

interface BrowserHeaderProps {
  onSearch: (query: string) => void;
}

export function BrowserHeader({ onSearch }: BrowserHeaderProps) {
  const [query, setQuery] = useState('');
  const { isIncognito, toggleIncognito, toggleMessages, toggleProfile, currentUser } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  };

  return (
    <header className="flex items-center gap-4 bg-[#1A1D23] border-b border-slate-800 p-3 sticky top-0 z-20">
      <div className="flex items-center gap-4 w-1/4">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border border-slate-700 flex items-center justify-center text-white font-bold text-sm">
          S
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 max-w-2xl mx-4 relative">
        <div className="flex items-center gap-3 bg-[#0F1115] border border-slate-700 rounded-lg px-3 py-1.5 w-full transition-colors focus-within:border-slate-500">
          {isIncognito ? <Shield className="w-4 h-4 text-blue-500 flex-shrink-0" /> : <Search className="w-4 h-4 text-slate-500 flex-shrink-0" />}
          <input
            type="text"
            className="w-full bg-transparent focus:outline-none text-sm text-slate-200 placeholder-slate-500"
            placeholder={isIncognito ? "Mask Active - Private search..." : "Search the web..."}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </form>

      <div className="flex items-center gap-4 ml-auto w-1/4 justify-end">
        <div className="flex bg-slate-800 rounded-md p-1 items-center gap-1">
          <button 
            type="button"
            onClick={toggleIncognito}
            className={`px-3 py-1 rounded text-[10px] font-bold flex items-center gap-1 uppercase transition-colors whitespace-nowrap ${
              isIncognito 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-300 hover:bg-slate-700'
            }`}
          >
            {isIncognito ? <Shield className="w-3 h-3 text-white" /> : <ShieldOff className="w-3 h-3" />}
            {isIncognito ? 'Mask On' : 'Mask Off'}
          </button>
        </div>
        <button 
          onClick={toggleMessages}
          className="text-slate-500 hover:text-blue-400 transition-colors relative"
          title="Direct Messages"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full border border-slate-800"></span>
        </button>
        <button 
          onClick={toggleProfile}
          className="w-7 h-7 rounded-full overflow-hidden border border-slate-700 hover:border-blue-500 transition-colors flex-shrink-0"
          title="Profile & Bookmarks"
        >
          <img src={currentUser.avatar} alt="Profile" className="w-full h-full object-cover" />
        </button>
      </div>
    </header>
  );
}
