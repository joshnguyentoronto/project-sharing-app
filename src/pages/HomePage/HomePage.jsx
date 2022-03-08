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
        openChat: false,
        messageList: [],
        // hoverIsLiked: false
    }

    openChatList = async () => {
        let value = !this.state.openChat
        if (value){
            let jwt = localStorage.getItem('token')
            let fetchResponse = await fetch('/api/users/allmessages', {headers: {'Authorization': 'Bearer ' + jwt}})
            let messages = await fetchResponse.json()
            let array = await JSON.parse(messages)
            this.setState({messageList: array})
        }
        this.setState({openChat: value})
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
                    openChatList={this.openChatList}
                    userLogout={this.props.userLogout}
                    user={this.props.user}
                />
                <Filter handleChange={this.props.handleChange} filterByTag={this.props.filterByTag} filterByFlag={this.props.filterByFlag} flags={this.props.flags}/>
                <ProjectList 
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
                        closeProject={this.props.closeProject} 
                        project={this.props.currentProject} 
                        refProjects={this.props.refProjects}
                        saveProject={this.props.saveProject}
                        likeProject={this.props.likeProject}
                        handleChange={this.props.handleChange}
                        postComment={this.props.postComment}
                        delCom={this.props.delCom}
                        comment={this.props.comment}
                        isSaved={this.props.isSaved}
                        isLiked={this.props.isLiked}
                        hoverUserState={this.props.hoverUserState}
                        hoverUser={this.props.hoverUser}
                    /> 
                    :
                    false
                }
                {this.state.openChat ? 
                    <MessageBox 
                        messageList={this.state.messageList} 
                        openChatList={this.openChatList}
                        currentUser={this.props.user}
                    /> 
                    : false }
                <Footer />
            </div>
        )
    }
}