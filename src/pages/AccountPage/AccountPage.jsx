import "./AccountPage.css"
import React, { Component } from 'react'
import { Link, Outlet } from 'react-router-dom'
import SignUpForm from "../../components/SignUp/Signup"
import Login from "../../components/Login/Login"


export default class AccountPage extends Component {
    state={
        firstName: '',
        lastName: '',
        username:'',
        email:'',
    }

    handleSubmit(e){
        this.setState({[e.target.name]: e.target.value})
        console.log('hi')
    }

    render() {
        return(
            <div className="account">
                <h1>Account Page</h1>
                <Outlet/>
            </div>
        )
    }
}