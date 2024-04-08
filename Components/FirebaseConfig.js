import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyAHa6N8HBUmrwdlnEeQgD9DI9QLNi6-V5Y",
  authDomain: "lab03mobiledev.firebaseapp.com",
  projectId: "lab03mobiledev",
  storageBucket: "lab03mobiledev.appspot.com",
  messagingSenderId: "878924884094",
  appId: "1:878924884094:web:9fd27941a64b514a3b902f"};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
