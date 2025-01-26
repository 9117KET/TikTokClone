// src/lib/firestore.ts
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  arrayUnion,
  FirestoreError,
} from "firebase/firestore";
import { db } from "./firebase";

// Types
interface UserData {
  id: string;
  [key: string]: string | number | boolean | Date;
}

interface VideoData {
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

interface CommentData {
  userId: string;
  content: string;
  timestamp: Date;
}

// Add at the top of the file
const logOperation = (operation: string, data?: unknown) => {
  console.log(`🔥 Firestore ${operation} operation:`, data || "");
};

// Update the error handling utility
const handleFirestoreError = (error: FirestoreError, operation: string) => {
  console.error(`❌ Firestore error during ${operation}:`, {
    code: error.code,
    message: error.message,
    details: error,
  });
  throw error;
};

// Add a new user
export const addUser = async (userData: UserData) => {
  try {
    const docRef = await addDoc(collection(db, "users"), userData);
    return docRef.id;
  } catch (e) {
    handleFirestoreError(e as FirestoreError, "adding user");
  }
};

// Get a user by ID
export const getUserById = async (userId: string) => {
  try {
    const q = query(collection(db, "users"), where("id", "==", userId));
    const querySnapshot = await getDocs(q);
    const userData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return userData[0] || null;
  } catch (e) {
    handleFirestoreError(e as FirestoreError, "getting user");
  }
};

// Add a new video
export const addVideo = async (videoData: VideoData) => {
  try {
    logOperation("addVideo", { title: videoData.title });
    const docRef = await addDoc(collection(db, "videos"), videoData);
    console.log("✅ Video added successfully:", docRef.id);
    return docRef.id;
  } catch (e) {
    handleFirestoreError(e as FirestoreError, "adding video");
  }
};

// Get all videos
export const getVideos = async () => {
  try {
    logOperation("getVideos");
    const querySnapshot = await getDocs(collection(db, "videos"));
    console.log(`📥 Retrieved ${querySnapshot.size} videos`);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (e) {
    handleFirestoreError(e as FirestoreError, "getting videos");
  }
};

// Like a video
export const likeVideo = async (videoId: string, userId: string) => {
  try {
    const videoRef = doc(db, "videos", videoId);
    await updateDoc(videoRef, {
      likes: arrayUnion(userId),
    });
  } catch (e) {
    handleFirestoreError(e as FirestoreError, "liking video");
  }
};

// Comment on a video
export const commentOnVideo = async (
  videoId: string,
  commentData: CommentData
) => {
  try {
    const videoRef = doc(db, "videos", videoId);
    await updateDoc(videoRef, {
      comments: arrayUnion(commentData),
    });
  } catch (e) {
    handleFirestoreError(e as FirestoreError, "commenting on video");
  }
};

// Test database connection
export const testConnection = async () => {
  try {
    await getDocs(collection(db, "videos"));
    console.log("Firebase connection successful");
    return true;
  } catch (e) {
    console.error("Firebase connection failed:", e);
    handleFirestoreError(e as FirestoreError, "testing connection");
    return false;
  }
};
