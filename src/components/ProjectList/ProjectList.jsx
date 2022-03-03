import './ProjectList.css';
import React from 'react';
import ProjectListItem from '../ProjectListItem/ProjectListItem';

export default function ProjectList(props) {
    return(
        <div className="project-list">
            <ProjectListItem />
            <ProjectListItem />
            <ProjectListItem />
            <ProjectListItem />
            <ProjectListItem />
            <ProjectListItem />
            <ProjectListItem />
            <ProjectListItem />
        </div>
    )
}