import React, { useState } from 'react';
import { useStore } from '../store';
import { SearchResult } from '../types';
import { MessageSquare, Heart, Share2, BookmarkPlus, Send, X } from 'lucide-react';

interface ResultCardProps {
  result: SearchResult;
}

export function ResultCard({ result }: ResultCardProps) {
  const { comments, addComment, likeComment, addBookmark, addShare, isIncognito } = useStore();
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  
  const [showShareModal, setShowShareModal] = useState(false);
  const [showBookmarkModal, setShowBookmarkModal] = useState(false);
  const [note, setNote] = useState('');

  const resultComments = comments[result.url] || [];

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      addComment(result.url, newComment);
      setNewComment('');
    }
  };

  const handleShare = () => {
    addShare(result.url, result.title, result.snippet, note);
    setShowShareModal(false);
    setNote('');
  };

  const handleBookmark = () => {
    addBookmark(result.url, result.title, result.snippet, note);
    setShowBookmarkModal(false);
    setNote('');
  };

  return (
    <div className="bg-[#1A1D23] border border-slate-800 rounded-xl overflow-hidden shadow-xl mb-6">
      <div className="p-4">
        <a href={result.url} target="_blank" rel="noopener noreferrer" className="group block mb-2">
          <h3 className="text-blue-400 text-lg font-medium group-hover:underline line-clamp-2" dangerouslySetInnerHTML={{ __html: result.title }} />
          <p className="text-[10px] text-slate-500 truncate mt-0.5 tracking-wide">{result.url}</p>
        </a>
        <p className="text-sm text-slate-400 line-clamp-2" dangerouslySetInnerHTML={{ __html: result.snippet }} />
      
        {/* Action icons row inside card */}
        <div className="flex gap-4 mt-3">
          <button onClick={() => setShowComments(!showComments)} className="text-[10px] font-bold text-slate-500 flex items-center gap-1 uppercase hover:text-blue-400 transition-colors">
            <MessageSquare className="w-3 h-3" /> {resultComments.length} Comments
          </button>
          <button onClick={() => setShowShareModal(true)} className="text-[10px] font-bold text-slate-500 flex items-center gap-1 uppercase hover:text-green-400 transition-colors">
            <Share2 className="w-3 h-3" /> Share Link
          </button>
          <button onClick={() => setShowBookmarkModal(true)} className="text-[10px] font-bold text-slate-500 flex items-center gap-1 uppercase hover:text-orange-400 transition-colors">
             <BookmarkPlus className="w-3 h-3" /> Bookmark
          </button>
        </div>
      </div>

      {showComments && !isIncognito && (
        <div className="px-4 pb-4 pt-4 border-t border-slate-800/50 bg-[#0F1115]">
          <div className="space-y-3 mb-4 max-h-60 overflow-y-auto pr-2">
            {resultComments.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No comments yet. Be the first!</p>
            ) : (
              resultComments.map(comment => (
                <div key={comment.id} className="flex gap-3 bg-[#1A1D23] rounded-lg p-3 border border-slate-800">
                  <div className="w-8 h-8 rounded bg-slate-800 flex-shrink-0 flex items-center justify-center text-slate-400 font-bold text-xs uppercase border border-slate-700">
                    {comment.userId === 'u1' ? 'A' : 'U'}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-300">
                      User_{comment.userId} <span className="text-[10px] text-slate-600 ml-2">{new Date(comment.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">{comment.text}</p>
                    <div className="flex items-center mt-1">
                      <button 
                        onClick={() => likeComment(result.url, comment.id)}
                        className="flex items-center text-[10px] text-slate-500 hover:text-red-400 font-bold transition-colors"
                      >
                        <Heart className="w-3 h-3 mr-1" fill={comment.likes > 0 ? "currentColor" : "none"} /> {comment.likes}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <form onSubmit={handleAddComment} className="flex gap-2 items-center mt-1">
            <input
              type="text"
              placeholder="Add a comment to this result..."
              className="flex-1 bg-[#1A1D23] border border-slate-700 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-blue-500 text-slate-200 placeholder-slate-500"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button 
              type="submit"
              disabled={!newComment.trim()}
              className="p-1.5 bg-blue-600 rounded text-white disabled:opacity-50 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {isIncognito && showComments && (
        <div className="px-4 py-3 bg-[#14171C] border-t border-slate-800 text-[10px] font-mono text-blue-400 uppercase tracking-widest flex items-center">
          <Shield className="w-3 h-3 inline mr-2 text-blue-500" />
          Mesh network disconnected. Tracking disabled.
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1A1D23] border border-slate-800 rounded-xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest">Share to Mesh</h3>
              <button onClick={() => setShowShareModal(false)} className="text-slate-500 hover:text-slate-300">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mb-4 p-3 bg-[#0F1115] border border-slate-800 rounded-lg">
              <p className="text-sm font-medium text-slate-300 truncate" dangerouslySetInnerHTML={{ __html: result.title }}></p>
              <p className="text-[10px] font-mono text-slate-500 truncate mt-1">{result.url}</p>
            </div>
            <textarea
              placeholder="Add a short note..."
              className="w-full bg-[#0F1115] border border-slate-700 rounded-lg p-3 text-xs focus:outline-none focus:border-blue-500 text-slate-200 placeholder-slate-500 mb-4 min-h-[100px]"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <button 
              onClick={handleShare}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2.5 rounded hover:shadow-lg transition-all uppercase tracking-wider"
            >
              Post to Feed
            </button>
          </div>
        </div>
      )}

      {/* Bookmark Modal */}
      {showBookmarkModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1A1D23] border border-slate-800 rounded-xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest">Add Bookmark</h3>
              <button onClick={() => setShowBookmarkModal(false)} className="text-slate-500 hover:text-slate-300">
                <X className="w-5 h-5" />
              </button>
            </div>
            <textarea
              placeholder="Private note..."
              className="w-full bg-[#0F1115] border border-slate-700 rounded-lg p-3 text-xs focus:outline-none focus:border-blue-500 text-slate-200 placeholder-slate-500 mb-4 min-h-[100px]"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <button 
              onClick={handleBookmark}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2.5 rounded hover:shadow-lg transition-all uppercase tracking-wider"
            >
              Save Bookmark
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
