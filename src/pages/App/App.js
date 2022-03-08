import React, { Component } from 'react';
import { Route, Routes, Navigate, Link } from 'react-router-dom'
import './App.css';
import HomePage from '../HomePage/HomePage';
import AccountPage from '../AccountPage/AccountPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import Login from '../../components/Login/Login';
import SignUpForm from '../../components/SignUp/Signup';
import UserSetUpPage from '../UserSetUpPage/UserSetUpPage';
import ProjectUploadPage from '../ProjectUploadPage/ProjectUploadPage';
import TermPage from '../TermPage/TermPage'
import PolicyPage from '../PolicyPage/PolicyPage'
import {io} from 'socket.io-client';

const socket = io()


export default class App extends Component {
  state = {
    flags: ['UX/UI design', 'Software Engineer', 'Data Science', 'Digital Marketing'],
    currentFlag: '',
    currentTag: '',
    filter: '',
    openChat: false,
    messageList: [],

    user: null,
    currentProject: '',
    viewMode: false,
    refProjects: [],
    projects: [],
    comment: '',
    isSaved: false,
    isLiked: false,
    hoverUserState: false,
    hoverUser: {},
    // hoverIsLiked: false,
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

  // create a method that set currentProject when hover
  viewProject = async (project) => {
    if (!this.state.user) {
        try {
            let fetchRefProjectList = await fetch('/api/projects/ref', {headers: { "user": project.author[0]._id }})
            let refProjects = await fetchRefProjectList.json()
            this.setState({ currentProject: project, viewMode: true, refProjects: refProjects })
        } catch(err) {
            console.log(err)
        }
    }
    try {
        let fetchUser = await fetch('/api/users/', { headers: { "userId": this.state.user._id }})
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

  savedProjects = async () => {
    try {
        console.log(this.state.user)
        let fetchProjectList = await fetch('/api/projects/saved', {headers: { "user": this.state.user._id }})
        let projects = await fetchProjectList.json()
        this.setState({ projects: projects })
    } catch(err) {
        console.log("home page error: ", err)
    }
  }

  likedProjects = async () => {
      try {
          console.log(this.state.user)
          let fetchProjectList = await fetch('/api/projects/liked', {headers: { "user": this.state.user._id }})
          let projects = await fetchProjectList.json()
          this.setState({ projects: projects })
      } catch(err) {
          console.log("home page error: ", err)
      }
  }

  myProjects = async () => {
    try {
        console.log(this.state.user)
        let fetchProjectList = await fetch('/api/projects/user', {headers: { "user": this.state.user._id }})
        let projects = await fetchProjectList.json()
        this.setState({ projects: projects })
    } catch(err) {
        console.log("home page error: ", err)
    }
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

  filterSort = async (evt) => {
    if (evt.target.value == 'alphabetical') {
      let newProjects = await this.state.projects.sort((a, b) => (a.title > b.title ? 1 : -1))
      this.setState({ filter: evt.target.value, projects: newProjects })
    } else if (evt.target.value == 'alpha') {
      let newProjects = await this.state.projects.sort((a, b) => (a.title > b.title ? -1 : 1))
      this.setState({ filter: evt.target.value, projects: newProjects })
    } else if (evt.target.value == 'recent') {
      let newProjects = await this.state.projects.sort((a, b) => (b.date > a.date ? 1 : -1))
      this.setState({ filter: evt.target.value, projects: newProjects })
    } else if (evt.target.value == 'view') {
      let newProjects = await this.state.projects.sort((a, b) => b.viewCount - a.viewCount)
      this.setState({ filter: evt.target.value, projects: newProjects })
    } else if (evt.target.value == 'like') {
      let newProjects = await this.state.projects.sort((a, b) => b.likeCount - a.likeCount)
      this.setState({ filter: evt.target.value, projects: newProjects })
    } else if (evt.target.value == 'comment') {
      let newProjects = await this.state.projects.sort((a, b) => b.comment.length - a.comment.length)
      this.setState({ filter: evt.target.value, projects: newProjects })
    } else {
      let newProjects = await this.state.projects.sort((a, b) => b.likeCount - a.likeCount)
      this.setState({ filter: '', projects: newProjects })
    }
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  saveProject = async (project) => {
    try {
        let fetchResponse = await fetch('/api/users/save', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({savedPosts: project._id, userId: this.state.user._id})
        })
        let user = await fetchResponse.json()
        if (user.savedPosts.indexOf(project._id) != -1 ) {
          this.setState({ isSaved: true, user: user  })
        } else if (user.savedPosts.indexOf(project._id) == -1 ) {
          this.setState({ isSaved: false, user: user  })
        }
        console.log("Success:", user)
    } catch (err) {
        console.log(err)
    }
  }

  likeProject = async (obj) => {
    if (obj.profile) {
      let project = obj.project
      try {
        let fetchResponse = await fetch('/api/users/like/profile', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({likedPosts: project._id, userId: this.state.user._id, cat: obj.profile })
        })
        let object = await fetchResponse.json()
        let user = object.user
        let newProject = object.newProject
        let newprojects = object.projectsList
        if (user.likedPosts.indexOf(newProject._id) != -1 ) {
            this.setState({ isLiked: true, user: user, projects: newprojects, currentProject: newProject })
        } else if (user.likedPosts.indexOf(newProject._id) == -1 ) {
            this.setState({ isLiked: false, user: user, projects: newprojects, currentProject: newProject })
        }
        console.log("Success:", user)
      } catch (err) {
          console.log(err)
      }
    } else {
      let project = obj.project
      try {
        let fetchResponse = await fetch('/api/users/like', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({likedPosts: project._id, userId: this.state.user._id})
        })
        let object = await fetchResponse.json()
        let user = object.user
        let newProject = object.newProject
        let newprojects = object.projectsList
        if (user.likedPosts.indexOf(newProject._id) != -1 ) {
            this.setState({ isLiked: true, user: user, projects: newprojects, currentProject: newProject })
        } else if (user.likedPosts.indexOf(newProject._id) == -1 ) {
            this.setState({ isLiked: false, user: user, projects: newprojects, currentProject: newProject })
        }
        console.log("Success:", user)
      } catch (err) {
          console.log(err)
      }
    }
  }

  hoverProject = async (project) => {
    this.setState({ currentProject: project })
    // console.log(this.state.currentProject)
    // if (this.state.user.likedPosts.indexOf(project._id) == -1) {
    //   this.setState({ hoverIsLiked: false, currentProject: project })
    // } else {
    //   this.setState({ hoverIsLiked: true, currentProject: project })
    // }
    
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

  setUserInState = (incomingUserData) => {
    this.setState({ user: incomingUserData})
  }

  userLogout = () =>{
    console.log('logout')
    let token = localStorage.getItem('token')
    if (token){
      token= null
      localStorage.removeItem('token')
      this.setState({user:null})
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
                userId: this.state.user._id
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
          if (!fetchResponse.ok) {
              throw new Error('Fetch failed - Bad request')
          } else {
              this.setState({ currentProject: project })
          }
      } catch (err) {
          console.log(err)
      }
  }

  likeComment = async (arr) => {
    try {
        let fetchResponse = await fetch('/api/projects/comment/like', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
              commentId: arr[0],
              projectId: arr[1],
              userId: arr[2]
            })
        })
        let project = await fetchResponse.json()
        if (!fetchResponse.ok) {
            throw new Error('Fetch failed - Bad request')
        } else {
            this.setState({ currentProject: project })
        }
    } catch (err) {
        console.log(err)
    }
  }

  unlikeComment = async (arr) => {
    try {
        let fetchResponse = await fetch('/api/projects/comment/unlike', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
              commentId: arr[0],
              projectId: arr[1],
              userId: arr[2]
            })
        })
        let project = await fetchResponse.json()
        if (!fetchResponse.ok) {
            throw new Error('Fetch failed - Bad request')
        } else {
            this.setState({ currentProject: project })
        }
    } catch (err) {
        console.log(err)
    }
  }

  async componentDidMount(){
    let token = localStorage.getItem('token')
    if (token){
      const payload = await JSON.parse(window.atob(token.split('.')[1]))
      if (payload.exp < (Date.now() / 1000)) {
        await localStorage.removeItem('token')
        token = null
        try {
          let fetchProjectList = await fetch('/api/projects')
          let projects = await fetchProjectList.json()
          console.log(projects)
          this.setState({ filter: '', projects: projects, user: null })
        } catch(err) {
          console.log("home page error: ", err)
        }
      } else {
        try {
          let fetchProjectList = await fetch('/api/projects')
          let projects = await fetchProjectList.json()
          let fetchUser = await fetch('/api/users/', { headers: { "userId": payload.user._id }})
          let user = await fetchUser.json()
          this.setState({ filter: '', projects: projects, user: user })
        } catch(err) {
          console.log("home page error: ", err)
        }
      }
    } else {
      try {
        let fetchProjectList = await fetch('/api/projects')
        let projects = await fetchProjectList.json()
        this.setState({ filter: '', projects: projects, user: null })
      } catch(err) {
        console.log("home page error: ", err)
      }
    }
  }

  

  render() {
    return (
      <main className="App">
        <Routes>
          <Route 
            path="/" 
            element={<HomePage 
              user={this.state.user} 
              currentProject={this.state.currentProject}
              viewMode={this.state.viewMode}
              refProjects={this.state.refProjects}
              projects={this.state.projects}
              comment={this.state.comment}
              isSaved={this.state.isSaved}
              isLiked={this.state.isLiked}
              hoverUserState={this.state.hoverUserState}
              hoverUser={this.state.hoverUser}
              // hoverIsLiked={this.state.hoverIsLiked}
              currentTag={this.state.currentTag}
              currentFlag={this.state.currentFlag}
              filter={this.state.filter}
              flags={this.state.flags}
              openChat={this.state.openChat}
              messageList={this.state.messageList}

              userLogout={this.userLogout}
              viewProject={this.viewProject}
              closeProject={this.closeProject}
              handleChange={this.handleChange}
              likeProject={this.likeProject}
              saveProject={this.saveProject}
              hoverProject={this.hoverProject}
              filterByFlag={this.filterByFlag}
              filterByTag={this.filterByTag}
              filterSort={this.filterSort}
              socket={socket}
              postComment={this.postComment}
              delCom={this.delCom}
              likeComment={this.likeComment}
              unlikeComment={this.unlikeComment}
              openChatList={this.openChatList}
            />}
          />
          <Route 
            path="/profile" 
            element={<ProfilePage
              user={this.state.user} 
              currentProject={this.state.currentProject}
              viewMode={this.state.viewMode}
              refProjects={this.state.refProjects}
              projects={this.state.projects}
              comment={this.state.comment}
              isSaved={this.state.isSaved}
              isLiked={this.state.isLiked}
              hoverUserState={this.state.hoverUserState}
              hoverUser={this.state.hoverUser}
              // hoverIsLiked={this.state.hoverIsLiked}

              userLogout={this.userLogout}
              viewProject={this.viewProject}
              closeProject={this.closeProject}
              handleChange={this.handleChange}
              likeProject={this.likeProject}
              saveProject={this.saveProject}
              hoverProject={this.hoverProject}
              postComment={this.postComment}
              delCom={this.delCom}
              likeComment={this.likeComment}
              unlikeComment={this.unlikeComment}
              savedProjects={this.savedProjects}
              likedProjects={this.likedProjects}
              myProjects={this.myProjects}
            />}
          />
          <Route path="account" element={<AccountPage/>}>
            <Route path="login" element={<Login setUserInState={this.setUserInState}/>}/>
            <Route path="signup" element={<SignUpForm setUserInState={this.setUserInState}/>}/>
            <Route path="setup" element={<UserSetUpPage setUserInState={this.setUserInState}/>}/>
          </Route>
          <Route 
            path="/upload"
            element={<ProjectUploadPage 
              user={this.state.user} 
              openChat={this.state.openChat}
              messageList={this.state.messageList}

              userLogout={this.userLogout}
              openChatList={this.openChatList}
            />}
          />
          <Route 
            path="/terms-of-service"
            element={<TermPage 
              user={this.state.user} 
              openChat={this.state.openChat}
              messageList={this.state.messageList}
              userLogout={this.userLogout}
              openChatList={this.openChatList}
            />}
          />
          <Route 
            path="/privacy-policy"
            element={<PolicyPage 
              user={this.state.user} 
              openChat={this.state.openChat}
              messageList={this.state.messageList}
              userLogout={this.userLogout}
              openChatList={this.openChatList}
            />}
          />
          <Route
            path="*"
            element={<Navigate to="/" />}
          />
        </Routes>
      </main>
    );
  }
}