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
        flags: ['UD/UI deisgn', 'Software Engineer', 'Data Science', 'Digital Marketing'],
        projects: []
    }

    viewProject = async () => {
        await console.log("hello there")
    }

    openChatList = () => {
        console.log("hello")
    }

    filterByFlag = (e) => {
        console.log(e.target)
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
                <Header openChatList={this.openChatList} />
                <Filter filterByFlag={this.filterByFlag} flags={this.state.flags}/>
                <ProjectList viewProject={this.viewProject} projects={this.state.projects} />
                <Footer />
                <div>
                    <h1>To cancel error message</h1>
                    <MessageList />
                    <MessageBox />
                    <MessageListItem />
                    <ProjectDetail />
                </div>
            </div>
        )
    }
}