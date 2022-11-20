import React from 'react'
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
import { db, auth } from "../firebaseConfig";

// export const Home = props => {
//   console.log(props);
//   const email = props.auth.currentUser.email

//   return (
//     <div>
//       <h3>Welcome, {email}</h3>
//     </div>
//   )
// }

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    }
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.setState({
          currentUser: user
        })
      } else {
        console.log('no logged in user');
      }
    })
  }

  handleLogout() {
    // if(this.state.currentUser.currentUser === null) {
    //   console.log('no logged in user / handleLogout()');
    // }

    console.log("currentUser:", auth.currentUser);
    signOut(auth)
      .then(() => {
        console.log('user logged out:', auth.currentUser);
      })
      .catch((e) => {
        console.log(e.message);
      })
  }

  render() {
    // console.log(this.state.currentUser?.currentUser);
    console.log(this.state.currentUser);
    // const { email } = this.state.currentUser
    const email = this.state.currentUser?.email

    return (
      <div>
        <h3>Welcome, {email}</h3>
        <h3> home</h3>
        {/* <button onClick={this.handleLogout}>LOGOUT</button> */}
      </div>
    )
  
  }
}


// const mapState = state => {
//   return {
//   }
// }

// export default connect(mapState)(Home)
export default connect()(Home)
