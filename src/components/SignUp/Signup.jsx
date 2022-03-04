import React, {Component} from 'react';
import Button from '@mui/material/Button'
import {Link, Navigate} from 'react-router-dom'
import { FormHelperText, TextField, InputAdornment } from '@mui/material';

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
        console.log('hit')
        const fetchResponse = await fetch('/api/users/signup', {
            method: 'post',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: this.state.name, 
                email: this.state.email, 
                username: this.state.username,
                password: this.state.password,
            })
        })
        if (!fetchResponse.ok) throw new Error('Fetch failed - Bad request')

        let token = await fetchResponse.json()
        localStorage.setItem('token', token)

        const userDoc = JSON.parse(atob(token.split('.')[1])).user
        console.log(userDoc)
        this.props.setUserInState(userDoc)
        
    }

    render(){
        const disable = this.state.password !== this.state.confirm;
        return (
            <form autocomplete="off" onSubmit= {this.handleSubmit}>
                <div>
                    <TextField 
                        id="outlined-basic" 
                        label="Name" 
                        variant="outlined"
                        type="text" 
                        name="name" 
                        value={this.state.name} 
                        onChange={this.handleChange} 
                    />
                    <TextField 
                        id="outlined-basic" 
                        label="Username" 
                        variant="outlined"
                        type="text" 
                        name="username" 
                        value={this.state.username} 
                        onChange={this.handleChange} 
                    />
                </div>
                <TextField 
                    id="outlined-basic" 
                    label="Email" 
                    variant="outlined"
                    type="email" 
                    name="email" 
                    value={this.state.email} 
                    onChange={this.handleChange}
                />
                <TextField 
                    id="outlined-basic" 
                    label="Password" 
                    variant="outlined"
                    type="password" 
                    name="password" 
                    value={this.state.password} 
                    onChange={this.handleChange}
                />
                <TextField 
                    id="outlined-basic" 
                    label="Confirm Password" 
                    variant="outlined"
                    type="password" 
                    name="confirm" 
                    value={this.state.confirm} 
                    onChange={this.handleChange}
                />
                <br></br>
                <Button disabled={disable} type="submit" variant="contained">Signup</Button>
                <br></br>
                Already a Member
                <br></br>
                <Link to="/account/login">Login here</Link>
            </form>
        )
    }
}