import "./ProfileCard.css"
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class ProfileCard extends Component {
    state = {
        name: "Lu Ye",
        location: "Ontario",
        viewCount: 0,
        likeCount: 0,
        bio: "fsdf",
        email: "luye@luye.com",
        users: []
    }

    // async componentDidMount() {
    //     try {
    //         let fetchUserList = await fetch('/api/users')
    //         console.log(fetchUserList)
    //         let users = await fetchUserList.json()
    //         console.log(users)
    //         // this.setState({users: users})
    //     } catch(err) {
    //         console.log("profile card error: ", err)
    //     }
    // }

    render () {
        return (
            <div className="profile-card" >
                <img src="#" alt="profile"/>
                <h1>{this.state.name}</h1>
                <h4>{this.state.location}</h4>
                <Link to="/profile/edit">Edit Profile</Link>
                <br />
                <Link to="/upload">Upload a Project</Link>
                <p><span>Project Views</span> <span>{this.state.viewCount}</span></p>
                <p><span>Likes</span> <span>{this.state.likeCount}</span></p>
                <p><span className="profile-label">Contact</span>{this.state.email}</p>
                <p><span className="profile-label">About</span>{this.state.bio}</p>
            </div>
        )
    }
}