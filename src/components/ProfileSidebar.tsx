import React, { useState } from 'react';
import { X, Bookmark as BookmarkIcon, Share2 } from 'lucide-react';
import { useStore } from '../store';

export function ProfileSidebar() {
  const { isProfileOpen, toggleProfile, currentUser, bookmarks, shares } = useStore();
  const [tab, setTab] = useState<'bookmarks' | 'shares'>('bookmarks');

  if (!isProfileOpen) return null;

  return (
    <div className="fixed right-0 top-0 bottom-0 w-[320px] bg-[#1A1D23] border-l border-slate-800 shadow-2xl z-40 flex flex-col transform transition-transform">
      <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-[#1A1D23]">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Mesh Profile</h3>
        <button onClick={toggleProfile} className="text-slate-500 hover:text-slate-300">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 border-b border-slate-800 flex flex-col items-center">
        <img src={currentUser.avatar} alt="Profile" className="w-20 h-20 rounded-full border-4 border-[#0F1115] shadow-md mb-3" />
        <h3 className="font-bold text-lg text-slate-200">{currentUser.name}</h3>
        <p className="text-slate-500 text-sm">{currentUser.handle}</p>
        
        <div className="flex w-full mt-6 bg-[#0F1115] border border-slate-800 rounded-lg p-1">
          <button 
            onClick={() => setTab('bookmarks')}
            className={`flex-1 py-1.5 text-xs font-bold uppercase tracking-wide rounded transition-colors ${tab === 'bookmarks' ? 'bg-[#262A33] text-slate-200' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Saved
          </button>
          <button 
            onClick={() => setTab('shares')}
            className={`flex-1 py-1.5 text-xs font-bold uppercase tracking-wide rounded transition-colors ${tab === 'shares' ? 'bg-[#262A33] text-slate-200' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Feed
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-[#0F1115]">
        {tab === 'bookmarks' && (
          <div className="space-y-4">
            {bookmarks.length === 0 ? (
              <div className="text-center text-slate-600 text-sm mt-8 border border-slate-800 border-dashed rounded-xl p-8">No bookmarks yet.</div>
            ) : (
              bookmarks.map(b => (
                <div key={b.id} className="bg-[#1A1D23] p-4 rounded-xl border border-slate-800 shadow-sm relative group">
                  <BookmarkIcon className="absolute top-4 right-4 w-4 h-4 text-orange-400 opacity-80" />
                  <a href={b.url} target="_blank" rel="noopener noreferrer" className="block pr-6 mb-2">
                    <h4 className="font-semibold text-slate-300 text-sm mb-1 truncate" dangerouslySetInnerHTML={{ __html: b.title }} />
                    <p className="text-[10px] text-slate-500 truncate font-mono">{b.url}</p>
                  </a>
                  {b.note && (
                    <div className="text-xs text-slate-400 bg-[#0F1115] border border-slate-800/50 p-2.5 rounded-lg border-l-2 border-l-orange-500/50">
                      {b.note}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {tab === 'shares' && (
          <div className="space-y-4">
            {shares.length === 0 ? (
              <div className="text-center text-slate-600 text-sm mt-8 border border-slate-800 border-dashed rounded-xl p-8">No shares yet.</div>
            ) : (
              shares.map(s => (
                <div key={s.id} className="bg-[#1A1D23] p-4 rounded-xl border border-slate-800 shadow-sm relative">
                  <Share2 className="absolute top-4 right-4 w-3.5 h-3.5 text-green-500 opacity-80" />
                  {s.note && (
                    <p className="text-xs text-slate-300 mb-3 block pr-6 font-medium">
                      "{s.note}"
                    </p>
                  )}
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="block border border-slate-700 bg-[#0F1115] rounded-lg p-3 hover:border-slate-500 transition-colors">
                    <h4 className="font-semibold text-blue-400 text-xs mb-1 line-clamp-1" dangerouslySetInnerHTML={{ __html: s.title }} />
                    <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: s.snippet }} />
                  </a>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
