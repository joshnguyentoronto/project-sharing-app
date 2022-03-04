import './ProjectDetail.css'
import React from 'react';


export default function ProjectDetail(props) {
    return(
        <div className='project-detail-background'>
            <div className='project-detail-left' onClick={() => {props.closeProject()}}></div>
            <div className='project-detail-head' onClick={() => {props.closeProject()}}>
                <a href="#"><img src={require('../../images/icons/user.svg')} alt="svg as an image" /></a>
                {props.project.author.length > 1 ? <p className="project-detail-head-name">Group Project</p> : <p className="project-detail-head-name">{props.project.author[0].username}</p>}
            </div>
            <div className='project-detail-body'>
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
                    <a className="project-detail-body-other-userimg" href="#"><img src={require('../../images/icons/user.svg')} alt="svg as an image" /> {props.project.author.length > 1 ? <span className="project-detail-body-other-username">Group Project</span> : <span className="project-detail-body-other-name">{props.project.author[0].username}</span>} </a>
                    
                    
                </div>
                <div className='project-detail-body-foot'>
                    <div className='project-detail-body-foot-comment'>
                        <h1>This is comment box</h1>
                    </div>
                    <div className='project-detail-body-foot-detail'>
                        <h1>This is side box</h1>
                    </div>
                </div>
            </div>
            <div className='project-detail-right' onClick={() => {props.closeProject()}}>
                <div className='project-detail-right-sub' onClick={() => {props.closeProject()}}>
                    <button className='project-detail-right-x' onClick={() => {props.closeProject()}}><img src={require('../../images/icons/x.svg')} alt="svg as an image" /></button>
                    <a href="#"><img src={require('../../images/icons/user.svg')} alt="svg as an image" /></a>
                    <a href="#"><img src={require('../../images/icons/like.svg')} alt="svg as an image" /></a>
                    <a href="#"><img src={require('../../images/icons/save-white.svg')} alt="svg as an image" /></a>
                    <a href="#"><img src={require('../../images/icons/message.svg')} alt="svg as an image" /></a>
                    <a href="#"><img src={require('../../images/icons/info.svg')} alt="svg as an image" /></a>
                </div>
            </div>
        </div>
    )
}

