// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database"
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQDConDrltB2CmZ6kizAHpe7TzWxaN0bs",
  authDomain: "biocareai.firebaseapp.com",
  databaseURL: "https://biocareai-default-rtdb.firebaseio.com",
  projectId: "biocareai",
  storageBucket: "biocareai.appspot.com",
  messagingSenderId: "765804094663",
  appId: "1:765804094663:web:c7010dc0d5483ead220ae2",
  measurementId: "G-N94M9453XP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const database = getDatabase(app);

