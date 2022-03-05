import "./HomePage.css"
import React, { Component } from 'react'
import Header from "../../components/Header/Header"
import Filter from "../../components/Filter/Filter"
import MessageBox from "../../components/MessageBox/MessageBox"
import MessageList from "../../components/MessageList/MessageList"
import MessageListItem from "../../components/MessageListItem/MessageListItem"
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
        user: null
    }

    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    };

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

    openChatList = () => {
        console.log("hello")
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
                <Header openChatList={this.openChatList} user={this.state.user} />
                <Filter handleChange={this.handleChange} filterByTag={this.filterByTag} filterByFlag={this.filterByFlag} flags={this.state.flags}/>
                <ProjectList viewProject={this.viewProject} projects={this.state.projects} />
                {this.state.currentProject ? <ProjectDetail closeProject={this.closeProject} project={this.state.currentProject} refProjects={this.state.refProjects}/> : false}
                <div>
                    <span>To cancel error message</span>
                    <MessageList />
                    <MessageBox />
                    <MessageListItem />
                </div>
                <Footer />
            </div>
        )
    }
}