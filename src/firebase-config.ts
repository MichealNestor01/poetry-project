// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBum7UPGUL-luYIJYjMB9m3PG-hxec0a7o",
  authDomain: "poetry-project-e911b.firebaseapp.com",
  projectId: "poetry-project-e911b",
  storageBucket: "poetry-project-e911b.appspot.com",
  messagingSenderId: "696456607639",
  appId: "1:696456607639:web:a0a7a935e1dadb4a3b76d2",
  measurementId: "G-ZNLMM2YZ22",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
