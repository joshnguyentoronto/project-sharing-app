import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import ProjectList from '../../components/ProjectList/ProjectList';
import ProjectDetail from '../../components/ProjectDetail/ProjectDetail';

export default function othersProfilePage(props) {
    const [userData, setUserData] = useState({
        user: {},
        categories: ["Projects", "About"],
        activeCategory: "Projects",
    })
    const [projectData, setProjectData] = useState([])

    let { id } = useParams() 

    // useEffect(() => {
    //     getUserData()
    //     getProjectData()
    // }, [])

    // useEffect(() => {
    //     getProjectData()
    // }, [])

    function handleSetActiveCat (cat) {
        setUserData({...userData, activeCategory: cat})
    }

    // const getProjectData = async () => {
    //     let fetchProjectList = await fetch('/api/projects/user', {headers: { "user": props.viewUser._id }})
    //     let projects = await fetchProjectList.json()
    //     console.log(projects)
    //     await setProjectData(projects)
    // }

    // const getUserData = async () => {
    //     let fetchUser = await fetch('/api/users/', { headers: { "userId": id }})
    //     let user = await fetchUser.json()
    //     // let fetchProjectList = await fetch('/api/projects/user', {headers: { "user": id }})
    //     // let projects = await fetchProjectList.json()
    //     await getProjectData()
    //     setUserData({...userData, user: user })
    //     // console.log(projects)
    //     // setProjectData(projects)
    // }

    return (
        <div className="profile">
        <div className="background-image"><img src={require('../../images/image/no_profile_image.png')} alt="profile background"/></div>
            <ProfileCard loginUser={props.user} user={props.viewUser}/>
    
        <div className="profile-content-area">
            <ul className="ProfileCategory">
                <li 
                    className={"Projects" === userData.activeCategory ? 'active' : ''}
                    onClick={() => {
                        handleSetActiveCat("Projects")
                        props.getOtherProjects(props.viewUser._id)
                    }}
                >Projects</li>

                <li 
                    className={"About" === userData.activeCategory ? 'active' : ''}
                    onClick={() => handleSetActiveCat("About")}
                >About</li>
            </ul>
            
            {userData.activeCategory === "About" ?
            <div class="about-wrapper">
                <div className="profile-info">
                    <p><h4>About</h4><br />{props.viewUser.bio}</p>
                    <p><h4>Skills</h4><br /><ul>{props.viewUser ? props.viewUser.skill.map(s => <li className="skill-item">{s}</li>): props.viewUser.skill}</ul></p>
                    <p><h4>Work Experience</h4><br />{props.viewUser.experiences}</p>
                    <p><h4>Education</h4><br />{props.viewUser.education}</p>
                    <p><h5>Member since: March 2</h5></p>
                </div>

                <div className="profile-social">
                    <p><h4>Contact</h4><br />{props.viewUser.email}</p>
                    <p><h4>Social</h4><br /><ul>{props.viewUser.userLink.map(e => <li>{e.name}: {e.url}</li>)}</ul></p>
                </div>
            </div>
            :
            <ProjectList 
                profile={userData.activeCategory}
                user={props.user}
                otherUser={props.viewUser}
                otherProjects={props.otherProjects}
                // hoverIsLiked={props.hoverIsLiked}
                currentProject={props.currentProject}
                hoverProject={props.hoverProject} 
                hoverUser={props.hoverUser}
                hoverUserState={props.hoverUserState}
                isSaved={props.isSaved}
                isLiked={props.isLiked}
                likeProject={props.likeProject}
                saveProject={props.saveProject}
                viewProject={props.viewProject}
                projects={props.projects}
                viewPeople={props.viewPeople}
                viewUser={props.viewUser}
            />
            }
            {props.viewMode ? 
                <ProjectDetail
                    user={props.user}
                    otherUser={props.viewUser}
                    closeProject={props.closeProject} 
                    project={props.currentProject} 
                    refProjects={props.refProjects}
                    saveProject={props.saveProject}
                    likeProject={props.likeProject}
                    handleChange={props.handleChange}
                    postComment={props.postComment}
                    delCom={props.delCom}
                    likeComment={props.likeComment}
                    unlikeComment={props.unlikeComment}
                    comment={props.comment}
                    isSaved={props.isSaved}
                    isLiked={props.isLiked}
                    hoverUserState={props.hoverUserState}
                    hoverUser={props.hoverUser}
                    hoverProject={props.hoverProject} 
                /> 
                :
                false
            }
        </div>
    </div>
    )
}