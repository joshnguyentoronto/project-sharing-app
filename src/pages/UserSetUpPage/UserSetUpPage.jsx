import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Button from '@mui/material/Button'
import { FormHelperText, TextField, InputAdornment } from '@mui/material';

export default function UserSetUpPage(props){

    const [profileData, setProfileData] = useState({
        location:'',
        education: '',
        bio:'',
    })

    let navigate = useNavigate()

    function handleChange(e){
        setProfileData({...profileData, [e.target.name]:e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let jwt = localStorage.getItem('token')
        const fetchResponse = await fetch('/api/users/setup', {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                'Authorization': "Bearer " + jwt
            },
            body: JSON.stringify({
                location: profileData.location, 
                education: profileData.education, 
                bio: profileData.bio, 
            })
        })
        if (!fetchResponse.ok) throw new Error('Fetch failed - Bad request')
        navigate("/")       
    }

    return (
        <div>
            <h1>Welcome! Lets get you started</h1>
            <h3>Whether now or later lets help you differentiate yourself!</h3>
            <p>Add a photo (Change this)</p>
            <form onSubmit={handleSubmit}>
                <TextField 
                    id="outlined-basic" 
                    label="Location" 
                    variant="outlined"
                    type="text" 
                    name="location"
                    value={profileData.location} 
                    onChange={handleChange} 
                />
                <TextField 
                    id="outlined-basic" 
                    label="Education" 
                    variant="outlined"
                    type="text" 
                    name="education"
                    value={profileData.education} 
                    onChange={handleChange} 
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Bio"
                    multiline
                    name="bio"
                    value={profileData.bio}
                    rows={4}
                    onChange={handleChange}
                />
                <br></br>
                <Button type="submit" variant="contained">Signup</Button>
            </form>

        </div>
    )

}