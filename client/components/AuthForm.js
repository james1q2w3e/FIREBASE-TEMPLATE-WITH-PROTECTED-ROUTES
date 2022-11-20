import React, {useState} from 'react';
import history from '../history'
import {connect} from 'react-redux';
import {authenticate} from '../store';
// import { app } from '../firebaseConfig';
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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
import { useAuthState } from 'react-firebase-hooks/auth';

// const auth = getAuth();

class firebaseLogin extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  
  componentDidMount() {
    onAuthStateChanged(auth, (user) => {
      this.setState({
        currentUser: auth
      })
    })

    // console.log(auth);
    // this.setState({
    //   currentUser: auth
    // })

  }

  // sign IN form
  handleLogin(evt) {
    evt.preventDefault();
    const email = evt.target.email.value
    const password = evt.target.password.value

    // const auth = getAuth();
    signInWithEmailAndPassword(this.state.currentUser, email, password)
      .then((cred) => {
        history.push('/home')
        console.log('user logged in:', cred.user);
      })
      .catch((e) => {
        console.log(e.message);
      })
  }

  handleSignup(evt) {
    evt.preventDefault();
    const email = evt.target.email.value
    const password = evt.target.password.value

    // const auth = getAuth();
    createUserWithEmailAndPassword(this.state.currentUser, email, password)
      .then((cred) => {
        history.push('/home')
        console.log('user logged in:', cred.user);
      })
      .catch((e) => {
        console.log(e.message);
      })
  }

  handleLogout() {
    // if(this.state.currentUser.currentUser === null) {
    //   console.log('no logged in user / handleLogout()');
    // }

    console.log("currentUser:", this.state.currentUser.currentUser);
    signOut(this.state.currentUser)
      .then(() => {
        console.log('user logged out:');
      })
      .catch((e) => {
        console.log(e.message);
      })
  }

  render() {
    console.log(this.state.currentUser?.currentUser);
    const currentUser = this.state.currentUser?.currentUser
    // console.log(user);

    return (
      <div>
        <form onSubmit={this.handleLogin}>
          <div>
            <input name="email" type="text" placeholder='Email' htmlFor="email" />
          </div>
          <div>
            <input name="password" type="text" placeholder='Password' htmlFor="password" />
          </div>
          <div>
            <button type='submit'>Submit</button>
          </div>
          {/* {error && error.response && <div> {error.response.data} </div>} */}
        </form>

        <h2>SIGN UP BOI</h2>
        <form onSubmit={this.handleSignup}>
          <div>
            <input name="email" type="text" placeholder='Email' htmlFor="email" />
          </div>
          <div>
            <input name="password" type="text" placeholder='Password' htmlFor="password" />
          </div>
          <div>
            <button type='submit'>Submit</button>
          </div>
          {/* {error && error.response && <div> {error.response.data} </div>} */}
        </form>

        <button onClick={this.handleLogout}>LOGOUT</button>

      </div>
    )
  }
}

// const firebaseLogin = () => {
//   // const {name, displayName, handleSubmit, error} = props
//   let auth = getAuth();
//   const [data, setData] = useState({})

//   const handleInput = (evt) => {
//     let newInput = { [evt.target.name]: evt.target.value }

//     setData({ ...data, ...newInput })
//   }

//   const handleSubmit = () => {
//     createUserWithEmailAndPassword(auth, data.email, data.password)
//     .then((response) => {
//       console.log(response.user);
//     })
//     .catch((err) => {
//       alert(err.message)
//     })
//   }

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <input name="email" type="text" placeholder='Email' onChange={(evt) => {handleInput(evt)}} />
//         </div>
//         <div>
//         <input name="password" type="text" placeholder='Password' onChange={(evt) => {handleInput(evt)}} />
//         </div>
//         <div>
//           <button>Submit</button>
//         </div>
//         {/* {error && error.response && <div> {error.response.data} </div>} */}
//       </form>
//     </div>
//   )
// }

export default connect()(firebaseLogin)




// const AuthForm = props => {
//   const {name, displayName, handleSubmit, error} = props

//   return (
//     <div>
//       <form onSubmit={handleSubmit} name={name}>
//         <div>
//           <label htmlFor="username">
//             <small>Username</small>
//           </label>
//           <input name="username" type="text" />
//         </div>
//         <div>
//           <label htmlFor="password">
//             <small>Password</small>
//           </label>
//           <input name="password" type="password" />
//         </div>
//         <div>
//           <button type="submit">{displayName}</button>
//         </div>
//         {error && error.response && <div> {error.response.data} </div>}
//       </form>
//     </div>
//   )
// }

// /**
//  * CONTAINER
//  *   Note that we have two different sets of 'mapStateToProps' functions -
//  *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
//  *   function, and share the same Component. This is a good example of how we
//  *   can stay DRY with interfaces that are very similar to each other!
//  */
// const mapLogin = state => {
//   return {
//     name: 'login',
//     displayName: 'Login',
//     error: state.auth.error
//   }
// }

// const mapSignup = state => {
//   return {
//     name: 'signup',
//     displayName: 'Sign Up',
//     error: state.auth.error
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     handleSubmit(evt) {
//       evt.preventDefault()
//       const formName = evt.target.name
//       const username = evt.target.username.value
//       const password = evt.target.password.value
//       dispatch(authenticate(username, password, formName))
//     }
//   }
// }

// export const Login = connect(mapLogin, mapDispatch)(AuthForm)
// export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
