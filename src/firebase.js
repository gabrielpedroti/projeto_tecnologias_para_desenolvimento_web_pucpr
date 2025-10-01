// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmmizF9MrK2dx_nrSDVxf_BF3ZFdCdAqw",
  authDomain: "as2---tecnologias-para-dev-web.firebaseapp.com",
  projectId: "as2---tecnologias-para-dev-web",
  storageBucket: "as2---tecnologias-para-dev-web.appspot.com",
  messagingSenderId: "263730420237",
  appId: "1:263730420237:web:f5c6fe8cd40c7d6a1ed344",
  measurementId: "G-64MXPNWW7Q"
};

// Inicializa app
export const app = initializeApp(firebaseConfig);

// Serviços que vamos usar
export const auth = getAuth(app);
export const db   = getFirestore(app);
