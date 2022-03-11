import "./ProfilePage.css"
import React, { Component } from 'react'
import { Link } from "react-router-dom"; 
import moment from 'moment'
import Header from "../../components/Header/Header";
import ProjectList from "../../components/ProjectList/ProjectList";
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
                <Header 
                    openChatList={this.props.openChatList}
                    userLogout={this.props.userLogout}
                    user={this.props.user}
                />
                
                <div className="background-image" style={{backgroundImage: `url(${this.props.user.background})`}}></div>
                {/* // <div style={{backgroundImage: `url(${props.project.images[index]})`}} className='project-detail-body-img'></div> */}
                {/* {this.props.currentProject ? 
                    <ProfileCard user={this.props.user} otherUser={this.props.currentProject.author[0]}/> 
                :   
                    <ProfileCard user={this.props.user}/>
                } */}
                <ProfileCard 
                    user={this.props.user} 
                    loginUser={this.props.user}
                    allLike={this.props.allLike}
                    allView={this.props.allView}
                />
                
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
                    <div class="about-wrapper">
                        <div className="profile-info">
                            <p><h4>About</h4><br />{this.props.user.bio}</p>
                            <p><h4>Skills</h4><br /><ul>{this.props.user.skill.map(s => <li className="skill-item">{s}</li>)}</ul></p>
                            <p><h4>Work Experience</h4><br />{this.props.user.experiences}</p>
                            <p><h4>Education</h4><br />{this.props.user.education}</p>
                            <p><h5>Member since: {moment(this.props.user.date).format('LL')} </h5></p>
                        </div>

                        <div className="profile-social">
                            <p><h4>Contact</h4>
                            <br />
                            {this.props.user.email}
                            <br />
                            <ul>{this.props.user.userLink.map(e => <li><Link to={`${e.url}`}>{e.name}</Link></li>)}</ul>
                            </p>
                        </div>
                    </div>
                    :
                    <ProjectList 
                        needHover={true}
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
                        viewPeople={this.props.viewPeople}
                        viewUser=""
                        getUserCardCounts={this.props.getUserCardCounts}
                        userCardLike={this.props.userCardLike}
                        userCardView={this.props.userCardView}
                    />
                    }
                    {this.props.viewMode ? 
                        <ProjectDetail
                            hoverProject={this.props.hoverProject} 
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
                            getUserCardCounts={this.props.getUserCardCounts}
                            userCardLike={this.props.userCardLike}
                            userCardView={this.props.userCardView}
                        /> 
                        :
                        false
                    }
                </div>
            </div>
        )
    }
}
