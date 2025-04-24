// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBA2V6DpOSThW-3cGh1oYi5mUVv-hyf1b4",
  authDomain: "portfolio-project-crud-new-app.firebaseapp.com",
  projectId: "portfolio-project-crud-new-app",
  storageBucket: "portfolio-project-crud-new-app.firebasestorage.app",
  messagingSenderId: "540888367059",
  appId: "1:540888367059:web:6873a27573b50cf53e7926",
  measurementId: "G-4PFLYGZDT9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);