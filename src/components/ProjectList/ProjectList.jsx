import './ProjectList.css';
import React from 'react';
import ProjectListItem from '../ProjectListItem/ProjectListItem';

export default function ProjectList(props) {
    return(
        <div className="project-list">
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

                        // otherLike={props.otherLike}
                        // otherView={props.otherView}
                        // getOtherCounts={props.getOtherCounts}
                        getUserCardCounts={props.getUserCardCounts}
                        userCardLike={props.userCardLike}
                        userCardView={props.userCardView}
                    />
                </div>
            )}
        </div>
    )
}