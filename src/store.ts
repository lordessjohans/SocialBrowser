import { create } from 'zustand';
import { User, Comment, Bookmark, Share, Message, SearchResult } from './types';

interface SocialBrowserState {
  currentUser: User;
  isIncognito: boolean;
  toggleIncognito: () => void;
  
  comments: Record<string, Comment[]>; // Keyed by URL
  addComment: (url: string, text: string) => void;
  likeComment: (url: string, commentId: string) => void;

  bookmarks: Bookmark[];
  addBookmark: (url: string, title: string, snippet: string, note: string) => void;

  shares: Share[];
  addShare: (url: string, title: string, snippet: string, note: string) => void;

  messages: Message[];
  sendMessage: (text: string) => void;

  isMessagesOpen: boolean;
  toggleMessages: () => void;

  isProfileOpen: boolean;
  toggleProfile: () => void;
}

const mockUser: User = {
  id: 'u1',
  name: 'Alex Developer',
  handle: '@alexdev',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
};

export const useStore = create<SocialBrowserState>((set, get) => ({
  currentUser: mockUser,
  isIncognito: false,
  toggleIncognito: () => set((state) => ({ isIncognito: !state.isIncognito })),

  comments: {},
  addComment: (url, text) => set((state) => {
    const newComment: Comment = {
      id: Math.random().toString(36).substring(7),
      resultUrl: url,
      userId: state.currentUser.id,
      text,
      likes: 0,
      timestamp: Date.now(),
    };
    const existing = state.comments[url] || [];
    return { comments: { ...state.comments, [url]: [...existing, newComment] } };
  }),
  likeComment: (url, commentId) => set((state) => {
    const existing = state.comments[url] || [];
    const updated = existing.map(c => 
      c.id === commentId ? { ...c, likes: c.likes + 1 } : c
    );
    return { comments: { ...state.comments, [url]: updated } };
  }),

  bookmarks: [],
  addBookmark: (url, title, snippet, note) => set((state) => {
    const newBookmark: Bookmark = {
      id: Math.random().toString(36).substring(7),
      url, title, snippet, note, timestamp: Date.now()
    };
    return { bookmarks: [newBookmark, ...state.bookmarks] };
  }),

  shares: [],
  addShare: (url, title, snippet, note) => set((state) => {
    const newShare: Share = {
      id: Math.random().toString(36).substring(7),
      url, title, snippet, note, timestamp: Date.now(),
      authorId: state.currentUser.id
    };
    return { shares: [newShare, ...state.shares] };
  }),

  messages: [
    { id: 'm1', senderId: 'u2', text: 'Hey, did you see that new article?', timestamp: Date.now() - 3600000 }
  ],
  sendMessage: (text) => set((state) => {
    const newMsg: Message = {
      id: Math.random().toString(36).substring(7),
      senderId: state.currentUser.id,
      text,
      timestamp: Date.now(),
    };
    return { messages: [...state.messages, newMsg] };
  }),

  isMessagesOpen: false,
  toggleMessages: () => set((state) => ({ isMessagesOpen: !state.isMessagesOpen, isProfileOpen: false })),

  isProfileOpen: false,
  toggleProfile: () => set((state) => ({ isProfileOpen: !state.isProfileOpen, isMessagesOpen: false })),
}));
