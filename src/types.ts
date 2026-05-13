export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
}

export interface Comment {
  id: string;
  resultUrl: string;
  userId: string;
  text: string;
  likes: number;
  timestamp: number;
}

export interface Bookmark {
  id: string;
  url: string;
  title: string;
  snippet: string;
  note: string;
  timestamp: number;
}

export interface Share {
  id: string;
  url: string;
  title: string;
  snippet: string;
  note: string;
  timestamp: number;
  authorId: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
}

export interface SearchResult {
  pageid: number;
  title: string;
  snippet: string;
  url: string;
}
