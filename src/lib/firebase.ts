// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcOqyzodvTQb0OZezrRCZB_vrAHrcW0zo",
  authDomain: "visaapply-21410.firebaseapp.com",
  projectId: "visaapply-21410",
  storageBucket: "visaapply-21410.firebasestorage.app",
  messagingSenderId: "517653958537",
  appId: "1:517653958537:web:50c8cf754e7841b2acdb58"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
