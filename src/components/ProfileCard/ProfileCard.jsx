import "./ProfileCard.css"
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class ProfileCard extends Component {
    state = {
        name: "Lu",
        location: "Ontario",
        viewCount: 2,
        likeCount: 3,
        bio: "Hello"
    }

    render () {
        return (
            <div>
                <img src="#" alt="profile"/>
                <h1>{this.state.name}</h1>
                <p>{this.state.location}</p>
                <Link to="/profile/edit">Edit Profile</Link>
                <br />
                <Link to="/upload">Upload a Project</Link>
                <p>Project Views {this.state.viewCount}</p>
                <p>Likes {this.state.likeCount}</p>
                <p>Contact</p>
                <p>About</p>
                <p>{this.state.bio}</p>
            </div>
        )
    }
}