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
        flags: ['UX/UI design', 'Software Engineer', 'Data Science', 'Digital Marketing'],
        currentFlag: '',
        currentTag: '',
        currentProject: '',
        refProjects: [],
        projects: [],
        openChat: false,
        messageList: [],
    }

    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    };

    // create a method that set currentProject when hover
    viewProject = async (project) => {
        try {
            let fetchRefProjectList = await fetch('/api/projects/ref', {headers: { "user": project.author[0]._id }})
            let refProjects = await fetchRefProjectList.json()
            this.setState({ currentProject: project, refProjects: refProjects })
        } catch(err) {
            console.log(err)
        }
    }

    closeProject = async () => {
        this.setState({ currentProject: '' })
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
            let serverResponse = await fetchResponse.json()
            console.log("Success:", serverResponse)
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
            let serverResponse = await fetchResponse.json()
            console.log("Success:", serverResponse)
        } catch (err) {
            console.log(err)
        }
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
                <ProjectList viewProject={this.viewProject} projects={this.state.projects} />
                {this.state.currentProject ? 
                <ProjectDetail 
                    closeProject={this.closeProject} 
                    project={this.state.currentProject} 
                    refProjects={this.state.refProjects}
                    saveProject={this.saveProject}
                    likeProject={this.likeProject}
                /> 
                : false}
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