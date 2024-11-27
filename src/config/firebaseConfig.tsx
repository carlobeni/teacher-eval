import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);

//CRUD PARA COMENTARIOS
export const createComentario = async (nuevoComentario: {}) => {
  //crear una referencia del nuevo documento en firebase
  const cid = uuidv4();
  const docRef = doc(database, "Comentarios", cid);
  await setDoc(docRef, nuevoComentario);
};
export const createReview = async (nuevoReview: {}) => {
  //crear una referencia del nuevo documento en firebase
  const rid = uuidv4();
  const documentRef = doc(database, "Reviews", rid);
  await setDoc(documentRef, nuevoReview);
};
