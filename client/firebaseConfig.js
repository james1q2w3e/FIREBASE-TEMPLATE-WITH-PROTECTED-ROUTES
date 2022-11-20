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
  apiKey: "AIzaSyB9Bxodoc0pX2rye8dUy0-SbCuwXqBjdqU",
  authDomain: "fir-fca1a.firebaseapp.com",
  projectId: "fir-fca1a",
  storageBucket: "fir-fca1a.appspot.com",
  messagingSenderId: "1039668960981",
  appId: "1:1039668960981:web:9f6160e05527904ab94c5c"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp)

// export default firebaseApp;
export const db = getFirestore(firebaseApp);

// // initialize services
// const db = getFirestore();
// const auth = getAuth();

// // collection ref
// const colRef = collection(db, 'forms')

// // queries
// // const q = query(colRef, where("title", '==', 'CIF Checkout'), orderBy('createdAt'))
// const q = query(colRef, orderBy('createdAt'))


// // get (real-time) collection data
// onSnapshot(q, (snapshot) => {
//   let forms = []
//   snapshot.docs.forEach((doc) => {
//     forms.push({ ...doc.data(), id: doc.id })
//   })
//   console.log(forms);
// })

// // adding docs
// const addFormForm = document.querySelector('.add')
// addFormForm.addEventListener('submit', (e) => {
//   e.preventDefault()
  
//   addDoc(colRef, {
//     title: addFormForm.title.value,
//     createdAt: serverTimestamp()
//   })
//   .then(() => {
//     addFormForm.reset()
//   })
// })

// // deleting docs
// const deleteFormForm = document.querySelector('.delete')
// deleteFormForm.addEventListener('submit', (e) => {
//   e.preventDefault();

//   const docRef = doc(db, 'forms', deleteFormForm.id.value)
//   deleteDoc(docRef)
//     .then(() => {
//       deleteFormForm.reset()
//     })
// })

// // get a single document
// // const docRef = doc(db, 'forms', 'mDrB37DEifKXakmDaNFv')

// // onSnapshot(docRef, (doc) => {
// //   console.log(doc.data(), doc.id);
// // })

// // updating a document
// const updateFormForm = document.querySelector('.update')
// updateFormForm.addEventListener('submit', (e) => {
//   e.preventDefault();

//   const docRef = doc(db, 'forms', updateFormForm.id.value)
//   updateDoc(docRef, {
//     title: 'updated title' // idealy pass in the value of a form the user types into
//   })
//     .then(() => {
//       updateFormForm.reset();
//     })
// })

// // signing users up
// const signupForm = document.querySelector('.signup')
// signupForm.addEventListener('submit', (e) => {
//   e.preventDefault();

//   const email = signupForm.email.value
//   const password = signupForm.password.value

//   createUserWithEmailAndPassword(auth, email, password)
//     .then((cred) => { // takes in the created user credentials
//       // console.log('user created:', cred.user);
//       signupForm.reset();
//     })
//     .catch((e) => {
//       console.log('ERROR:', e.message);
//     })
// })

// // logout form
// const logoutButton = document.querySelector('.logout')
// logoutButton.addEventListener('click', () => {
//   signOut(auth)
//     .then(() => {
//       // console.log('the user logged out');
//     })
//     .catch((e) => {
//       console.log(e.message);
//     })
// })

// // login form
// const loginForm = document.querySelector('.login')
// loginForm.addEventListener('submit', (e) => {
//   e.preventDefault();

//   const email = loginForm.email.value;
//   const password = loginForm.password.value;

//   signInWithEmailAndPassword(auth, email, password)
//     .then((cred) => {
//       // console.log('user logged in:', cred.user);
//     })
//     .catch((e) => {
//       console.log(e.message);
//     })
// })

// // subscribing to auth changes
// onAuthStateChanged(auth, (user) => {
//   console.log('user status changed:', user);
// })

// //unsubing from changes (auth & db)
