import './ProjectListItem.css';
import React from 'react';
import { Link } from 'react-router-dom'
import UserCard from '../UserCard/UserCard'

export default function ProjectListItem(props) {
    return(
        <div className="project-list-item" onMouseEnter={() => props.hoverProject(props.project)}>
            <div className="project-list-item-img">
                <button className="img-save-button" onClick={() => props.saveProject()}>{ props.isSaved ? <img src={require('../../images/icons/save-dark.svg')} alt="svg icon" /> : <img src={require('../../images/icons/save-white.svg')} alt="svg icon" /> }</button>
                
                <div className='img-bottom-icons'>
                    <span>
                        <button className="img-like-button" onClick={() => props.likeProject()}>{ props.hoverIsLiked ? <img src={require('../../images/icons/like-red.svg')} alt="svg icon" /> : <img src={require('../../images/icons/like.svg')} alt="svg icon" /> }</button><span>100</span>
                    </span>

                    <span>
                        <img className="img-views-count" src={require('../../images/icons/views.svg')} alt="views" /><span>100</span>
                    </span> 
                </div>
                <span className="placeholder-img" onClick={() => props.viewProject(props.project)} ></span>   
            </div>
            <div className="project-list-item-foot">
                <div className='profile-btn-hover' >
                    <Link to="/profile"><img id='user-img' src={require('../../images/icons/user.svg')} alt="svg icon" /></Link>
                    <div className="user-card">
                        <UserCard user={props.project.author[0]} />
                    </div>
                </div>
                <div>
                    <p>{props.project.author[0].name}</p>
                </div>
            </div>
        </div>
    )
}