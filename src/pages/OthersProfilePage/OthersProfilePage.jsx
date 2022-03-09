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
        projects: [],
    })

    let { id } = useParams() 

    useEffect(() => {
        getUserData()
    }, [])

    function handleSetActiveCat (cat) {
        setUserData({...userData, activeCategory: cat})
    }

    const getUserData = async () => {
        let fetchUser = await fetch('/api/users/', { headers: { "userId": id }})
        let user = await fetchUser.json()
        let fetchProjectList = await fetch('/api/projects/user', {headers: { "user": id }})
        let projects = await fetchProjectList.json()
        setUserData({...userData, user: user, projects: projects })
    }

    
    return (
        <div className="profile">
        <div className="background-image"><img src={require('../../images/image/no_profile_image.png')} alt="profile background"/></div>
            <h1>{userData.user.name}</h1>
            <ProfileCard loginUser={props.user} user={userData.user}/>
    
        <div className="profile-content-area">
            <ul className="ProfileCategory">
                <li 
                    className={"Projects" === userData.activeCategory ? 'active' : ''}
                    onClick={() => {
                        handleSetActiveCat("Projects")
                        props.getOtherProjects(userData.user._id)
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
                    <p><h4>About</h4><br />{userData.user.bio}</p>
                    <p><h4>Skills</h4><br /><ul>{userData.user ? userData.user.skill.map(s => <li className="skill-item">{s}</li>): userData.user.skill}</ul></p>
                    <p><h4>Work Experience</h4><br />{userData.user.experiences}</p>
                    <p><h4>Education</h4><br />{userData.user.education}</p>
                    <p><h5>Member since: March 2</h5></p>
                </div>

                <div className="profile-social">
                    <p><h4>Contact</h4><br />{userData.user.email}</p>
                    <p><h4>Social</h4><br /><ul>{userData.user.userLink.map(e => <li>{e.name}: {e.url}</li>)}</ul></p>
                </div>
            </div>
            :
            <ProjectList 
                profile={userData.activeCategory}
                user={props.user}
                otherUser={userData.user}
                projects={props.otherProjects}
                // hoverIsLiked={props.hoverIsLiked}
                hoverProject={props.hoverProject} 
                hoverUser={props.hoverUser}
                hoverUserState={props.hoverUserState}
            //  isSaved={props.isSaved}
                likeProject={props.likeProject}
                saveProject={props.saveProject}
                viewProject={props.viewProject}
                projects={userData.projects}
            />
            }
            {props.viewMode ? 
                <ProjectDetail
                    user={props.user}
                    otherUser={userData.user}
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
                /> 
                :
                false
            }
        </div>
    </div>
    )
}