import "./ProfilePage.css"
import React, { Component } from 'react'
import ProjectList from "../../components/ProjectList/ProjectList"
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import ProjectDetail from "../../components/ProjectDetail/ProjectDetail";

export default class ProfilePage extends Component {
    state={
        categories: ["Projects", "Saved", "Liked", "About"],
        activeCategory: "Projects",
        projects: [],
    }

    handleSetActiveCat = (cat) => {
        this.setState({activeCategory: cat})
    }

    async componentDidMount() {
        this.props.myProjects()
    }

    render() {
        return(
            <div className="profile">
                <ProfileCard user={this.props.user}/>
                <div className="profile-content-area">
                    <ul className="ProfileCategory">
                        <li 
                            className={"Projects" === this.state.activeCategory ? 'active' : ''}
                            onClick={() => {
                                this.handleSetActiveCat("Projects")
                                this.props.myProjects()
                            }}
                        >Projects</li>
                        <li 
                            className={"Saved" === this.state.activeCategory ? 'active' : ''}
                            onClick={() => {
                                this.handleSetActiveCat("Saved");
                                this.props.savedProjects()
                            }}
                        >Saved</li>
                        <li 
                            className={"Liked" === this.state.activeCategory ? 'active' : ''}
                            onClick={() => {
                                this.handleSetActiveCat("Liked")
                                this.props.likedProjects()
                            }}
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
                    <ProjectList 
                        profile={this.state.activeCategory}
                        user={this.props.user}
                        projects={this.props.projects}
                        // hoverIsLiked={this.props.hoverIsLiked}
                        hoverProject={this.props.hoverProject} 
                        hoverUser={this.props.hoverUser}
                        hoverUserState={this.props.hoverUserState}
                        isSaved={this.props.isSaved}
                        likeProject={this.props.likeProject}
                        saveProject={this.props.saveProject}
                        viewProject={this.props.viewProject}
                    />
                    }
                    {this.props.viewMode ? 
                        <ProjectDetail
                            user={this.props.user}
                            closeProject={this.props.closeProject} 
                            project={this.props.currentProject} 
                            refProjects={this.props.refProjects}
                            saveProject={this.props.saveProject}
                            likeProject={this.props.likeProject}
                            handleChange={this.props.handleChange}
                            postComment={this.props.postComment}
                            delCom={this.props.delCom}
                            likeComment={this.props.likeComment}
                            unlikeComment={this.props.unlikeComment}
                            comment={this.props.comment}
                            isSaved={this.props.isSaved}
                            isLiked={this.props.isLiked}
                            hoverUserState={this.props.hoverUserState}
                            hoverUser={this.props.hoverUser}
                        /> 
                        :
                        false
                    }
                </div>
            </div>
        )
    }
}
