import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import './App.css';
import HomePage from '../HomePage/HomePage';
import AccountPage from '../AccountPage/AccountPage';
import ProfilePage from '../ProfilePage/ProfilePage';


export default class App extends Component {
  render() {
    return (
      <main className="App">
        <Switch>
          <Route path="/profile" render={(props) => (
            < ProfilePage {...props}/>
          )}/>
          <Route path="/account" render={(props) => (
            <AccountPage {...props}/>
          )}/>
          <Route path="/" render={(props) => (
            <HomePage {...props}/>
          )}/>
          <Redirect to="/" />
        </Switch>
      </main>
    );
  }
}