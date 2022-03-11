import "./HomePage.css"
import React, { Component } from 'react'
import HomeHeader from "../../components/HomeHeader/HomeHeader"
import Filter from "../../components/Filter/Filter"
import MessageBox from "../../components/MessageBox/MessageBox"
import ProjectList from "../../components/ProjectList/ProjectList"
import ProjectDetail from "../../components/ProjectDetail/ProjectDetail"
import Footer from "../../components/Footer/Footer"

export default class HomePage extends Component {
    state={
        profile: false
    }

    render() {
        return(
            <div className="home">
                <HomeHeader 
                    openChatList={this.props.openChatList}
                    userLogout={this.props.userLogout}
                    user={this.props.user}
                />
                <Filter 
                    handleChange={this.props.handleChange}
                    filterByTag={this.props.filterByTag}
                    filterByFlag={this.props.filterByFlag}
                    flags={this.props.flags}
                    filterSort={this.props.filterSort}
                    filter={this.props.filter}
                    currentFlag={this.props.currentFlag}
                />
                <ProjectList
                    needHover={true}
                    profile={this.state.profile}
                    viewProject={this.props.viewProject}
                    projects={this.props.projects}
                    hoverUserState={this.props.hoverUserState}
                    hoverUser={this.props.hoverUser}
                    hoverProject={this.props.hoverProject}
                    saveProject={this.props.saveProject}
                    likeProject={this.props.likeProject}             
                    isSaved={this.props.isSaved}
                    isLiked={this.props.isLiked}
                    user={this.props.user} 
                    viewPeople={this.props.viewPeople}
                    viewUser=""
                    getUserCardCounts={this.props.getUserCardCounts}
                    userCardLike={this.props.userCardLike}
                    userCardView={this.props.userCardView}
                />
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
                        profile={this.state.profile}
                        viewProject={this.props.viewProject}
                        projects={this.props.projects}
                        hoverProject={this.props.hoverProject}
                        getUserCardCounts={this.props.getUserCardCounts}
                        userCardLike={this.props.userCardLike}
                        userCardView={this.props.userCardView}
                    /> 
                    :
                    false
                }
                {this.props.openChat ? 
                    <MessageBox 
                        messageList={this.props.messageList} 
                        openChatList={this.props.openChatList}
                        currentUser={this.props.user}
                        socket={this.props.socket}
                    /> 
                    : false }
                <Footer user={this.props.user} />
            </div>
        )
    }
}