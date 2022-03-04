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
        projects: [],
    }

    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    };

    viewProject = async (project) => {
        this.setState({ currentProject: project })
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
            let fetchProjectList = await fetch('/api/projects', {headers: { "tag": this.state.currentTag }})
            let projects = await fetchProjectList.json()
            this.setState({ projects: projects })
        } catch(err) {
            console.log(err)
        }
    }

    filterByFlag = async (flag) => {
        try {
            let fetchProjectList = await fetch('/api/projects', {headers: { "flag": flag }})
            let projects = await fetchProjectList.json()
            this.setState({ currentFlag: flag, projects: projects })
        } catch(err) {
            console.log(err)
        }
    }

    async componentDidMount() {
        try {
            let fetchProjectList = await fetch('/api/projects', {headers: { "flag": this.state.currentFlag }})
            let projects = await fetchProjectList.json()
            this.setState({projects: projects})
        } catch(err) {
            console.log("home page error: ", err)
        }
    }

    render() {
        return(
            <div className="home">
                <Header openChatList={this.openChatList} />
                <Filter handleChange={this.handleChange} filterByTag={this.filterByTag} filterByFlag={this.filterByFlag} flags={this.state.flags}/>
                <ProjectList viewProject={this.viewProject} projects={this.state.projects} />
                <Footer />
                {this.state.currentProject ? <ProjectDetail closeProject={this.closeProject} project={this.state.currentProject} /> : console.log('brows state')}
                <div>
                    <h1>To cancel error message</h1>
                    <MessageList />
                    <MessageBox />
                    <MessageListItem />
                    
                </div>
            </div>
        )
    }
}