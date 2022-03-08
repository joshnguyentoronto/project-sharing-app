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
        // hoverIsLiked: false
        profile: false
    }

    // async componentDidUpdate(prevProps){
    //     console.log(prevProps)
    //     console.log(this.props.user)
    //     // if (this.props.user.likedPosts !== prevProps) {
    //     //     this.setState({ hoverIsLiked: true })
    //     // }
    //     // if (this.state.user.likedPosts.indexOf(this.state.currentProject._id) == -1) {
    //     //   this.setState({ hoverIsLiked: false})
    //     // } else {
    //     //   this.setState({ hoverIsLiked: true})
    //     // }
    //   }

    //   async componentDidMount() {
    //       console.log(this.props)
    //     //   if (this.props.user.likedPosts.indexOf(this.props.currentProject._id) == -1) {
    //     //   this.setState({ hoverIsLiked: false})
    //     // } else {
    //     //   this.setState({ hoverIsLiked: true})
    //     // }
    //   }


    render() {
        return(
            <div className="home">
                <HomeHeader 
                    openChatList={this.props.openChatList}
                    userLogout={this.props.userLogout}
                    user={this.props.user}
                />
                <Filter handleChange={this.props.handleChange} filterByTag={this.props.filterByTag} filterByFlag={this.props.filterByFlag} flags={this.props.flags}/>
                <ProjectList
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
                    // hoverIsLiked={this.props.hoverIsLiked}
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
                <Footer />
            </div>
        )
    }
}