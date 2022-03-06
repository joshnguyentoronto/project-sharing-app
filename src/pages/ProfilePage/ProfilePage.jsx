import "./ProfilePage.css"
import React, { Component } from 'react'
import ProjectList from "../../components/ProjectList/ProjectList"
import ProfileCard from "../../components/ProfileCard/ProfileCard";

export default class ProfilePage extends Component {
    state={
        categories: ["Projects", "Saved", "Liked", "About"],
        activeCategory: "Projects",
        projects: [],
    }

    handleSetActiveCat = (cat) => {
        this.setState({activeCategory: cat})
    }

    savedProjects = async () => {
        try {
            let fetchProjectList = await fetch('/api/projects/saved', {headers: { "user": "fake" }})
            let projects = await fetchProjectList.json()
            console.log(projects)
            this.setState({projects: projects})
            console.log("dasdfafwe", this.state.projects)
        } catch(err) {
            console.log("home page error: ", err)
        }
    }

    async componentDidMount() {
        try {
            let fetchProjectList = await fetch('/api/projects/user', {headers: { "user": "Josh" }})
            let projects = await fetchProjectList.json()
            this.setState({projects: projects})
        } catch(err) {
            console.log("home page error: ", err)
        }
    }

    render() {
        return(
            <div className="profile">
                <ProfileCard user={this.props.user}/>
                <div className="profile-content-area">
                    <ul className="ProfileCategory">
                        <li 
                            className={"Projects" === this.state.activeCategory ? 'active' : ''}
                            onClick={() => this.handleSetActiveCat("Projects")}
                        >Projects</li>
                        <li 
                            className={"Saved" === this.state.activeCategory ? 'active' : ''}
                            onClick={() => {
                                this.handleSetActiveCat("Saved");
                                this.savedProjects()
                            }}
                        >Saved</li>
                        <li 
                            className={"Liked" === this.state.activeCategory ? 'active' : ''}
                            onClick={() => this.handleSetActiveCat("Liked")}
                        >Liked</li>
                        <li 
                            className={"About" === this.state.activeCategory ? 'active' : ''}
                            onClick={() => this.handleSetActiveCat("About")}
                        >About</li>
                    </ul>
                    
                    {this.state.activeCategory === "About" ?
                        <div>
                        <p>About<br />{this.props.user.bio}</p>
                        <p>Skills<br /><ul>{this.props.user.skill.map(s => <li>{s}</li>)}</ul></p>
                        <p>Work Experience<br /><ul>{this.props.user.experiences.map(e => <li>{e.company}: {e.title}</li>)}</ul></p>
                        <p>Education<br />{this.props.user.education}</p>
                        <p>Member since: March 2</p>
                        <p>Contact<br />{this.props.user.email}</p>
                        <p>Social<br /><ul>{this.props.user.userLink.map(e => <li>{e.name}: {e.url}</li>)}</ul></p>
                    </div>
                    :
                    <ProjectList projects={this.state.projects} />
                    }
                    
                </div>
            </div>
        )
    }
}
