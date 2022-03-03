import React, { Component } from 'react';
import { Route, Routes, Switch, Redirect } from 'react-router-dom'
import './App.css';
import HomePage from '../HomePage/HomePage';
import AccountPage from '../AccountPage/AccountPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import Login from '../../components/Login/Login';


export default class App extends Component {
  render() {
    return (
      <main className="App">
        <Routes>
          <Route 
            exact path="/" 
            element= {<HomePage/>}
          />
          <Route 
            path="/profile" 
            element= {<ProfilePage/>}
          />
          <Route path="account" element= {<AccountPage/>}/>
    

        </Routes>
        {/* should use useHistory, useLocation, and useParams if we want to use
        the same }
          {/* <Route exact path="/" render={(props) => (
            <HomePage {...props}/>
            )}/>
          <Route path="/profile" render={(props) => (
            < ProfilePage {...props}/>
          )}/>
          <Route path="/account" render={(props) => (
            <AccountPage {...props}/>
          )}/> */}
          {/* based on v6 react recommends doing any redirects on the server side 
          this is better for faster responses on the web server
          <Redirect to="/" /> */}
      </main>
    );
  }
}