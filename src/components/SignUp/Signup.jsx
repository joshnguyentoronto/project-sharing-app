import React, {Component} from 'react';


export default class SignUpForm extends Component {

    state = {
        name: '',
        email: '',
        username:'',
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
        const fetchResponse = await fetch('api/users/signup'
        , {
            method: 'post',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: this.state.name, 
                email: this.state.email, 
                username: this.state.username,
                password: this.state.password,
            })
        }
        )
        console.log(fetchResponse)
      }

    render(){
        return (
            <form onSubmit= {this.handleSubmit}>
                <label>Name:</label>
                <input 
                    type="text" 
                    name="name" 
                    value={this.state.name} 
                    onChange={this.handleChange}
                ></input>
                <label>Username:</label>
                <input 
                    type="text" 
                    name="username" 
                    value={this.state.username} 
                    onChange={this.handleChange}
                ></input>
                <label>Email:</label>
                <input 
                    type="text" 
                    name="email" 
                    value={this.state.email} 
                    onChange={this.handleChange}
                ></input>
                <label>Password:</label>
                <input 
                    type="text" 
                    name="password" 
                    value={this.state.password} 
                    onChange={this.handleChange}
                ></input>
                <label>Confirm:</label>
                <input 
                    type="text" 
                    name="confirm" 
                    value={this.state.confirm} 
                    onChange={this.handleChange}
                ></input>

                <button>Signup</button>
            </form>
        )
    }
}