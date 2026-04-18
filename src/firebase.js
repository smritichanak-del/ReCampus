import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBn2YNz0zHmUXBpg6kyuGLs5zaNyxv6kg4",
  authDomain: "recampus-46bea.firebaseapp.com",
  projectId: "recampus-46bea",
  storageBucket: "recampus-46bea.firebasestorage.app",
  messagingSenderId: "1034865368702",
  appId: "1:1034865368702:web:9d0e2a7ca797e67231822f",
  measurementId: "G-H85XPJY46F",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);