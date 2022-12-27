// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyp3-IuQc6CagK4t4a84biT6MRhiDdY4E",
  authDomain: "labuff-8c713.firebaseapp.com",
  projectId: "labuff-8c713",
  storageBucket: "labuff-8c713.appspot.com",
  messagingSenderId: "413000526845",
  appId: "1:413000526845:web:ea67742d2f1637103f4794"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore()