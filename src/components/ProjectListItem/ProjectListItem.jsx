import './ProjectListItem.css';
import React from 'react';
import UserIcon from '../UserIcon/UserIcon';
import UserCard from '../UserCard/UserCard'

export default function ProjectListItem(props) {
    return(
        <div className="project-list-item" onMouseEnter={() => { props.needHover ? props.hoverProject(props.project) : console.log('')} } onClick={() => props.scrollPage() }>
            <div className="project-list-item-img">
                <button className="img-save-button" onClick={() => props.saveProject(props.project)}>{ props.user.savedPosts.indexOf(props.project._id) !== -1 ? <img src={require('../../images/icons/save-dark.svg')} alt="svg icon" /> : <img src={require('../../images/icons/save-white.svg')} alt="svg icon" /> }</button>
                
                <div className='img-bottom-icons'>
                    <span>
                        <button className="img-like-button" onClick={() => props.likeProject({ "profile": props.profile, "project": props.project, "userId": props.viewUser._id })}>{ props.user.likedPosts.indexOf(props.project._id) !== -1 ? <img src={require('../../images/icons/like-red.svg')} alt="svg icon" /> : <img src={require('../../images/icons/like.svg')} alt="svg icon" /> }</button><span>{props.project.likeCount}</span>
                    </span>
                    <span>
                        <img className="img-views-count" src={require('../../images/icons/views.svg')} alt="views" /><span>{props.project.viewCount}</span>
                    </span> 
                </div>
                <span className="placeholder-img" onClick={() => props.viewProject({ "profile": props.profile, "project": props.project, "otherUser": props.otherUser })} ><img src={props.project.images[0]} alt="svg icon" /><div className='shader'></div></span>
            </div>
            <div className="project-list-item-foot">
                <div className='profile-btn-hover' >
                    <button onMouseEnter={() => props.getUserCardCounts(props.project.author[0]._id)} onClick={() => props.viewPeople(props.project.author[0]._id)}><UserIcon user={props.project.author[0]} /></button>
                    <div className="user-card">
                        <UserCard 
                            user={props.project.author[0]} 
                            getUserCardCounts={props.getUserCardCounts}
                            userCardLike={props.userCardLike}
                            userCardView={props.userCardView}
                        />
                    </div>
                </div>
                <div className="project-list-item-foot-name">
                    <p>{props.project.title}</p>
                    { props.project.author.length > 1 ? <p>{props.project.author[0].name}'s group project</p> : <p>{props.project.author[0].name}</p> }
                </div>
            </div>
        </div>
    )
    
}