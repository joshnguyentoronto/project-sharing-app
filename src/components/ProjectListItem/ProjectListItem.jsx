import './ProjectListItem.css';
import React, { Component } from 'react';
import { Link, useParams } from 'react-router-dom'
import UserCard from '../UserCard/UserCard'

export default function ProjectListItem(props) {
    
        return(
            <div className="project-list-item" onMouseEnter={() => props.hoverProject(props.project)}>
                <div className="project-list-item-img">
                    <button className="img-save-button" onClick={() => props.saveProject(props.project)}>{ props.user.savedPosts.indexOf(props.project._id) != -1 ? <img src={require('../../images/icons/save-dark.svg')} alt="svg icon" /> : <img src={require('../../images/icons/save-white.svg')} alt="svg icon" /> }</button>
                    
                    <div className='img-bottom-icons'>
                        <span>
                            <button className="img-like-button" onClick={() => props.likeProject({ "profile": props.profile, "project": props.project, "otherUser": props.otherUser })}>{ props.user.likedPosts.indexOf(props.project._id) != -1 ? <img src={require('../../images/icons/like-red.svg')} alt="svg icon" /> : <img src={require('../../images/icons/like.svg')} alt="svg icon" /> }</button><span>{props.project.likeCount}</span>
                        </span>
                        <span>
                            <img className="img-views-count" src={require('../../images/icons/views.svg')} alt="views" /><span>{props.project.viewCount}</span>
                        </span> 
                    </div>
                    <span className="placeholder-img" onClick={() => props.viewProject({ "profile": props.profile, "project": props.project, "otherUser": props.otherUser })} ><img src={require('../../images/image/prop-img.png')} alt="svg icon" /><div className='shader'></div></span>
                </div>
                <div className="project-list-item-foot">
                    <div className='profile-btn-hover' >
                        <Link to={`/profile/${props.project.author[0]._id}`}><img id='user-img' src={require('../../images/icons/user.svg')} alt="svg icon" /></Link>
                        <div className="user-card">
                            <UserCard user={props.project.author[0]} />
                        </div>
                    </div>
                    <div className="project-list-item-foot-name">
                        <p>{props.project.title}</p>
                        <p>{props.project.author[0].name}</p>
                    </div>
                </div>
            </div>
        )
    
}