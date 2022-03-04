import React, {Component} from 'react';
import Button from '@mui/material/Button'
import {Link} from 'react-router-dom'

export default function Login(props) {
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={() => this.handleSubmit}>
                <label>
                    User Name:
                    <input type="text" name="username" placeholder="username"></input>
                </label>
                <label>
                    Password:
                    <input type="text" name="password" placeholder="password"></input>
                </label>
                <Button variant="contained">Login</Button>
                <Link to="/account/signup">Don't Have an account!<br></br> Sign up here</Link>
            </form>
        </div>
    )
}