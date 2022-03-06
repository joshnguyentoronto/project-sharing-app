import "./ProfileCard.css"
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default function ProfileCard (props) {    
        return (
            <div className="profile-card" >
                <img src="#" alt="profile"/>
                <h1>{props.user.name}</h1>
                <h4>{props.user.location}</h4>
                <Link to="/profile/edit">Edit Profile</Link>
                <br />
                <Link to="/upload">Upload a Project</Link>
                <p><span>Project Views</span> <span>{props.user.viewCount}</span></p>
                <p><span>Likes</span> <span>{props.user.likeCount}</span></p>
                <p><span className="profile-label">Contact</span>{props.user.email}</p>
                <p><span className="profile-label">About</span>{props.user.bio}</p>
            </div>
        )

}