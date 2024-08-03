// src/firebase/config.js

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, isSignInWithEmailLink, signInWithEmailLink, sendSignInLinkToEmail, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBPiGGSDxcT431h8HvGa2SHAZKyjgTfyQ4",
  authDomain: "snapmydesign.firebaseapp.com",
  projectId: "snapmydesign",
  storageBucket: "snapmydesign.appspot.com",
  messagingSenderId: "61619668171",
  appId: "1:61619668171:web:999ecb99b2a0135cd0c74e",
  measurementId: "G-CYQ2YMK4GZ"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, isSignInWithEmailLink, signInWithEmailLink, sendSignInLinkToEmail, signInWithPopup, firebaseConfig, db };

