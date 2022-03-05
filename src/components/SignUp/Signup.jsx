import React, {useState} from 'react';
import Button from '@mui/material/Button'
import {Link, useNavigate} from 'react-router-dom'
import { FormHelperText, TextField, InputAdornment } from '@mui/material';

export default function SignUpForm(props){

    const [userData, setUserData] = useState({
        name:'',
        email: '',
        username:'',
        password: '',
        confirm: '',
        signup: false,
        error: '',
    })
    let navigate = useNavigate()

    function handleChange(e){
        setUserData({...userData, [e.target.name]:e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const fetchResponse = await fetch('/api/users/signup', {
            method: 'post',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: userData.name, 
                email: userData.email, 
                username: userData.username,
                password: userData.password,
            })
        })
        if (!fetchResponse.ok) throw new Error('Fetch failed - Bad request')

        let token = await fetchResponse.json()
        localStorage.setItem('token', token)

        const userDoc = await JSON.parse(atob(token.split('.')[1])).user
        props.setUserInState(userDoc)
        navigate("/account/setup")       
    }
    return (
        <form autocomplete="off" onSubmit= {handleSubmit}>
            <div>
                <TextField 
                    id="outlined-basic" 
                    label="Name" 
                    variant="outlined"
                    type="text" 
                    name="name" 
                    onChange={handleChange} 
                />
                <TextField 
                    id="outlined-basic" 
                    label="Username" 
                    variant="outlined"
                    type="text" 
                    name="username" 
                    onChange={handleChange} 
                />
            </div>
            <TextField 
                id="outlined-basic" 
                label="Email" 
                variant="outlined"
                type="email" 
                name="email" 
                onChange={handleChange} 
            />
            <TextField 
                id="outlined-basic" 
                label="Password" 
                variant="outlined"
                type="password" 
                name="password"
                onChange={handleChange} 
            />
            <TextField 
                id="outlined-basic" 
                label="Confirm Password" 
                variant="outlined"
                type="password" 
                name="confirm" 
                onChange={handleChange} 
            />
            <br></br>
            <Button disabled={userData.signup} type="submit" variant="contained">Signup</Button>
            <br></br>
            Already a Member
            <br></br>
            <Link to="/account/login">Login here</Link>
        </form>
    )
}