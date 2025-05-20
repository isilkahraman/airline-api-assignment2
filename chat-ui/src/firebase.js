// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZYwQkTqIiOPAgTaGYjNgx_61D5OaBTZg",
  authDomain: "ai-airline-agent.firebaseapp.com",
  projectId: "ai-airline-agent",
  storageBucket: "ai-airline-agent.firebasestorage.app",
  messagingSenderId: "39613691574",
  appId: "1:39613691574:web:7a5b3f94aac5fa0d4e1817",
  measurementId: "G-MYB5CW9R3G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);