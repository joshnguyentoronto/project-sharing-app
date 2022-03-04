import "./ProfilePage.css"
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import ProjectList from "../../components/ProjectList/ProjectList"
import ProfileCategory from "../../components/ProfileCategory/ProfileCategory"
import ProfileCard from "../../components/ProfileCard/ProfileCard";

export default class ProfilePage extends Component {
    state={
        categories: ["Projects", "Saved", "Liked", "About"],
        activeCategory: "Projects"
    }

    handleSetActiveCat = (cat) => {
        this.setState({activeCategory: cat})
    }

    render() {
        return(
            <div className="profile">
                <ProfileCard />
                <ProfileCategory 
                    categories={this.state.categories}
                    activeCategory={this.state.activeCategory}
                    handleSetActiveCat={this.handleSetActiveCat}
                />
                <ProjectList />
            </div>
        )
    }
}