// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChsi0nHvuS-Gon8TjA_lbW8XDIKYELclM",
  authDomain: "geoprofs-42c95.firebaseapp.com",
  projectId: "geoprofs-42c95",
  storageBucket: "geoprofs-42c95.appspot.com",
  messagingSenderId: "512826744462",
  appId: "1:512826744462:web:64c8a81f1fecbc373633df",
  measurementId: "G-SY2XWQWTCT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);