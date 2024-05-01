// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB38MN05Z5jAeENiad1WoLLXVd62eNn3ds",
  authDomain: "vite-contacts-fd724.firebaseapp.com",
  projectId: "vite-contacts-fd724",
  storageBucket: "vite-contacts-fd724.appspot.com",
  messagingSenderId: "564388859921",
  appId: "1:564388859921:web:7c25dd70cc507dc00fa1b0",
  measurementId: "G-MXK4V62RSJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db= getFirestore(app)