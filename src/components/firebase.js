// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDRH3FFiCzcX_FeG6jrtRJedA58jmCCdH4",
  authDomain: "instabyvaishali.firebaseapp.com",
  projectId: "instabyvaishali",
  storageBucket: "instabyvaishali.appspot.com",
  messagingSenderId: "317255263530",
  appId: "1:317255263530:web:0eef1bd5f30b8ea06eaa53",
  measurementId: "G-FJ68NWV7GC"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);
const storageRef = ref(storage);

// window.firebase = firebase;
// export default firebase;

export { firebaseConfig, db, auth, storage, storageRef, ref };
