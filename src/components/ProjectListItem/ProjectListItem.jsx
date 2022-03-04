import './ProjectListItem.css';
import React from 'react';

export default function ProjectListItem(props) {
    return(
        <div className="project-list-item">
            <div className="project-list-item-img">
            </div>
            <div className="project-list-item-foot">
                <div className="project-list-item-foot-icon">
                    <div className="project-list-item-foot-icon-author">
                        <p>{props.project.title}</p>
                        {/* <p>{props.project.author.length > 1 ? "Group project" : props.project.author[0].name}</p> */}
                    </div>
                    <div className="project-list-item-foot-icon-stat">
                        <p>{"Like" + props.project.likeCount}</p>
                        <p>{"View" + props.project.viewCount}</p>
                        <p>{"Com" + props.project.comment.length}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}