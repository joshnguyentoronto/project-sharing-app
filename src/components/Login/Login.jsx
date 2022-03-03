import React, {Component} from 'react';

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
                <button>Signup</button>
            </form>
        </div>
    )
}