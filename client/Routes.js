import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
// import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import {me} from './store'
import firebaseLogin from './components/AuthForm'
import ListForms from './components/ListForms'
import { auth } from './firebaseConfig';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut, signInWithEmailAndPassword,
  onAuthStateChanged, 
} from 'firebase/auth'

import ProtectedRoute from './ProtectedRoute';


/**
 * COMPONENT
 */
class Routes extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    }
  }
  componentDidMount() {
    // this.props.loadInitialData()
    // const auth = getAuth();
    // this.setState({
    //   currentUser: auth
    // })
    onAuthStateChanged(auth, (user) => {
      this.setState({
        currentUser: auth
      })
    })
  }

  render() {
    // console.log(auth.currentUser);
    // const isLoggedIn = auth.currentUser
    console.log(this.state.currentUser?.currentUser);
    const isLoggedIn = this.state.currentUser?.currentUser

    return (
      <div>
        {isLoggedIn ? (
          <Switch> {console.log('is logged in')}
            {/* <Route path="/home" component={Home} /> */}
            {/* <Route path='/list' component={ListForms} /> */}

            {/* using a ProtectedRoute, extra security ? */}

            <ProtectedRoute redirectTo="/login" exact path='/home' component={Home}>
              <Route path='/home' component={Home} />
            </ProtectedRoute>

            <ProtectedRoute redirectTo="/login" exact path='/list' component={ListForms}>
              <Route path='/list' component={ListForms} />
            </ProtectedRoute>

            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch> {console.log('NOT logged in')}
            <Route path='/' exact component={ firebaseLogin } />

            <ProtectedRoute redirectTo="/login" exact path='/home' component={Home}>
              <Route path='/home' component={Home} />
            </ProtectedRoute>

            <ProtectedRoute redirectTo="/login" exact path='/list' component={ListForms}>
              <Route path='/list' component={ListForms} />
            </ProtectedRoute>

            <Route path="/login" component={firebaseLogin} />
            {/* <Route path="/signup" component={Signup} /> */}
            
          </Switch>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    // isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
