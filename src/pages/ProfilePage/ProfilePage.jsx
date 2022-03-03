import "./ProfilePage.css"
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import ProjectList from "../../components/ProjectList/ProjectList"
import ProfileCategory from "../../components/ProfileCategory/ProfileCategory"

export default class ProfilePage extends Component {
    state={
        categories: ["My Projects", "Liked", "About"],
        activeCategory: ""
    }

    render() {
        return(
            <div className="profile">
                <img src=""/>
                <h1>Name</h1>
                <p>Location</p>
                <Link to="/profile/edit">Edit Profile</Link>
                <br />
                <ProfileCategory categories={this.state.categories}/>
                <ProjectList />
            </div>
        )
    }
}