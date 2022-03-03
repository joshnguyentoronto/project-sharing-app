import "./AccountPage.css"
import React, { Component } from 'react'
import SignUpForm from "../../components/SignUp/Signup"


export default class AccountPage extends Component {
    state={
        firstName: '',
        lastName: '',
        username:'',
        email:'',
    }

    render() {
        return(
            <div className="account">
                <h1>Account Sign in</h1>
                <SignUpForm/>

            </div>
        )
    }
}