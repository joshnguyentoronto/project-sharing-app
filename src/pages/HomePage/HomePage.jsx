import "./HomePage.css"
import React, { Component } from 'react'
import { useLocation } from "react-router-dom"
import HomeHeader from "../../components/HomeHeader/HomeHeader"
import Filter from "../../components/Filter/Filter"
import MessageBox from "../../components/MessageBox/MessageBox"
import ProjectList from "../../components/ProjectList/ProjectList"
import ProjectDetail from "../../components/ProjectDetail/ProjectDetail"
import Footer from "../../components/Footer/Footer"
import UserCard from "../../components/UserCard/UserCard"

export default class HomePage extends Component {
    state={
        flags: ['UX/UI design', 'Software Engineer', 'Data Science', 'Digital Marketing'],
        currentFlag: '',
        currentTag: '',
        currentProject: '',
        viewMode: false,
        isSaved: false,
        isLiked: false,
        hoverIsLiked: false,
        refProjects: [],
        projects: [],
        openChat: false,
        messageList: [],
        comment: '',
        hoverUserState: false,
        hoverUser: {},
        // FOR LU
        hoverProjectState: false,
        // hoverProject: {},
    }

    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    };

    // create a method that set currentProject when hover
    viewProject = async (project) => {
        try {
            let fetchUser = await fetch('/api/users/', { headers: { "userId": this.props.user._id }})
            let user = await fetchUser.json()
            let fetchRefProjectList = await fetch('/api/projects/ref', {headers: { "user": project.author[0]._id }})
            let refProjects = await fetchRefProjectList.json()
            if (user.savedPosts.indexOf(project._id) != -1 ) {
                if (user.likedPosts.indexOf(project._id) != -1 ) {
                    this.setState({ isLiked: true, isSaved: true, currentProject: project, viewMode: true, refProjects: refProjects })
                } else if (user.likedPosts.indexOf(project._id) == -1 ) {
                    this.setState({ isLiked: false, isSaved: true, currentProject: project, viewMode: true, refProjects: refProjects })
                }
            } else if (user.savedPosts.indexOf(project._id) == -1 ) {
                if (user.likedPosts.indexOf(project._id) != -1 ) {
                    this.setState({ isLiked: true, isSaved: false, currentProject: project, viewMode: true, refProjects: refProjects })
                } else if (user.likedPosts.indexOf(project._id) == -1 ) {
                    this.setState({ isLiked: false, isSaved: false, currentProject: project, viewMode: true, refProjects: refProjects })
                }
            } else {
                this.setState({ currentProject: project, viewMode: true, refProjects: refProjects })
            }
        } catch(err) {
            console.log(err)
        }
    }

    closeProject = async () => {
        this.setState({ currentProject: '', viewMode: false })
    }

    openChatList = async () => {
        let value = !this.state.openChat
        if (value){
            let jwt = localStorage.getItem('token')
            let fetchResponse = await fetch('/api/users/allmessages', {headers: {'Authorization': 'Bearer ' + jwt}})
            let messages = await fetchResponse.json()
            let array = await JSON.parse(messages)
            console.log(array)
            this.setState({messageList: array})
        }
        this.setState({openChat: value})
    }

    filterByTag = async (evt) => {
        evt.preventDefault()
        try {
            let fetchProjectList = await fetch('/api/projects/tag', {headers: { "tag": this.state.currentTag }})
            let projects = await fetchProjectList.json()
            this.setState({ projects: projects })
        } catch(err) {
            console.log(err)
        }
    }

    filterByFlag = async (flag) => {
        try {
            let fetchProjectList = await fetch('/api/projects/flag', {headers: { "flag": flag }})
            let projects = await fetchProjectList.json()
            this.setState({ currentFlag: flag, projects: projects })
        } catch(err) {
            console.log(err)
        }
    }

    saveProject = async () => {
        try {
            let fetchResponse = await fetch('/api/users/save', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({savedPosts: this.state.currentProject._id, userId: this.props.user._id})
            })
            let user = await fetchResponse.json()
            if (user.savedPosts.indexOf(this.state.currentProject._id) != -1 ) {
                this.setState({ isSaved: true })
            } else if (user.savedPosts.indexOf(this.state.currentProject._id) == -1 ) {
                this.setState({ isSaved: false })
            }
            console.log("Success:", user)
        } catch (err) {
            console.log(err)
        }
    }

    likeProject = async () => {
        try {
            let fetchResponse = await fetch('/api/users/like', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({likedPosts: this.state.currentProject._id, userId: this.props.user._id})
            })
            let user = await fetchResponse.json()
            if (user.likedPosts.indexOf(this.state.currentProject._id) != -1 ) {
                this.setState({ isLiked: true })
            } else if (user.likedPosts.indexOf(this.state.currentProject._id) == -1 ) {
                this.setState({ isLiked: false })
            }
            console.log("Success:", user)
        } catch (err) {
            console.log(err)
        }
    }

    postComment = async () => {
        try {
            let fetchResponse = await fetch('/api/projects/comment/new', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    projectId: this.state.currentProject._id,
                    comment: this.state.comment,
                    userId: this.props.user._id
                })
            })
            let project = await fetchResponse.json()
            if (!fetchResponse.ok) {
                throw new Error('Fetch failed - Bad request')
            } else {
                this.setState({ currentProject: project, comment: '' })
            }
        } catch (err) {
            console.log(err)
        }
    }

    delCom = async (arr) => {
        console.log(arr)
        try {
            let fetchResponse = await fetch('/api/projects/comment/delete', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    commentId: arr[0],
                    projectId: arr[1]
                })
            })
            let project = await fetchResponse.json()
            console.log(project)
            if (!fetchResponse.ok) {
                throw new Error('Fetch failed - Bad request')
            } else {
                this.setState({ currentProject: project, comment: '' })
            }
        } catch (err) {
            console.log(err)
        }
    }

    hoverProject = async (project) => {
        this.setState({ currentProject: project })
    //     try {
    //         let fetchUser = await fetch('/api/users/', { headers: { "userId": this.props.user._id }})
    //         let user = await fetchUser.json()
    //         if (user.likedPosts.indexOf(project._id) != -1 ) {
    //             this.setState({ hoverIsLiked: true })
    //         } else if (user.likedPosts.indexOf(project._id) == -1 ) {
    //             this.setState({ hoverIsLiked: false, currentProject: project })
    //         }
    //     } catch (err) {
    //         console.log(err)
    //     }
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
            <div className="home">
                <HomeHeader openChatList={this.openChatList} user={this.props.user} userLogout={this.props.userLogout}/>
                <Filter handleChange={this.handleChange} filterByTag={this.filterByTag} filterByFlag={this.filterByFlag} flags={this.state.flags}/>
                <ProjectList 
                    viewProject={this.viewProject}
                    projects={this.state.projects}
                    hoverUserState={this.state.hoverUserState}
                    hoverUser={this.state.hoverUser}
                    hoverProject={this.hoverProject}
                    saveProject={this.saveProject}
                    likeProject={this.likeProject}             
                    isSaved={this.state.isSaved}
                    hoverIsLiked={this.state.hoverIsLiked}
                />
                {this.state.viewMode ? 
                    <ProjectDetail 
                        closeProject={this.closeProject} 
                        project={this.state.currentProject} 
                        refProjects={this.state.refProjects}
                        saveProject={this.saveProject}
                        likeProject={this.likeProject}
                        handleChange={this.handleChange}
                        postComment={this.postComment}
                        delCom={this.delCom}
                        comment={this.state.comment}
                        isSaved={this.state.isSaved}
                        isLiked={this.state.isLiked}
                        hoverUserState={this.state.hoverUserState}
                        hoverUser={this.state.hoverUser}
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