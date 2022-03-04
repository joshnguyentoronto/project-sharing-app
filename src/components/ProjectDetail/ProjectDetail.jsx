import './ProjectDetail.css'
import React from 'react';

export default function ProjectDetail(props) {
    return(
        <div className='project-detail-background'>
            <div className='project-detail-left' onClick={() => {props.closeProject()}}></div>
            <div className='project-detail-head' onClick={() => {props.closeProject()}}>
                <img src="#" alt="profile"/>
                {props.project.author.map(author => <h1 key={author.name} >{author.name}</h1> )}
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
                    <h1>{`${props.project.author[0].username}'s other projects:`}</h1>
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
                <button onClick={() => {props.closeProject()}}>x</button>
                <a href="#">user</a>
                <a href="#">like</a>
                <a href="#">save</a>
                <a href="#">comment</a>
                <a href="#">info</a>
            </div>
        </div>
    )
}