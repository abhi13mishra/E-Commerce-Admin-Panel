// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbL8oitE-9jZIHaSFxP6S0BRhiloCBJ6o",
  authDomain: "e-commerce-1a559.firebaseapp.com",
  databaseURL: "https://e-commerce-1a559-default-rtdb.firebaseio.com",
  projectId: "e-commerce-1a559",
  storageBucket: "e-commerce-1a559.firebasestorage.app",
  messagingSenderId: "696584774045",
  appId: "1:696584774045:web:12ad75ad0c86c133104f74",
  measurementId: "G-D1WHT7WJR8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);