import React, { Component } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css';
import HomePage from '../HomePage/HomePage';
import AccountPage from '../AccountPage/AccountPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import Login from '../../components/Login/Login';
import SignUpForm from '../../components/SignUp/Signup';
import UserSetUpPage from '../UserSetUpPage/UserSetUpPage';
import ProjectUploadPage from '../ProjectUploadPage/ProjectUploadPage';

export default class App extends Component {
  state = {
    flags: ['UX/UI design', 'Software Engineer', 'Data Science', 'Digital Marketing'],
    currentFlag: '',
    currentTag: '',

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
    hoverIsLiked: false,
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

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  saveProject = async () => {
    try {
        let fetchResponse = await fetch('/api/users/save', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({savedPosts: this.state.currentProject._id, userId: this.state.user._id})
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
            body: JSON.stringify({likedPosts: this.state.currentProject._id, userId: this.state.user._id})
        })
        let user = await fetchResponse.json()
        if (user.likedPosts.indexOf(this.state.currentProject._id) != -1 ) {
            this.setState({ isLiked: true, user: user })
        } else if (user.likedPosts.indexOf(this.state.currentProject._id) == -1 ) {
            this.setState({ isLiked: false, user: user })
        }
        console.log("Success:", user)
    } catch (err) {
        console.log(err)
    }
  }

  hoverProject = async (project) => {
    if (this.state.user.likedPosts.indexOf(project._id) == -1) {
      this.setState({ hoverIsLiked: false, currentProject: project })
    } else {
      this.setState({ hoverIsLiked: true, currentProject: project })
    }
    
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

  async componentDidMount(){
    let token = localStorage.getItem('token')
    if (token){
      const payload = JSON.parse(atob(token.split('.')[1]))
      if (payload.exp < Date.now() /1000) {
        localStorage.removeItem('token')
        token= null
        try {
          let fetchProjectList = await fetch('/api/projects')
          let projects = await fetchProjectList.json()
          this.setState({projects: projects})
        } catch(err) {
          console.log("home page error: ", err)
        }
      } else {
        let userDoc = payload.user
        try {
          let fetchProjectList = await fetch('/api/projects')
          let projects = await fetchProjectList.json()
          this.setState({ projects: projects, user:userDoc })
        } catch(err) {
          console.log("home page error: ", err)
        }
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
              hoverIsLiked={this.state.hoverIsLiked}
              currentTag={this.state.currentTag}
              currentFlag={this.state.currentFlag}
              flags={this.state.flags}

              userLogout={this.userLogout}
              viewProject={this.viewProject}
              closeProject={this.closeProject}
              handleChange={this.handleChange}
              likeProject={this.likeProject}
              saveProject={this.saveProject}
              hoverProject={this.hoverProject}
              postComment={this.postComment}
              delCom={this.delCom}
              filterByFlag={this.filterByFlag}
              filterByTag={this.filterByTag}
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
              hoverIsLiked={this.state.hoverIsLiked}

              userLogout={this.userLogout}
              viewProject={this.viewProject}
              closeProject={this.closeProject}
              handleChange={this.handleChange}
              likeProject={this.likeProject}
              saveProject={this.saveProject}
              hoverProject={this.hoverProject}
              postComment={this.postComment}
              delCom={this.delCom}
            />}
          />
          <Route path="account" element={<AccountPage/>}>
            <Route path="login" element={<Login setUserInState={this.setUserInState}/>}/>
            <Route path="signup" element={<SignUpForm setUserInState={this.setUserInState}/>}/>
            <Route path="setup" element={<UserSetUpPage setUserInState={this.setUserInState}/>}/>
          </Route>
          <Route 
            path="/upload"
            element={<ProjectUploadPage user={this.state.user}/>}
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