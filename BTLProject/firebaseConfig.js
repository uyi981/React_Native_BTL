
// Firebase Imports
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyDSFRZg00r3cHB1DILPhJzTMxbfmuDlcK8",
  authDomain: "md01-30c45.firebaseapp.com",
  projectId: "md01-30c45",
  storageBucket: "md01-30c45.firebasestorage.app",
  messagingSenderId: "38318185430",
  appId: "1:38318185430:web:d705b581bba6b315a1e277",
  measurementId: "G-VV12TE31LJ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(); 
export const db = getFirestore(app);
export default app;


