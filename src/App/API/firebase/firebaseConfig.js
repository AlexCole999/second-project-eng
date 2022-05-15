import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { useSelector } from 'react-redux';
import { getDoc, setDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCu_dkznKgP8ZxVTwvkNbAnGdTluiIO5eU",
  authDomain: "firstfirebase-04-08-2021.firebaseapp.com",
  projectId: "firstfirebase-04-08-2021",
  storageBucket: "firstfirebase-04-08-2021.appspot.com",
  messagingSenderId: "53473763739",
  appId: "1:53473763739:web:a641946d7b4760eb33413e",
  measurementId: "G-GDBP4GBHYF"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const provider = new GoogleAuthProvider();

const auth = getAuth();

export { app, db, provider, auth };