import './ProjectDetail.css'
import React, { useState, useRef }from 'react';
import { Link } from 'react-router-dom';
import RefProjectItem from '../RefProjectItem/RefProjectItem';
import CommentItem from '../CommentItem/CommentItem';
import TagItem from '../TagItem/TagItem'
import UserCard from '../UserCard/UserCard';
import MessagePopUp from '../MessagePopUp/MessagePopUp';
import ProjectListItem from '../ProjectListItem/ProjectListItem';
import moment from 'moment'

export default function ProjectDetail(props) {
    const divRef = useRef()

    const [popUpChat, setpopUpChat] = useState(false)

    function openChatBox() {
        let value = !popUpChat
        setpopUpChat(value)
    }
    
    return(
        <div className='project-detail-background'>
            <div className='project-detail-left' onClick={() => {props.closeProject()}}></div>
            <div className='project-detail-head' onClick={() => {props.closeProject()}}>
                <button><img src={require('../../images/icons/user.svg')} alt="svg icon" /></button>
                {props.project.author.length > 1 ? <p className="project-detail-head-name">Group Project</p> : <p className="project-detail-head-name">{props.project.author[0].username}</p>}
            </div>
            <div className='project-detail-body'>
                {popUpChat ?
                <MessagePopUp
                    author={props.project.author[0]}
                    closeChatBox={openChatBox}
                    setpopUpChat={setpopUpChat}
                /> :
                false
                }
                <div className='project-detail-body-main'>
                    <h1>{props.project.title}</h1>
                    <div className='project-detail-body-img'>
                        Images
                    </div>
                    <div className='project-detail-body-project-link'>
                        {props.project.projectLink.map(link => 
                            <a target="_blank" href={link.url} >{link.name}</a>
                        )}
                    </div>
                    <div className='project-detail-body-section'>
                        {props.project.text.map(section => 
                            <div  className='project-detail-body-section-each' key={section._id}>
                                <h3>{section.heading}</h3>
                                <p>{section.text}</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className='project-detail-body-other' id="toScroll" ref={divRef}>
                    <h2>You may also like</h2>
                    <div className='project-detail-body-other-projects'>
                        {props.refProjects.map(project => 
                            <div key={project._id}>
                                <ProjectListItem
                                    profile={props.profile}
                                    key={project._id} 
                                    project={project} 
                                    hoverProject={props.hoverProject} 
                                    saveProject={props.saveProject}
                                    likeProject={props.likeProject}
                                    isSaved={props.isSaved}
                                    isLiked={props.isLiked}
                                    hoverUserState={props.hoverUserState}
                                    hoverUser={props.hoverUser}
                                    viewProject={props.viewProject}
                                    user={props.user} 
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className='project-detail-body-foot'>
                    <div className='project-detail-body-foot-comment'>
                        <div className='project-detail-body-foot-comment-box'>
                            <div className='comment-user'>
                                <button className='comment-user-img'><img src={require('../../images/icons/user.svg')} className='comment-user-image' alt="svg icon" /></button>
                            </div>
                            <div className='comment-main'>
                                <textarea onChange={props.handleChange} name="comment" value={props.comment}></textarea>
                                <button onClick={() => props.postComment()} >Post a Comment</button>
                            </div>
                        </div>
                        <div className='project-detail-body-foot-comment-list'>
                            {props.project.comment.map(com => <CommentItem 
                                key={com._id} 
                                comment={com}
                                user={props.user} 
                                delCom={props.delCom}
                                projectId={props.project._id}
                                likeComment={props.likeComment}
                                unlikeComment={props.unlikeComment}
                            />)}
                        </div>
                    </div>
                    <div className='project-detail-body-foot-detail'>
                        <div className='project-detail-body-foot-user'>
                            <div className='project-detail-body-foot-user-info'>
                                <button><img src={require('../../images/icons/user.svg')} alt="svg icon" /></button>
                                <div className='project-detail-body-foot-user-info-name'>
                                    <p>{props.project.author[0].name}</p>
                                    <p><img src={require('../../images/icons/location.svg')} alt="svg icon" /> {props.project.author[0].location}</p>
                                </div>
                            </div>
                            <div className='project-detail-body-foot-user-btn'>
                                <button id='user-card-btn-3'><img src={require('../../images/icons/follow-btn.svg')} alt="svg icon" /> <strong>Follow</strong></button>
                                <button id='user-card-btn-4'><img src={require('../../images/icons/mess-btn-1.svg')} alt="svg icon" /> <strong>Message</strong></button>
                            </div>
                        </div>
                        <div className='project-detail-body-foot-info'>
                            <p><strong>{props.project.title}</strong></p>
                            <p>Published on: { moment(props.project.date).format("MMM Do YYYY") }</p>
                            <p>Category: {props.project.flag}</p>
                            <div className='project-detail-body-foot-info-stat'>
                                <p><img src={require('../../images/icons/view.svg')} alt="svg icon" />{props.project.viewCount}</p>
                                <p><img src={require('../../images/icons/like.svg')} alt="svg icon" />{props.project.likeCount}</p>
                                <p><img src={require('../../images/icons/message-white.svg')} alt="svg icon" />{props.project.comment.length}</p>
                            </div>
                        </div>
                        <div className='project-detail-body-foot-tag'>
                            <p className='project-detail-body-foot-tag-p'>Tags</p>
                            <div className='project-detail-body-foot-tag-container'>
                                {props.project.tag.map(tag => <TagItem key={tag} tag={tag} />)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='project-detail-right'>
                <div className='project-detail-right-sub'>
                    <button className='project-detail-right-x' onClick={() => {props.closeProject()}}><img src={require('../../images/icons/x.svg')} alt="svg icon" /></button>
                    { props.project.author.map(user => 
                        <div className='profilebtnhover' >
                            <Link to="/profile"><img id='user-img' src={require('../../images/icons/user.svg')} alt="svg icon" /></Link>
                            <div className="usercard" >
                                <UserCard user={user} />
                            </div>
                        </div>
                    ) }
                    <button onClick={() => props.likeProject(props.project)}>{ props.isLiked ? <img src={require('../../images/icons/like-red.svg')} alt="svg icon" /> : <img src={require('../../images/icons/like.svg')} alt="svg icon" /> }</button>
                    <button onClick={() => props.saveProject(props.project)}>{ props.isSaved ? <img src={require('../../images/icons/save-dark.svg')} alt="svg icon" /> : <img src={require('../../images/icons/save-white.svg')} alt="svg icon" /> }</button>
                    <button onClick={openChatBox}><img src={require('../../images/icons/message-white.svg')} alt="svg icon" /></button>
                    <button onClick={() => divRef.current.scrollIntoView({ behavior: "smooth" }) } ><img src={require('../../images/icons/info.svg')} alt="svg icon" /></button>
                </div>
            </div>
        </div>
    )
}

