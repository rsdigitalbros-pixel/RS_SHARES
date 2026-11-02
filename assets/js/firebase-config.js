// Firebase Web App configuration.
// Replace every placeholder with the values from Firebase Console > Project settings > Your apps.
// Firebase web config is public by design. NEVER put service-account private keys here.
export const firebaseConfig = {
  apiKey: "PASTE_YOUR_FIREBASE_API_KEY",
  authDomain: "PASTE_YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "PASTE_YOUR_PROJECT_ID",
  appId: "PASTE_YOUR_FIREBASE_APP_ID"
};
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfRlNZUOMWahyzuvXm5L2ZQBDtHZIv3aA",
  authDomain: "rs-digital-market.firebaseapp.com",
  projectId: "rs-digital-market",
  storageBucket: "rs-digital-market.firebasestorage.app",
  messagingSenderId: "286507356588",
  appId: "1:286507356588:web:e51969fd937003d94c2a09",
  measurementId: "G-T0LJ8V69ZQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
