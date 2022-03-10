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
import EditProfilePage from '../EditProfilePage/EditProfilePage';
import OthersProfilePage from '../OthersProfilePage/OthersProfilePage';
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
    user: this.falseUser,
    viewUser: null,
    currentProject: '',
    viewMode: false,
    refProjects: [],
    projects: [],
    otherProjects: [],
    comment: '',
    isSaved: false,
    isLiked: false,
    hoverUserState: false,
    hoverUser: {},
  }

  falseUser = {
    _id: "",
    name: "",
    username: "",
    email: "",
    password: "",
    skill: [],
    edducation: "",
    experiences: [],
    conversations: [],
    savedPosts: [],
    likedPosts: [],
    userLink: [],
    bio: "",
    location: "",
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

  viewProject = async (obj) => {
    let project = obj.project
    let profile = obj.profile
    let otherUser = obj.otherUser
    if (!this.state.user._id) {
        try {
            let fetchRefProjectList = await fetch('/api/projects/ref', {headers: { "user": project.author[0]._id }})
            let refProjects = await fetchRefProjectList.json()
            let fetchOneProject = await fetch('api/projects/getOne', {headers: {"projectId": project._id }})
            let oneProject = await fetchOneProject.json()
            let fetchAllProjects = await fetch('/api/projects')
            let allProjects = await fetchAllProjects.json()
            this.setState({ currentProject: oneProject, projects: allProjects, viewMode: true, refProjects: refProjects })
        } catch(err) {
            console.log(err)
        }
    } else if (otherUser) {
      try {
          let fetchUser = await fetch('/api/users/', { headers: { "userId": this.state.user._id }})
          let user = await fetchUser.json()
          let fetchRefProjectList = await fetch('/api/projects/ref', {headers: { "user": otherUser._id }})
          let refProjects = await fetchRefProjectList.json()
          let fetchOneProject = await fetch('/api/projects/getOne', {headers: {"projectId": project._id }})
          let oneProject = await fetchOneProject.json()
          let fetchAllProjects = await fetch('/api/projects/user', {headers: { "profile": profile, "user": otherUser._id }})
          let allProjects = await fetchAllProjects.json()
        
          if (user.savedPosts.indexOf(project._id) !== -1 ) {
            if (user.likedPosts.indexOf(project._id) !== -1 ) {
              this.setState({ isLiked: true, isSaved: true, currentProject: oneProject, otherProjects: allProjects, viewMode: true, refProjects: refProjects })
            } else if (user.likedPosts.indexOf(project._id) === -1 ) {
              this.setState({ isLiked: false, isSaved: true, currentProject: oneProject, otherProjects: allProjects, viewMode: true, refProjects: refProjects })
            }
          } else if (user.savedPosts.indexOf(project._id) === -1 ) {
            if (user.likedPosts.indexOf(project._id) !== -1 ) {
              this.setState({ isLiked: true, isSaved: false, currentProject: oneProject, otherProjects: allProjects, viewMode: true, refProjects: refProjects })
              
            } else if (user.likedPosts.indexOf(project._id) === -1 ) {
              this.setState({ isLiked: false, isSaved: false, currentProject: oneProject, otherProjects: allProjects, viewMode: true, refProjects: refProjects })
            }
          } else {
            this.setState({ isLiked: false, isSaved: false, currentProject: oneProject, otherProjects: allProjects, viewMode: true, refProjects: refProjects })
          }
      } catch(err) {
          console.log(err)
      }
    } else {
      try {
          let fetchUser = await fetch('/api/users', { headers: { "userId": this.state.user._id }})
          let user = await fetchUser.json()
          let fetchRefProjectList = await fetch('/api/projects/ref', {headers: { "user": project.author[0]._id }})
          let refProjects = await fetchRefProjectList.json()
          let fetchOneProject = await fetch('/api/projects/getOne', {headers: {"projectId": project._id }})
          let oneProject = await fetchOneProject.json()
          let fetchAllProjects = await fetch('/api/projects', {headers: { "profile": profile, "userId": this.state.user._id }})
          let allProjects = await fetchAllProjects.json()
          if (user.savedPosts.indexOf(project._id) !== -1 ) {
            if (user.likedPosts.indexOf(project._id) !== -1 ) {
              this.setState({ isLiked: true, isSaved: true, currentProject: oneProject, projects: allProjects, viewMode: true, refProjects: refProjects })
            } else if (user.likedPosts.indexOf(project._id) === -1 ) {
              this.setState({ isLiked: false, isSaved: true, currentProject: oneProject, projects: allProjects, viewMode: true, refProjects: refProjects })
            }
          } else if (user.savedPosts.indexOf(project._id) === -1 ) {
            if (user.likedPosts.indexOf(project._id) !== -1 ) {
              this.setState({ isLiked: true, isSaved: false, currentProject: oneProject, projects: allProjects, viewMode: true, refProjects: refProjects })
            } else if (user.likedPosts.indexOf(project._id) === -1 ) {
              this.setState({ isLiked: false, isSaved: false, currentProject: oneProject, projects: allProjects, viewMode: true, refProjects: refProjects })
            }
          } else {
            this.setState({ isLiked: false, isSaved: false, currentProject: oneProject, projects: allProjects, viewMode: true, refProjects: refProjects })
          }
      } catch(err) {
          console.log(err)
      }
    }
  }

  closeProject = async () => {
    this.setState({ currentProject: '', viewMode: false })
  }

  savedProjects = async () => {
    if (!this.state.user._id) {
      alert("Please log in to save your favorite projects")
    } else {
      try {
        let fetchProjectList = await fetch('/api/projects/saved', {headers: { "user": this.state.user._id }})
        let projects = await fetchProjectList.json()
        this.setState({ projects: projects })
      } catch(err) {
          console.log("home page error: ", err)
      }
    }
  }

  likedProjects = async () => {
    if (!this.state.user._id) {
      alert("Please log in to see what you liked")
    } else {
      try {
          let fetchProjectList = await fetch('/api/projects/liked', {headers: { "user": this.state.user._id }})
          let projects = await fetchProjectList.json()
          this.setState({ projects: projects })
      } catch(err) {
          console.log("home page error: ", err)
      }
    }
  }

  myProjects = async () => {
    if (this.state.user._id) {
      try {
          let fetchProjectList = await fetch('/api/projects/user', {headers: { "user": this.state.user._id }})
          let projects = await fetchProjectList.json()
          this.setState({ projects: projects })
      } catch(err) {
          console.log("home page error: ", err)
      }
    } else {
      this.setState({ projects: [] })
    }
  }

  viewPeople = async (id) => {
    console.log('hello')
    let fetchUser = await fetch('/api/users/', { headers: { "userId": id }})
    let user = await fetchUser.json()
    let fetchProjectList = await fetch('/api/projects/user', {headers: { "user": id }})
    let projects = await fetchProjectList.json()
    this.setState({ viewUser: user, projects: projects })
    const hiddenLink2 = document.getElementById('hidden-link')
    hiddenLink2.click()
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
    if (evt.target.value === 'alphabetical') {
      let newProjects = await this.state.projects.sort((a, b) => (a.title > b.title ? 1 : -1))
      this.setState({ filter: evt.target.value, projects: newProjects })
    } else if (evt.target.value === 'alpha') {
      let newProjects = await this.state.projects.sort((a, b) => (a.title > b.title ? -1 : 1))
      this.setState({ filter: evt.target.value, projects: newProjects })
    } else if (evt.target.value === 'recent') {
      let newProjects = await this.state.projects.sort((a, b) => (b.date > a.date ? 1 : -1))
      this.setState({ filter: evt.target.value, projects: newProjects })
    } else if (evt.target.value === 'view') {
      let newProjects = await this.state.projects.sort((a, b) => b.viewCount - a.viewCount)
      this.setState({ filter: evt.target.value, projects: newProjects })
    } else if (evt.target.value === 'like') {
      let newProjects = await this.state.projects.sort((a, b) => b.likeCount - a.likeCount)
      this.setState({ filter: evt.target.value, projects: newProjects })
    } else if (evt.target.value === 'comment') {
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
    if (!this.state.user._id) {
      alert("Please log in to use this feature")
    } else {
      try {
          let fetchResponse = await fetch('/api/users/save', {
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({savedPosts: project._id, userId: this.state.user._id})
          })
          let user = await fetchResponse.json()
          if (user.savedPosts.indexOf(project._id) !== -1 ) {
            this.setState({ isSaved: true, user: user  })
          } else if (user.savedPosts.indexOf(project._id) === -1 ) {
            this.setState({ isSaved: false, user: user  })
          }
      } catch (err) {
          console.log(err)
      }
    }
  }

  likeProject = async (obj) => {
    if (obj.userId) {
      let project = obj.project
        try {
          let fetchResponse = await fetch('/api/users/like/profile', {
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({likedPosts: project._id, userId: this.state.user._id, cat: "Projects", otherUser: obj.userId })
          })
          let object = await fetchResponse.json()
          let user = object.user
          let newProject = object.newProject
          // let fetchMe = await fetch("/api/users/", {headers: { "user": this.state.user._id }})
          // let MeUser = await fetchMe.json()
          let newprojects = object.projectsList
          if (user.likedPosts.indexOf(newProject._id) !== -1 ) {
              this.setState({ isLiked: true, user: user, projects: newprojects, currentProject: newProject })
          } else if (user.likedPosts.indexOf(newProject._id) === -1 ) {
              this.setState({ isLiked: false, user: user, projects: newprojects, currentProject: newProject })
          }
        } catch (err) {
            console.log(err)
        }
    } else if (!this.state.user._id) {
      alert("Please log in to use this feature")
      window.setTimeout(window.close(), 5000);
    } else {
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
          console.log(newProject)
          let newprojects = object.projectsList
          if (user.likedPosts.indexOf(newProject._id) !== -1 ) {
              this.setState({ isLiked: true, user: user, projects: newprojects, currentProject: newProject })
          } else if (user.likedPosts.indexOf(newProject._id) === -1 ) {
              this.setState({ isLiked: false, user: user, projects: newprojects, currentProject: newProject })
          }
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
          if (user.likedPosts.indexOf(newProject._id) !== -1 ) {
              this.setState({ isLiked: true, user: user, projects: newprojects, currentProject: newProject })
          } else if (user.likedPosts.indexOf(newProject._id) === -1 ) {
              this.setState({ isLiked: false, user: user, projects: newprojects, currentProject: newProject })
          }
        } catch (err) {
            console.log(err)
        }
      }
    }
  }

  hoverProject = async (project) => {
    this.setState({ currentProject: project })
  }

  setUserInState = (incomingUserData) => {
    this.setState({ user: incomingUserData})
  }

  userLogout = () =>{
    let token = localStorage.getItem('token')
    if (token){
      token= null
      localStorage.removeItem('token')
      this.setState({ user: this.falseUser })
    }
  }

  postComment = async () => {
    if (!this.state.user._id) {
      alert("Please log in to comment on other's post!")
    } else {
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

  submitProfile = async (postBody) => {
    const fetchResponse = await fetch('/api/users/edit', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "userId": this.state.user._id
        },
        body: JSON.stringify(postBody)
    })
    let user = await fetchResponse.json()
    if (!fetchResponse.ok) {
      throw new Error('Fetch failed - Bad request')
    } else {
      const hiddenLink = document.getElementById('hidden-link')
      this.setState({ user: user }) 
      hiddenLink.click()
    }
}

  likeComment = async (arr) => {
    if (!this.state.user._id) {
      alert("Please log in to use this feature")
    } else {
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

  getOtherProjects = async (userId) => {
    try {
      let fetchProjectList = await fetch('/api/projects/user', {headers: { "user": userId }})
      let projects = await fetchProjectList.json()
      this.setState({ otherProjects: projects })
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
          this.setState({ filter: '', projects: projects, user: this.falseUser })
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
        this.setState({ filter: '', projects: projects, user: this.falseUser })
      } catch(err) {
        console.log("home page error: ", err)
      }
    }
    if (this.state.projects.length === 0) {
      window.location.reload(false);
    }
  }

  render() {
    let theId = ''
    if (this.state.viewUser) {
      theId = this.state.viewUser._id
    } else {
      theId = ''
    }
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
              viewPeople={this.viewPeople}
              viewUser={this.state.viewUser}

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
              viewUser={this.state.viewUser}

              viewMode={this.state.viewMode}
              refProjects={this.state.refProjects}
              projects={this.state.projects}
              comment={this.state.comment}
              isSaved={this.state.isSaved}
              isLiked={this.state.isLiked}
              hoverUserState={this.state.hoverUserState}
              hoverUser={this.state.hoverUser}
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
              viewPeople={this.viewPeople}
            />}
          />
          <Route 
            path="/profile/edit"
            element={<EditProfilePage user={this.state.user}  submitProfile={this.submitProfile}/>}
          />
          <Route
            path="/profile/:id"
            element={<OthersProfilePage 
                user={this.state.user} 
                getOtherProjects={this.getOtherProjects}
                hoverProject={this.hoverProject} 
                hoverUser={this.state.hoverUser}
                hoverUserState={this.state.hoverUserState}
                likeProject={this.likeProject}
                saveProject={this.saveProject}
                viewProject={this.viewProject}
                closeProject={this.closeProject} 
                otherProjects={this.state.otherProjects} 
                currentProject={this.state.currentProject}
                projects={this.state.projects}
                viewUser={this.state.viewUser}

                refProjects={this.state.refProjects}
                handleChange={this.handleChange}
                postComment={this.postComment}
                delCom={this.delCom}
                likeComment={this.likeComment}
                unlikeComment={this.unlikeComment}
                comment={this.state.comment}
                isSaved={this.state.isSaved}
                isLiked={this.state.isLiked}
                viewMode={this.state.viewMode}
                viewPeople={this.viewPeople}
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
        { theId ? <Link id="hidden-link" to={"/profile/" + theId}></Link> : false }
        {/* // <Link id="hidden-link" to={"/profile/" + this.state.viewUser._id}></Link> */}
        <Link id="hidden-link-login" to="/account/login"></Link>
      </main>
    );
  }
}