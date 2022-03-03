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
                        <p>Title la la la la la la</p>
                        <p>Name</p>
                    </div>
                    <div className="project-list-item-foot-icon-stat">
                        <p>@ 100</p>
                        <p>@ 124</p>
                        <p>@ 43</p>
                    </div>
                </div>
            </div>
        </div>
    )
}