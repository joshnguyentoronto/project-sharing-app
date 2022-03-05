import "./ProfilePage.css"
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import ProjectList from "../../components/ProjectList/ProjectList"
import ProfileCategory from "../../components/ProfileCategory/ProfileCategory"
import ProfileCard from "../../components/ProfileCard/ProfileCard";

export default class ProfilePage extends Component {
    state={
        categories: ["Projects", "Saved", "Liked", "About"],
        activeCategory: "Projects",
        projects: [],
        username: 'Luye'
    }

    handleSetActiveCat = (cat) => {
        this.setState({activeCategory: cat})
    }

    async componentDidMount() {
        try {
            let fetchProjectList = await fetch('/api/projects')
            let projects = await fetchProjectList.json()
            this.setState({projects: projects})
        } catch(err) {
            console.log("home page error: ", err)
        }
    }

    render() {
        return(
            <div className="profile">
                <ProfileCard />
                <div className="profile-content-area">
                    <ProfileCategory 
                        categories={this.state.categories}
                        activeCategory={this.state.activeCategory}
                        handleSetActiveCat={this.handleSetActiveCat}
                    />
                    {this.state.activeCategory === "Projects" ?
                        <ProjectList projects={this.state.projects.filter(
                            p => p.author.find(
                                ({ username }) => username === this.state.username)
                        )} />
                        : <></>
                    }
                    {this.state.activeCategory === "About" ?
                        <div>
                            <p>About<br />hgthters</p>
                            <p>Skills<br />fwefffffffew</p>
                            <p>Work Experience<br />fasgsgfwrag</p>
                            <p>Education<br />fgwedfwes</p>
                            <p>Member since: March 2</p>
                            <p>Contact<br />luye@luye.com</p>
                            <p>Social<br />gesdge</p>
                        </div>
                        : <></>
                    }
                </div>
            </div>
        )
    }
}
