import React, {Component} from 'react';


export default function SignUpForm(props) {
    return (
            <form onSubmit={() => this.handleSubmit}>
                <label>
                    First Name:
                    <input type="text" name="firstName" placeholder="first name"></input>
                </label>
                <label>
                    Last Name:
                    <input type="text" name="lastName" placeholder="last name"></input>
                </label>
                <label>
                    User Name:
                    <input type="text" name="username" placeholder="username"></input>
                </label>
                <label>
                    Email:
                    <input type="text" name="email" placeholder="email"></input>
                </label>
                <label>
                    Password:
                    <input type="text" name="password" placeholder="password"></input>
                </label>
                <button>Signup</button>
            </form>
    )
}