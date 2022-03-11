import './ProjectList.css';
import React, { useRef } from 'react';
import ProjectListItem from '../ProjectListItem/ProjectListItem';

export default function ProjectList(props) {
    const divRef2 = useRef()

    function scrollPage() {
        divRef2.current.scrollIntoView({ behavior: "smooth" })
    }
    
    return(
        <div className="project-list" >
            <p id="hidden-to-scroll" ref={divRef2}>hidden</p>
            {props.projects.map(project => 
                <div key={project._id}>
                    <ProjectListItem
                        profile={props.profile}
                        key={project._id} 
                        project={project} 
                        hoverProject={props.hoverProject} 
                        saveProject={props.saveProject}
                        likeProject={props.likeProject}
                        isSaved={props.isSaved}
                        isLiked={props.isLiked}
                        hoverUserState={props.hoverUserState}
                        hoverUser={props.hoverUser}
                        viewProject={props.viewProject}
                        user={props.user} 
                        otherUser={props.otherUser}
                        currentProject={props.currentProject}
                        viewPeople={props.viewPeople}
                        viewUser={props.viewUser}
                        scrollPage={scrollPage}
                        getUserCardCounts={props.getUserCardCounts}
                        userCardLike={props.userCardLike}
                        userCardView={props.userCardView}
                    />
                </div>
            )}
        </div>
    )
}