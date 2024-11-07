import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeF1eLicWbJue_SffyVvfEFgOPx0ujwwM",
  authDomain: "geoprofs-49296.firebaseapp.com",
  projectId: "geoprofs-49296",
  storageBucket: "geoprofs-49296.appspot.com",
  messagingSenderId: "1071003198844",
  appId: "1:1071003198844:web:8d191acc4970d49e1070f9",
  measurementId: "G-L6D537NFYF"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Conditionally initialize analytics if supported
let analytics;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

// Initialize Firestore and export it
const db = getFirestore(app);
export { db };
