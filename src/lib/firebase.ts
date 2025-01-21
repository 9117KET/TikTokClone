// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { Analytics, getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIdJziYsmoNSlxPNzWgQxBFhyesmd5mvM",
  authDomain: "popreel-21a8c.firebaseapp.com",
  projectId: "popreel-21a8c",
  storageBucket: "popreel-21a8c.firebasestorage.app",
  messagingSenderId: "1047787860394",
  appId: "1:1047787860394:web:87d27d3ea778c8d101bbd3",
  measurementId: "G-X1LXRKKSSG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only on client side
let analytics: Analytics | undefined;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export const db = getFirestore(app);
export { analytics };
