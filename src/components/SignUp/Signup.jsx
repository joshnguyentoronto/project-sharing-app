import React, {Component} from 'react';


export default class SignUpForm extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        confirm: '',
        error: '',
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            error: ''
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const fetchResponse = await fetch('/api/users/signup', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name: this.state.name, email: this.state.email, password: this.state.password,})
        })
      }

    render(){
        return (
            <form onSubmit= {this.handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" placeholder="name" value={this.state.name} onChange={this.handleChange}></input>
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
                <label>
                    Confirm:
                    <input type="text" name="password" placeholder="password"></input>
                </label>
                <button>Signup</button>
            </form>
        )
    }
}