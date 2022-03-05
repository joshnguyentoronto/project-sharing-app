import React, {useState} from 'react';
import Button from '@mui/material/Button'
import {Link ,useNavigate} from 'react-router-dom'
import { FormHelperText, TextField, InputAdornment } from '@mui/material';

export default function Login(props) {

    const [userData, setUserData] = useState({
        username:'',
        password: '',
    })
    let navigate = useNavigate()

    function handleChange(e){
        setUserData({...userData, [e.target.name]:e.target.value })
    }

    async function handleSubmit(e) {
        console.log('hit')
        e.preventDefault();
        const fetchResponse = await fetch('/api/users/login', {
            method: 'post',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: userData.username,
                password: userData.password,
            })
        })
        if (!fetchResponse.ok) throw new Error('Fetch failed - Bad request')

        let token = await fetchResponse.json()
        localStorage.setItem('token', token)

        const userDoc = await JSON.parse(atob(token.split('.')[1])).user
        props.setUserInState(userDoc)
        navigate("/")       
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <TextField 
                    id="outlined-basic" 
                    label="Username" 
                    variant="outlined"
                    type="text" 
                    name="username"
                    value={userData.username} 
                    onChange={handleChange} 
                />
                <TextField 
                    id="outlined-basic" 
                    label="Password" 
                    variant="outlined"
                    type="password" 
                    name="password"
                    value={userData.password}
                    onChange={handleChange} 
                />
                <Button type="submit" variant="contained">Login</Button>
                <Link to="/account/signup">Not a Member?<br></br> Sign up here</Link>
            </form>
        </div>
    )
}