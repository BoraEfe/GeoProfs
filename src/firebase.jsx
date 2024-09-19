// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeF1eLicWbJue_SffyVvfEFgOPx0ujwwM",
  authDomain: "geoprofs-49296.firebaseapp.com",
  projectId: "geoprofs-49296",
  storageBucket: "geoprofs-49296.appspot.com",
  messagingSenderId: "1071003198844",
  appId: "1:1071003198844:web:8d191acc4970d49e1070f9",
  measurementId: "G-L6D537NFYF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
export { db };