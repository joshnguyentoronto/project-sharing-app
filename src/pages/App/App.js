import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom'
import './App.css';
import HomePage from '../HomePage/HomePage';
import AccountPage from '../AccountPage/AccountPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import Login from '../../components/Login/Login';
import SignUpForm from '../../components/SignUp/Signup';
import UserSetUpPage from '../UserSetUpPage/UserSetUpPage';


export default class App extends Component {
  state = {
    user: null
  }

  setUserInState = (incomingUserData) => {
    this.setState({ user: incomingUserData})
  }

  userLogout = () =>{
    console.log('logout')
    let token = localStorage.getItem('token')
    if (token){
      token= null
      localStorage.removeItem('token')
      this.setState({user:null})
    }
  }

  componentDidMount(){
    let token = localStorage.getItem('token')
    if (token){
      const payload = JSON.parse(atob(token.split('.')[1]))
      if (payload.exp < Date.now() /1000) {
        localStorage.removeItem('token')
        token= null
      } else {
        let userDoc = payload.user
        this.setState({user:userDoc})
      }
    }
  }

  render() {
    return (
      <main className="App">
        <Routes>
          <Route 
            path="/" 
            element= {<HomePage user={this.state.user} userLogout={this.userLogout}/>}
          />
          <Route 
            path="/profile" 
            element= {<ProfilePage/>}
          />
          <Route path="account" element= {<AccountPage/>}>
            <Route path="login" element={<Login setUserInState={this.setUserInState}/>}/>
            <Route path="signup" element={<SignUpForm setUserInState={this.setUserInState}/>}/>
            <Route path="setup" element={<UserSetUpPage setUserInState={this.setUserInState}/>}/>
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