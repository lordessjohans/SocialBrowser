import React, { useState, useEffect } from 'react';
import { BrowserHeader } from './components/BrowserHeader';
import { ResultCard } from './components/ResultCard';
import { MessagesSidebar } from './components/MessagesSidebar';
import { ProfileSidebar } from './components/ProfileSidebar';
import { SearchResult } from './types';
import { useStore } from './store';
import { Loader2, Globe } from 'lucide-react';

export default function App() {
  const { isIncognito } = useStore();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);

  // Use constant dark theme for this high-density layout

  const handleSearch = async (q: string) => {
    if (!q.trim()) return;
    setLoading(true);
    setQuery(q);
    setSearched(true);
    try {
      // Use Wikipedia API to get real-ish search results
      const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&utf8=&format=json&origin=*`);
      const data = await res.json();
      const mappedResults: SearchResult[] = data.query.search.map((item: any) => ({
        pageid: item.pageid,
        title: item.title,
        snippet: item.snippet + '...',
        url: `https://en.wikipedia.org/?curid=${item.pageid}`
      }));
      setResults(mappedResults);
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#0F1115] text-slate-200 font-sans overflow-hidden">
      <BrowserHeader onSearch={handleSearch} />
      
      <div className="flex flex-1 overflow-hidden relative">
        <main className="flex-1 overflow-y-auto p-6 bg-[#0F1115]">
          <div className="max-w-4xl mx-auto space-y-6">
        {!searched && !loading && (
          <div className="flex flex-col items-center justify-center h-64 text-center mt-20">
            <Globe className={`w-16 h-16 mb-4 ${isIncognito ? 'text-gray-700' : 'text-gray-300'}`} />
            <h1 className="text-2xl font-bold mb-2">Welcome to Social Browser</h1>
            <p className="text-gray-500 max-w-sm">Search the web, share findings, and discuss results with your network.</p>
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        )}

        {!loading && searched && (
          <div>
            <header className="mb-6 pb-2">
              <h1 className="text-2xl font-semibold mb-1 capitalize text-slate-200">{query}</h1>
              <p className="text-[10px] text-slate-500 italic uppercase tracking-widest">{results.length * 1024} Social Results • Verified Community</p>
            </header>
            {results.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                No results found. Try another query.
              </div>
            ) : (
              <div className="space-y-6">
                {results.map((result) => (
                  <ResultCard key={result.pageid} result={result} />
                ))}
              </div>
            )}
          </div>
        )}
          </div>
        </main>

        <MessagesSidebar />
        <ProfileSidebar />
        
        {/* Overlay for sidebars */}
        <SidebarOverlay />
      </div>

      {/* Bottom Status Bar */}
      <footer className="h-8 bg-[#0a0c0e] border-t border-slate-800 flex items-center px-4 justify-between text-[10px] text-slate-500 font-mono flex-shrink-0 z-30 relative shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.5)]">
        <div className="flex gap-4">
          <span className={isIncognito ? "text-blue-500" : ""}>PEER-TO-PEER ENCRYPTION: {isIncognito ? "ACTIVE" : "OFF"}</span>
          <span>LATENCY: {loading ? "..." : "22ms"}</span>
        </div>
        <div className="flex gap-4 hidden sm:flex">
          <span>RELATIONSHIP MESH v2.4.1</span>
          <span className="text-blue-500">COMMUNITY SYNCED</span>
        </div>
      </footer>
    </div>
  );
}

function SidebarOverlay() {
  const { isMessagesOpen, isProfileOpen, toggleMessages, toggleProfile } = useStore();
  const isOpen = isMessagesOpen || isProfileOpen;
  
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black/20 z-30 sm:hidden"
      onClick={() => {
        if (isMessagesOpen) toggleMessages();
        if (isProfileOpen) toggleProfile();
      }}
    />
  );
}

