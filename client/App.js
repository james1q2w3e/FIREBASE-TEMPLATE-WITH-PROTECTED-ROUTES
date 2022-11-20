import React from 'react'
import NavigationBar from './components/NavigationBar'
import Routes from './Routes'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut, signInWithEmailAndPassword,
  onAuthStateChanged, 
} from 'firebase/auth'
import { auth } from './firebaseConfig';

import FirebaseAuthContext from './firebaseAuthContext';

// const App = () => {
//   return (
//     <div>
//       <NavigationBar />
//       <Routes />
//     </div>
//   )
// }



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    }
  }
  
  componentDidMount() {
    // const auth = getAuth();
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

  render() {
    const {currentUser} = this.state

    return (
      <div>
        <NavigationBar />
        <FirebaseAuthContext>
          <Routes />
        </FirebaseAuthContext>
        {/* <Routes /> */}
      </div>
    )
  }
}

export default App
