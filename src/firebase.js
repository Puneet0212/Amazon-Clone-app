// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfb4YgtmRGB63lB9Dm3tHBB8sHM0oE-s0",
  authDomain: "app-clone-ca980.firebaseapp.com",
  projectId: "app-clone-ca980",
  storageBucket: "app-clone-ca980.appspot.com",
  messagingSenderId: "73168621870",
  appId: "1:73168621870:web:afcf7a5806230490ffaabf",
  measurementId: "G-R12ZYKXJ1R"
};



firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

export {db, auth};