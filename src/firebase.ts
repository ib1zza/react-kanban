// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjYH0iLFHrue19VL5_-TEA3OlPMe4z3gA",
  authDomain: "react-kanban-9313f.firebaseapp.com",
  projectId: "react-kanban-9313f",
  storageBucket: "react-kanban-9313f.appspot.com",
  messagingSenderId: "28093797044",
  appId: "1:28093797044:web:00ce3261dc89b715d67de1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
