import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCdAUnJz1PwpSHP_TFIFbAuRlV8jc9fI4M",
  authDomain: "tareaau-b0744.firebaseapp.com",
  projectId: "tareaau-b0744",
  storageBucket: "tareaau-b0744.appspot.com",
  messagingSenderId: "805965577324",
  appId: "1:805965577324:web:10333b10c2363ab73fac49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db= getDatabase(app)
export const storage = getStorage(app)