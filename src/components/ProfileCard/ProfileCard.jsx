import "./ProfileCard.css"
import React from 'react'
import { Link } from 'react-router-dom';

export default function ProfileCard (props) {
    // if (props.otherUser) {
    //     if (props.user._id == props.otherUser._id) {
    //          userName = <h1>{props.otherUser.name}</h1>
    //     }
    // } else {
    //     userName = <h1>{props.user.name}</h1> 
    // }
    return (
        <div className="profile-card" >
            <img src={require('../../images/image/no_profile_image.png')} alt="profile"/>
           
            {/* { props.otherUser ? props.user._id == props.otherUser._id ? <h1>{props.user.name}</h1> : <h1>{props.otherUser.name}</h1>
            : <h1>{props.user.name}</h1>} */}
            <h1>{props.user.name}</h1>
            <h4>{props.user.location}</h4>
            {props.loginUser ? props.user._id == props.loginUser._id ? <Link to="/profile/edit">Edit Profile</Link> 
            : <Link to="/profile/follow">follow</Link> 
            : <Link to="/profile/follow">follow</Link> }
            <br />
            {props.loginUser ? props.user._id == props.loginUser._id ? <Link to="/upload">Upload a Project</Link> 
            : <Link to="/profile/message">Message</Link> 
            : <Link to="/profile/message">Message</Link> }
            
            <p><span>Project Views</span> <span>{props.user.viewCount}</span></p>
            <p><span>Likes</span> <span>{props.user.likeCount}</span></p>
            <p><span>Followers</span> <span>999</span></p>
            <p><span>Following</span> <span>999</span></p>
            {/* <p><span className="profile-label">Contact</span>{props.user.email}</p>
            <p><span className="profile-label">About</span>{props.user.bio}</p> */}
        </div>
    )

}