// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3LE-Rotx6aFYOCh5PMgBGI9ZOJhcHYVU",
  authDomain: "expese-70c96.firebaseapp.com",
  projectId: "expese-70c96",
  storageBucket: "expese-70c96.appspot.com",
  messagingSenderId: "611401275080",
  appId: "1:611401275080:web:93a4dde982c11138fb37fd",
  measurementId: "G-R1MPXYSBFS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const myFS = getFirestore(app)


