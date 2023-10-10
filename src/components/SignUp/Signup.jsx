import './Signup.css'
import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button'
import {Link, useNavigate} from 'react-router-dom'
import { Box, TextField } from '@mui/material';

export default function SignUpForm(props){
    const [userData, setUserData] = useState({
        name:'',
        email: '',
        username:'',
        password: '',
        confirm: '',
        signup: false,
    })
    const [errorFlag, setErrorFlag] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [checkData, setCheckData] = useState([])
    let navigate = useNavigate()

    async function getAllUser() {
        let fetchUsers = await fetch('/api/users/all')
        let users = await fetchUsers.json()
        setCheckData(users)
    }

    useEffect(() => {
        getAllUser()
    }, [])

    function handleChange(e){
        setUserData({...userData, [e.target.name]:e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let valid = true
        checkData.forEach(user => {
            if (user.username === userData.username) {
                setErrorFlag(true)
                setErrorMessage('Username already exists, please try again')
                valid = false
            } else if (user.email === userData.email) {
                setErrorFlag(true)
                setErrorMessage('Email already exists, please try again')
                valid = false
            } else if (userData.password !== userData.confirm){
                setErrorFlag(true)
                setErrorMessage('Password does not match, please try again')
                valid = false
            }
        })
        if (valid) {
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
            // if (!fetchResponse.ok) throw new Error('Fetch failed - Bad request')
            if (!fetchResponse.ok) {
                console.log(fetchResponse)
            }
            let token = await fetchResponse.json()
            localStorage.setItem('token', token)
            const userDoc = await JSON.parse(atob(token.split('.')[1])).user
            props.setUserInState(userDoc)
            navigate("/account/setup")
        } else {
            navigate("/account/signup")
        }
    }

    return (
        <Box sx={{ maxWidth: '100%', }} className="SignUpPage">
            <form autoComplete="off" onSubmit= {handleSubmit}>
                <div className="n-container">
                    <TextField 
                        required 
                        label="Name"
                        id="fullWidth" 
                        size="small"
                        type="text"
                        margin="normal" 
                        name="name" 
                        onChange={handleChange} 
                    />
                    <TextField
                        required  
                        label="Username" 
                        id="fullWidth"
                        size="small" 
                        type="text"
                        margin="normal" 
                        name="username" 
                        onChange={handleChange} 
                    />
                </div>
                <TextField
                    required 
                    fullWidth 
                    label="Email" 
                    id="fullWidth" 
                    size="small"
                    type="email"
                    margin="normal"
                    name="email" 
                    onChange={handleChange} 
                />
                <br></br>
                <TextField
                    required 
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
                    required 
                    fullWidth 
                    label="Confirm Password" 
                    id="fullWidth"
                    size="small"
                    type="password"
                    margin="normal" 
                    name="confirm" 
                    onChange={handleChange} 
                />
                { errorFlag ?
                    <p className='error-red'>{errorMessage}</p> :
                    false
                }
                <br></br>
                <br></br>
                <Button 
                    disabled={userData.signup} 
                    type="submit" 
                    variant="contained"
                >Signup</Button>
                <br></br>
                <br></br>
                <p>Already a Member? &nbsp;<Link to="/account/login">Login here</Link></p>
            </form>
        </Box>
    )
}