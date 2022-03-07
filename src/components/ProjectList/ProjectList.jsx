import './ProjectList.css';
import React from 'react';
import ProjectListItem from '../ProjectListItem/ProjectListItem';
import { useLocation } from 'react-router-dom'

export default function ProjectList(props) {
    const location = useLocation()
    // console.log(location.state)
    return(
        <div className="project-list">
            {props.projects.map(project => 
                <div key={project._id}>
                    <ProjectListItem 
                        key={project._id} 
                        project={project} 
                        hoverProject={props.hoverProject} 
                        saveProject={props.saveProject}
                        likeProject={props.likeProject}
                        isSaved={props.isSaved}
                        hoverIsLiked={props.hoverIsLiked}
                        hoverUserState={props.hoverUserState}
                        hoverUser={props.hoverUser}
                        viewProject={props.viewProject}
                    />
                </div>
            )}
        </div>
    )
}