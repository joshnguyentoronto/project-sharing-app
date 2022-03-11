import React, {useState} from 'react';
import Button from '@mui/material/Button'
import {Link ,useNavigate} from 'react-router-dom'
import { Box, TextField } from '@mui/material';
import "./Login.css"

export default function Login(props) {
    const [userData, setUserData] = useState({
        username:'',
        password: '',
    })
    const [error, setError] = useState(false)

    let navigate = useNavigate()

    function handleChange(e){
        setUserData({...userData, [e.target.name]:e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const fetchResponse = await fetch('/api/users/login', {
            method: 'post',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: userData.username,
                password: userData.password,
            })
        })
        if (!fetchResponse.ok){
            setError(true)
        }else {
            let token = await fetchResponse.json()
            localStorage.setItem('token', token)
    
            const userDoc = await JSON.parse(atob(token.split('.')[1])).user
            props.setUserInState(userDoc)
            navigate("/")       
        }
    }

    return (
            <Box sx={{ maxWidth: '100%', }} className="LoginPage" >
                <form autoComplete='off' onSubmit={handleSubmit}>
                    <TextField
                        fullWidth 
                        label="Username" 
                        id="fullWidth"
                        size="small"
                        type="text"
                        margin="normal" 
                        name="username"
                        value={userData.username} 
                        onChange={handleChange} 
                    />
                    <br></br>
                    <br></br>
                    <TextField
                        fullWidth 
                        label="Password"
                        size="small" 
                        type="password" 
                        name="password"
                        value={userData.password}
                        onChange={handleChange} 
                    />
                    {error ? 
                    <p className='error-red'>Incorrect Username or password try again</p>:
                    false
                    }
                    <br></br>
                    <br></br>
                    <Button type="submit" variant="contained">Login</Button>
                    <br></br>
                    <br></br>
                    <p>Not a Member? &nbsp;<Link to="/account/signup">Sign up here</Link></p>
                </form>
            </Box>
    )
}