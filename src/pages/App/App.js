import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom'
import './App.css';
import HomePage from '../HomePage/HomePage';
import AccountPage from '../AccountPage/AccountPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import Login from '../../components/Login/Login';
import SignUpForm from '../../components/SignUp/Signup';


export default class App extends Component {
state = {
  user: null
}

setUserInState = (incomingUserData) => {
  this.setState({ user: incomingUserData})
}

  render() {
    return (
      <main className="App">
        <Routes>
          <Route 
            path="/" 
            element= {<HomePage/>}
          />
          <Route 
            path="/profile" 
            element= {<ProfilePage/>}
          />
          <Route path="account" element= {<AccountPage/>}>
            <Route path="login" element={<Login/>}/>
            <Route path="signup" element={<SignUpForm/>}/>
          </Route>
        </Routes>
      </main>
    );
  }
}


 /* should use useHistory, useLocation, and useParams if we want to use
        the same }
          {/* <Route exact path="/" render={(props) => (
            <HomePage {...props}/>
            )}/>
          <Route path="/profile" render={(props) => (
            < ProfilePage {...props}/>
          )}/>
          <Route path="/account" render={(props) => (
            <AccountPage {...props}/>
          )}/> */
          /* based on v6 react recommends doing any redirects on the server side 
          this is better for faster responses on the web server
          <Redirect to="/" /> */