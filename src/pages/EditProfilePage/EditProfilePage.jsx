import "./EditProfilePage.css"
import React, { useState, useRef } from 'react'
import { Link, useNavigate} from "react-router-dom";
import { TextField } from '@mui/material';
import InputLink from '../../components/InputLink/InputLink'
import InputTagItem from "../../components/InputTagItem/InputTagItem";

export default function EditProfilePage(props) {
    const [profileData, editProfileData] = useState({
            name: '',
            experiences: [],
            location:'',
            education: '',
            userLink: [{ index: 0, name: '', url: '' }],
            linkNum: 1,
            skill: [],
            skillItem: '',
            bio:'',
        })
    const [imagePreview, setImagePreview] = useState('')
    const [bgImagePreview, setBgImagePreview] = useState('')
    const navigate = useNavigate()
    const avatarInputRef = useRef()
    const bgInputRef = useRef()

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
        editProfileData({...profileData, 
            linkNum: newNum, 
            userLink: [...profileData.userLink, newObj ] 
        })
    }

    function addSkill(evt) {
        evt.preventDefault()
        evt.target.firstChild.value = ""
        editProfileData({...profileData, 
            skill: [...profileData.skill, profileData.skillItem.toLowerCase() ], 
            skillItem: '' 
        })
    }

    function removeSkill(skill) {
        let skillCopy = profileData.skill
        skillCopy.splice(skillCopy.findIndex(s => {
            return s === skill
        }), 1)
        editProfileData({...profileData, skill: skillCopy })
    }

    async function avatarphotoUpload(e){
        try {
            let {url} = await fetch("/s3Url").then(res => res.json())
            let file = e.target.files[0]
            let avatarPhoto = await fetch(url,{
                    method: "PUT",
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    body: file
            })
            let avatarUrl = url.split('?')[0]
            
            let jwt = localStorage.getItem('token')
            const sendUpdate = await fetch('/api/users/update/images',{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + jwt,
                },
                body: JSON.stringify({
                    avatar: avatarUrl,
                })
            })
        } catch (err) {
            console.log("Submit error", err)
        }
    }

    async function bgphotoUpload(e){
        try {
            let {url} = await fetch("/s3Url").then(res => res.json())
            let file = e.target.files[0]
            let bgPhoto = await fetch(url,{
                method: "PUT",
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                body: file
            })
            let bgUrl = url.split('?')[0]
            let jwt = localStorage.getItem('token')
            const sendUpdate = await fetch('/api/users/update/images',{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + jwt,
                },
                body: JSON.stringify({
                    background: bgUrl,
                })
            })
        } catch (err) {
            console.log("Submit error", err)
        }
    }

    function handleEdit(){
        avatarInputRef.current.click()
    };
    
    function backgroundEdit(){
        bgInputRef.current.click()
    }
    
    return(
        <div>
            <div className="edit-profile-header">
                <div className="edit-profile-photo">
                    <img src={imagePreview}></img>
                    <input onChange={(evt)=>{
                        setImagePreview(URL.createObjectURL(evt.target.files[0]))
                        avatarphotoUpload(evt)
                        }} 
                        type="file" 
                        name="dp-img" 
                        ref={avatarInputRef}
                        accept="image/*" 
                        hidden 
                    />
                    <a onClick={handleEdit} className="edit-button">Edit</a>
                </div>
                <div className="edit-background-image">
                    <a onClick={backgroundEdit}className="edit-button">Edit</a>
                    <img src={bgImagePreview}></img>
                    <input onChange={(evt) => {
                            setBgImagePreview(URL.createObjectURL(evt.target.files[0]))
                            bgphotoUpload(evt)
                            }
                        }
                        type="file" 
                        ref={bgInputRef} 
                        name="bg-img" 
                        accept="image/*" 
                        hidden 
                    />
                </div>
            </div>
        <div className="edit-profile-content-wrapper">
            <div className="edit-profile-info-wrapper">
                <div class="edit-profile-info">
                    <span className="label">Name</span>             
                    <TextField
                        type="text" 
                        name="name" 
                        onChange={handleChange} 
                    />
                </div>
                <div class="edit-profile-info">
                    <span className="label">Work Experience</span>               
                    <TextField 
                    type="text" 
                    name="experiences"
                    value={profileData.experiences} 
                    onChange={handleChange} 
                    />
                </div>
                <div class="edit-profile-info">
                    <span className="label">Education</span>
                <TextField 
                    type="text" 
                    name="education"
                    value={profileData.education} 
                    onChange={handleChange} 
                />
                </div>
                <div class="edit-profile-info">
                    <span className="label">Location</span>
                <TextField 
                    type="text" 
                    name="location"
                    value={profileData.location} 
                    onChange={handleChange} 
                />
                </div>
                <div className="input-li-container-top-2">
                    <div className="input-li-container">
                        {profileData.userLink.map(obj => <InputLink 
                            key={obj.index} 
                            link={obj} 
                            handleInputLinkNameChange={handleInputLinkNameChange} 
                            handleInputLinkUrlChange={handleInputLinkUrlChange} 
                            deleteLink={deleteLink} 
                            />)}
                    </div>
                    <p onClick={addLink} className="upload-btn-li-2">Add Link</p>
                </div>
                <div className="edit-skills-wrapper">
                <p className="label">Skills</p>
                    <form onSubmit={addSkill}>
                        <input 
                            onChange={handleChange} 
                            name="skillItem" 
                            type="text" 
                            placeholder="Ex: Javascript, Wireframing, Research" 
                            required 
                        />
                        <button onSubmit={addSkill}>+</button>
                    </form>
                    <div className="tag-items">
                        {profileData.skill.map(skill=> <InputTagItem key={skill} tag={skill} removeTag={removeSkill} /> )}
                    </div>
                </div>
                <div class="edit-profile-info">
                    <span className="label">About me</span>
                    <TextField
                        id="outlined-multiline-static"
                        multiline
                        name="bio"
                        value={profileData.bio}
                        rows={4}
                        onChange={handleChange}
                    />
                </div>
                <div className="edit-profile-submit">
                    <Link to="/profile">Cancel</Link>
                    <button onClick={()=>
                        {props.submitProfile({
                            name: profileData.name,
                            bio: profileData.bio,
                            education: profileData.education,
                            experiences: profileData.experiences,
                            location: profileData.location,
                            skill: profileData.skill,
                            userLink: profileData.userLink
                        })
                        navigate("/profile")       
                    }
                    }>Publish</button>
                </div>
                </div>
                </div>
        </div>
    )
}