// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLu6J_nrQ9Cvo5C6Tkm4A8mnsnz4w7T9E",
  authDomain: "app-react-native-bruno-2025.firebaseapp.com",
  projectId: "app-react-native-bruno-2025",
  storageBucket: "app-react-native-bruno-2025.appspot.com",
  messagingSenderId: "545835475795",
  appId: "1:545835475795:web:9f0c8009bff8417128f7a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics =getAnalytics(app);
export const auth =getAuth(app);
export const db = getFirestore(app);
