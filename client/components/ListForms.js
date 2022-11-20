import React, {useState} from "react";
import {connect} from 'react-redux'
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
import { db } from "../firebaseConfig";


// export default function ListForms() {

//   const [forms, setForms] = useState([])

//   function getForms() {
//     const formCollectionRef = collection(db, 'forms')
//     const q = query(formCollectionRef, orderBy('createdAt'))
//     onSnapshot(q, (snapshot) => {
//       let forms = []
//       snapshot.docs.forEach((doc) => {
//         forms.push({ ...doc.data(), id: doc.id })
//       })
//       console.log(forms);
//     })
//   }

//   return (
//     <div>
//       <h2>List Forms</h2>
//     </div>
//   )
// }

class ListForms extends React.Component {
  constructor() {
    super();
    this.state = {
      forms: []
    }
  }

  getForms() {
    const formCollectionRef = collection(db, 'forms')
    const q = query(formCollectionRef, orderBy('createdAt'))
    onSnapshot(q, (snapshot) => {
      let forms = []
      snapshot.docs.forEach((doc) => {
        forms.push({ ...doc.data(), id: doc.id })
      })
      this.setState({
        forms: forms
      })
    })
  }

  componentDidMount() {
    this.getForms()
  }

  render() {
    const { forms } = this.state
    console.log(forms);

    return (
      <div>
        <h2>List Forms</h2>
        {forms.map((form) => {
          return (
            <div key={form.id}>
              <div>{form.title}</div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default connect()(ListForms)