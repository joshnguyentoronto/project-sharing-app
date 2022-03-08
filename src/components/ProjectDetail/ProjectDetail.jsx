import './ProjectDetail.css'
import React, {useState}from 'react';
import { Link } from 'react-router-dom';
import RefProjectItem from '../RefProjectItem/RefProjectItem';
import CommentItem from '../CommentItem/CommentItem';
import TagItem from '../TagItem/TagItem'
import UserCard from '../UserCard/UserCard';
import MessagePopUp from '../MessagePopUp/MessagePopUp';

export default function ProjectDetail(props) {

    const [popUpChat, setpopUpChat] = useState(false)

    function openChatBox(){
        console.log('hit')
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
                    name={'Placeholdername Change'}
                    avatar={'placeholder'}
                    closeChatBox={openChatBox}
                /> :
                false
                }
                <div className='project-detail-body-main'>
                    <h1>{props.project.title}</h1>
                    <p className='project-detail-body-img'>Image</p>
                    {props.project.text.map(section => 
                        <div key={section._id}>
                            <h3>{section.heading}</h3>
                            <p>{section.text}</p>
                        </div>
                    )}
                </div>
                <div className='project-detail-body-other'>
                    <h3>You may also like</h3>
                    <button className="project-detail-body-other-userimg"><Link to="/profile"><img src={require('../../images/icons/user.svg')} alt="svg icon" /></Link> {props.project.author.length > 1 ? <span className="project-detail-body-other-username">Group Project</span> : <span className="project-detail-body-other-name">{props.project.author[0].username}</span>} </button>
                    <div className='project-detail-body-other-projects'>
                        {props.refProjects.map(project => <RefProjectItem key={project._id} project={project} />)}
                    </div>
                </div>

                <div className='project-detail-body-foot'>
                    <div className='project-detail-body-foot-comment'>
                        <div className='project-detail-body-foot-comment-box'>
                            <div className='comment-user'>
                                <button className='comment-user-img'><img src={require('../../images/icons/user.svg')} alt="svg icon" /></button>
                            </div>
                            <div className='comment-main'>
                                <textarea onChange={props.handleChange} name="comment" value={props.comment}></textarea>
                                <button onClick={() => props.postComment()} >Post a Comment</button>
                            </div>
                        </div>
                        <div className='project-detail-body-foot-comment-list'>
                            {props.project.comment.map(com => <CommentItem 
                                key={com._id} 
                                user={com.user} 
                                comment={com.text} 
                                like={com.likeCount} 
                                date={com.date}
                                delCom={props.delCom}
                                id={com._id}
                                projectId={props.project._id}
                            />)}
                        </div>
                    </div>
                    <div className='project-detail-body-foot-detail'>
                        <div className='project-detail-body-foot-user'>
                            <div className='project-detail-body-foot-user-info'>
                                <button><img src={require('../../images/icons/user.svg')} alt="svg icon" /></button>
                                <p>user name</p>
                            </div>
                            <div className='project-detail-body-foot-user-btn'>
                                <button>Follow</button>
                                <button>Message</button>
                            </div>
                        </div>
                        <div className='project-detail-body-foot-info'>
                            <p>{props.project.title}</p>
                            <p>{props.project.date}</p>
                            <p>{props.project.flag}</p>
                            <p>{props.project.viewCount}</p>
                            <p>{props.project.likeCount}</p>
                            <p>{props.project.comment.length}</p>
                        </div>
                        <div className='project-detail-body-foot-tag'>
                            <p>Tags</p>
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
                    <div className='profilebtnhover' >
                        <Link to="/profile"><img id='user-img' src={require('../../images/icons/user.svg')} alt="svg icon" /></Link>
                        <div className="usercard" >
                            <UserCard user={props.project.author[0]} />
                        </div>
                    </div>
                    <button onClick={() => props.likeProject(props.project)}>{ props.isLiked ? <img src={require('../../images/icons/like-red.svg')} alt="svg icon" /> : <img src={require('../../images/icons/like.svg')} alt="svg icon" /> }</button>
                    <button onClick={() => props.saveProject(props.project)}>{ props.isSaved ? <img src={require('../../images/icons/save-dark.svg')} alt="svg icon" /> : <img src={require('../../images/icons/save-white.svg')} alt="svg icon" /> }</button>
                    <button onClick={openChatBox}><img src={require('../../images/icons/message.svg')} alt="svg icon" /></button>
                    <button><img src={require('../../images/icons/info.svg')} alt="svg icon" /></button>
                </div>
            </div>
        </div>
    )
}

