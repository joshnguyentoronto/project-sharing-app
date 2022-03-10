import './UserSetUpPage.css'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import { TextField } from '@mui/material';

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

    const theme = {
        spacing: 8,
    }

    return (
        <div className='UserSetUpPage'>
            <h1>Welcome!<br></br>Lets get you started</h1>
            <h3>Whether now or later<br></br>lets help you differentiate yourself!</h3>
            <form onSubmit={handleSubmit}>
                <TextField sx={{ my: 2 }}
                    id="outlined-basic" 
                    label="Location" 
                    variant="outlined"
                    type="text" 
                    name="location"
                    value={profileData.location} 
                    onChange={handleChange} 
                />
                <TextField sx={{ my: 2 }}
                    id="outlined-basic" 
                    label="Education" 
                    variant="outlined"
                    type="text" 
                    name="education"
                    value={profileData.education} 
                    onChange={handleChange} 
                />
                <TextField sx={{ my: 2 }}
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