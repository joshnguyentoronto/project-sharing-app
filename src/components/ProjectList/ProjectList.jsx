import './ProjectList.css';
import React from 'react';
import ProjectListItem from '../ProjectListItem/ProjectListItem';

export default function ProjectList(props) {
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