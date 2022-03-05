import React, {useState} from 'react';
import Button from '@mui/material/Button'
import {Link, useNavigate} from 'react-router-dom'
import { Box, FormHelperText, TextField, InputAdornment } from '@mui/material';

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
        <Box
        sx={{
            maxWidth: '100%',
        }}>
            <form autoComplete="off" onSubmit= {handleSubmit}>
                <div className="n-container">
                    <TextField  
                        label="Name"
                        id="fullWidth" 
                        size="small"
                        type="text"
                        margin="normal" 
                        name="name" 
                        onChange={handleChange} 
                    />
                    <TextField 
                        label="Username" 
                        id="fullWidth"
                        size="small" 
                        type="text"
                        margin="normal" 
                        name="username" 
                        onChange={handleChange} 
                    />
                </div>
                <br></br>
                <TextField
                    fullWidth 
                    label="Email" 
                    id="fullWidth" 
                    size="small"
                    type="text"
                    margin="normal"
                    name="email" 
                    onChange={handleChange} 
                />
                <br></br>
                <TextField
                    fullWidth  
                    label="Password"
                    id="fullWidth" 
                    size="small"
                    type="password"
                    margin="normal" 
                    name="password"
                    onChange={handleChange} 
                />
                <br></br>
                <TextField  
                    fullWidth 
                    label="Confirm Password" 
                    id="fullWidth"
                    size="small"
                    type="password"
                    margin="normal" 
                    name="confirm" 
                    onChange={handleChange} 
                />
                <br></br>
                <br></br>
                <Button disabled={userData.signup} type="submit" variant="contained">Signup</Button>
                <br></br>
                <br></br>
                Already a Member
                <br></br>
                <Link to="/account/login">Login here</Link>
            </form>
        </Box>
    )
}