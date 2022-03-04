import './ProjectList.css';
import React from 'react';
import ProjectListItem from '../ProjectListItem/ProjectListItem';

export default function ProjectList(props) {
    return(
        <div className="project-list">
            {props.projects.map(project => 
                <ProjectListItem onClick={props.viewProject} key={project.title} project={project} />
            )}
        </div>
    )
}