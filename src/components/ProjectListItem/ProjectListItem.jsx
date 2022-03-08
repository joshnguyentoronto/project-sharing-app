import './ProjectListItem.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import UserCard from '../UserCard/UserCard'

export default class ProjectListItem extends Component {

    render() {
        return(
            <div className="project-list-item" onMouseEnter={() => this.props.hoverProject(this.props.project)}>
                <div className="project-list-item-img">
                    <button className="img-save-button" onClick={() => this.props.saveProject(this.props.project)}>{ this.props.user.savedPosts.indexOf(this.props.project._id) != -1 ? <img src={require('../../images/icons/save-dark.svg')} alt="svg icon" /> : <img src={require('../../images/icons/save-white.svg')} alt="svg icon" /> }</button>
                    
                    <div className='img-bottom-icons'>
                        <span>
                            <button className="img-like-button" onClick={() => this.props.likeProject({ "profile": this.props.profile, "project": this.props.project })}>{ this.props.user.likedPosts.indexOf(this.props.project._id) != -1 ? <img src={require('../../images/icons/like-red.svg')} alt="svg icon" /> : <img src={require('../../images/icons/like.svg')} alt="svg icon" /> }</button><span>{this.props.project.likeCount}</span>
                        </span>
                        <span>
                            <img className="img-views-count" src={require('../../images/icons/views.svg')} alt="views" /><span>{this.props.project.viewCount}</span>
                        </span> 
                    </div>
                    <span className="placeholder-img" onClick={() => this.props.viewProject(this.props.project)} ><img src={require('../../images/image/prop-img.png')} alt="svg icon" /><div className='shader'></div></span>
                </div>
                <div className="project-list-item-foot">
                    <div className='profile-btn-hover' >
                        <Link to="/profile"><img id='user-img' src={require('../../images/icons/user.svg')} alt="svg icon" /></Link>
                        <div className="user-card">
                            <UserCard user={this.props.project.author[0]} />
                        </div>
                    </div>
                    <div className="project-list-item-foot-name">
                        <p>{this.props.project.title}</p>
                        <p>{this.props.project.author[0].name}</p>
                    </div>
                </div>
            </div>
        )
    }
}