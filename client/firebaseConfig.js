import { initializeApp } from "firebase/app";
import { 
  getFirestore, collection, onSnapshot, 
  addDoc, deleteDoc, doc,
  query, where,
  orderBy, serverTimestamp,
  getDoc, updateDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut, signInWithEmailAndPassword,
  onAuthStateChanged, 

} from 'firebase/auth'

const firebaseConfig = {
  // HERE IS WHERE YOU ADD IN YOUR CUSTOM CONFIG WHEN YOU CREATE A PROJECT FROM FIREBASE/FIRESTORE. READ THE README.MD FOR FURTHER DETAILS.
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp)

// export default firebaseApp;
export const db = getFirestore(firebaseApp);
