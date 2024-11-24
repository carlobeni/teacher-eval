// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database"
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdNaWMkQUI92NvA2cC2NPb24L6Efvyv5w",
  authDomain: "test-login-fiuna.firebaseapp.com",
  projectId: "test-login-fiuna",
  storageBucket: "test-login-fiuna.firebasestorage.app",
  messagingSenderId: "833627566648",
  appId: "1:833627566648:web:f267de8fc77eca758c2ccd",
  measurementId: "G-3E7XGXFK5R"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const database = getDatabase(app);

