export interface VideoData {
  id?: string;
  title: string;
  description: string;
  url: string;
  timestamp: Date;
  likes: string[];
  comments: CommentData[];
  userId: string;
  [key: string]: unknown;
}

export interface CommentData {
  userId: string;
  content: string;
  timestamp: Date;
}
