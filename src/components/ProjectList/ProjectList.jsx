import './ProjectList.css';
import React from 'react';
import ProjectListItem from '../ProjectListItem/ProjectListItem';

export default function ProjectList(props) {
    return(
        <div className="project-list">
            {props.projects.map(project => 
                <a href="#" onClick={() => props.viewProject(project)} key={project._id}><ProjectListItem key={project._id} project={project} /></a>
            )}
        </div>
    )
}