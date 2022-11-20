import React from 'react'
import history from '../history'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {logout} from '../store'
import { Nav, NavLink, Navbar, NavDropdown, Container } from "react-bootstrap"; // not efficient
import { db, auth } from "../firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut, signInWithEmailAndPassword,
  onAuthStateChanged, 
} from 'firebase/auth'

class NavigationBar extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    }
    this.handleSignout = this.handleSignout.bind(this)
  }

  componentDidMount() {
    onAuthStateChanged(auth, (user) => {
      this.setState({
        currentUser: auth
      })
    })
  }

  handleSignout() {
    signOut(auth)
    .then(() => {
      console.log('the user logged out');
      history.push('/login')
    })
    .catch((e) => {
      console.log(e.message);
    })
    
  }

  render() {
    // const isLoggedIn = auth.currentUser
    // console.log(isLoggedIn);

    console.log(this.state.currentUser?.currentUser);
    const isLoggedIn = this.state.currentUser?.currentUser

    return (
      <Navbar bg="dark" expand="lg" variant="dark" >
    <Navbar.Brand>FS-App-Template</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Nav className="me-auto nav-tabs navbar-dark" variant="tabs" defaultActiveKey="/">
    <Container>
      {isLoggedIn ? (
        <Nav>
          {/* The navbar will show these links after you log in */}
          <Nav.Link eventKey="/home" as={Link} to="/home" className="NavLink">Home</Nav.Link>
          {/* <Nav.Link className='NavLink' eventKey="/" as={Link} to='/login' onClick={handleClick}>
            Logout
          </Nav.Link> */}
          <Nav.Link eventKey="/list" as={Link} to="/list" className="NavLink">LIST</Nav.Link>
          <Nav.Link eventKey="/" as={Link} to="/" className="NavLink" onClick={this.handleSignout}>LOGOUT</Nav.Link>
          {/* <button onClick={() => {signOut(auth).then(() => {console.log('user signed out')})}}>LOGOUT</button> */}
        </Nav>
      ) : (
        <Nav>
          {/* The navbar will show these links before you log in */}
          <Nav.Link eventKey="/login" as={Link} to='/login' className="NavLink">Login</Nav.Link>
          <Nav.Link eventKey="/signup" as={Link} to='/signup' className="NavLink">Sign Up</Nav.Link>
          <Nav.Link eventKey="/list" as={Link} to="/list" className="NavLink">LIST</Nav.Link>
        </Nav>
      )}
    </Container>
    </Nav>
    <hr />
  </Navbar>
    )
  }
}


// const NavigationBar = ({handleClick, isLoggedIn}) => (
//   <Navbar bg="dark" expand="lg" variant="dark" >
//     <Navbar.Brand>FS-App-Template</Navbar.Brand>
//     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//     <Nav className="me-auto nav-tabs navbar-dark" variant="tabs" defaultActiveKey="/">
//     <Container>
//       {isLoggedIn ? (
//         <Nav>
//           {/* The navbar will show these links after you log in */}
//           <Nav.Link eventKey="/home" as={Link} to="/home" className="NavLink">Home</Nav.Link>
//           <Nav.Link className='NavLink' eventKey="/" as={Link} to='/login' onClick={handleClick}>
//             Logout
//           </Nav.Link>
//           <Nav.Link eventKey="/list" as={Link} to="/list" className="NavLink">LIST</Nav.Link>
//           <Nav.Link eventKey="/" as={Link} to="/login" className="NavLink" onClick={() => {signOut(auth).then(() => {console.log('user signed out')})}}>LIST</Nav.Link>
//           {/* <button onClick={() => {signOut(auth).then(() => {console.log('user signed out')})}}>LOGOUT</button> */}
//         </Nav>
//       ) : (
//         <Nav>
//           {/* The navbar will show these links before you log in */}
//           <Nav.Link eventKey="/login" as={Link} to='/login' className="NavLink">Login</Nav.Link>
//           <Nav.Link eventKey="/signup" as={Link} to='/signup' className="NavLink">Sign Up</Nav.Link>
//           <Nav.Link eventKey="/list" as={Link} to="/list" className="NavLink">LIST</Nav.Link>
//         </Nav>
//       )}
//     </Container>
//     </Nav>
//     <hr />
//   </Navbar>
// )

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // isLoggedIn: auth.currentUser
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default (connect(mapState, mapDispatch)(NavigationBar))
