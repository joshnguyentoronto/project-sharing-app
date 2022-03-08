import "./EditProfilePage.css"
import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { Box, FormHelperText, TextField, InputAdornment } from '@mui/material';
import InputLink from '../../components/InputLink/InputLink'
import InputTagItem from "../../components/InputTagItem/InputTagItem";

export default function EditProfilePage(props) {
    const [profileData, editProfileData] = useState({
        name: '',
        experiences: '',
        location:'',
        education: '',
        userLink: [{ index: 0, name: '', url: '' }],
        linkNum: 1,
        skill: [],
        skillItem: '',
        bio:'',
    })

    function handleChange(e){
        editProfileData({...profileData, [e.target.name]:e.target.value })
    }

    function handleInputLinkNameChange(evt) {
        let index = evt.target.name
        let copyLink = profileData.userLink
        let newName = evt.target.value
        copyLink[index].name = newName
        editProfileData({...profileData, userLink: copyLink })
    }

    function handleInputLinkUrlChange(evt) {
        let index = evt.target.name
        let copyLink = profileData.userLink
        let newUrl = evt.target.value
        copyLink[index].url = newUrl
        editProfileData({...profileData, userLink: copyLink })
    }

    function deleteLink(index) {
        let copyLink = profileData.userLink
        if (copyLink.length > 1) {
            let newNum = profileData.linkNum -= 1;
            for (let i = index + 1; i < copyLink.length; i++) {
                copyLink[i].index = i - 1
            }
            copyLink.splice(index, 1)
            editProfileData({...profileData, userLink: copyLink, linkNum: newNum })
        } else {
            alert("You need at least 1 link for your Project!");
        }
    }

    function addLink() {
        let curNum = profileData.linkNum 
        let newNum = profileData.linkNum += 1;
        let newObj = {
            index: curNum,
            name: '',
            url: ''
        }
        editProfileData({...profileData, linkNum: newNum, userLink: [...profileData.userLink, newObj ] })
        console.log(profileData.userLink)
    }

    function addSkill(evt) {
        console.log("fafa")
        evt.preventDefault()
        evt.target.firstChild.value = ""
        editProfileData({...profileData, skill: [...profileData.skill, profileData.skillItem.toLowerCase() ], skillItem: '' })
    }

    function removeSkill(skill) {
        let skillCopy = profileData.skill
        skillCopy.splice(skillCopy.findIndex(s => {
            return s == skill
        }), 1)
        editProfileData({...profileData, skill: skillCopy })
    }

    // async function submitProfile() {
    //     console.log("is this working?", props.user)
    //     const fetchResponse = await fetch('/api/users/edit', {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json",
    //             "userId": props.user._id
    //         },
    //         body: JSON.stringify({
    //             name: profileData.name,
    //             bio: profileData.bio,
    //             education: profileData.education,
    //             experiences: profileData.experiences,
    //             location: profileData.location,
    //             skill: profileData.skill,
    //             userLink: profileData.userLink
    //         })
    //     })
    //     if (!fetchResponse.ok) throw new Error('Fetch failed - Bad request')

    //     navigate("/profile")  
    // }
    


    return(
        <div>
            <h1>helllo</h1>
           
                <TextField
                    label="Name"
                    // id="fullWidth" 
                    size="small"
                    type="text"
                    margin="normal" 
                    name="name" 
                    onChange={handleChange} 
                />
                <TextField 
                    // id="outlined-basic" 
                    label="Work Experience" 
                    // variant="outlined"
                    type="text" 
                    name="experiences"
                    value={profileData.experiences} 
                    onChange={handleChange} 
                />
                <TextField 
                    // id="outlined-basic" 
                    label="Education" 
                    // variant="outlined"
                    type="text" 
                    name="education"
                    value={profileData.education} 
                    onChange={handleChange} 
                />
                <TextField 
                    // id="outlined-basic" 
                    label="Location" 
                    // variant="outlined"
                    type="text" 
                    name="location"
                    value={profileData.location} 
                    onChange={handleChange} 
                />
                {profileData.userLink.map(obj => <InputLink 
                    key={obj.index} 
                    link={obj} 
                    handleInputLinkNameChange={handleInputLinkNameChange} 
                    handleInputLinkUrlChange={handleInputLinkUrlChange} 
                    deleteLink={deleteLink} 
                />)}
                <p onClick={addLink} className="upload-btn-li">Add Link</p>


                <p>Skills</p>
                    <form onSubmit={addSkill}>
                        <input onChange={handleChange} name="skillItem" type="text" placeholder="Ex: Javascript, Wireframing, Research" required />
                        <button onSubmit={addSkill}>+</button>
                    </form>
                    <div className="tag-items">
                        {profileData.skill.map(skill=> <InputTagItem key={skill} tag={skill} removeTag={removeSkill} /> )}
                    </div>
           
                <TextField
                    id="outlined-multiline-static"
                    label="Bio"
                    multiline
                    name="bio"
                    value={profileData.bio}
                    rows={4}
                    onChange={handleChange}
                />

                <Link to="/profile"  className="form-action-link">Cancel</Link>
                <button onClick={()=>props.submitProfile({
                                    name: profileData.name,
                                    bio: profileData.bio,
                                    education: profileData.education,
                                    experiences: profileData.experiences,
                                    location: profileData.location,
                                    skill: profileData.skill,
                                    userLink: profileData.userLink
                })}>Publish</button>
        </div>
    )
}