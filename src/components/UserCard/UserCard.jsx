import './UserCard.css';
import React from 'react';

export default function UserCard(props) {
    return(
        <div className="card">
            <div className='user-card-container'>
                <div className='card-bg'>
                    
                </div>
                <img className='card-img' id='card-img' src={require('../../images/icons/user.svg')} alt="svg icon" />
                <div className='card-name'>
                    <p className='card-name-name'>{props.user.name}</p>
                    <p className='card-name-lo'><img src={require('../../images/icons/location.svg')} alt="svg icon" /> {props.user.location}</p>
                </div>
                <div className='card-stat'>
                    <div className='card-stat-each'>
                        <p>{props.user.likedPosts.length}</p>
                        <p>Project Likes</p>
                    </div>
                    <div className='card-stat-each'>
                        <p>0</p>
                        <p>Follower</p>
                    </div>
                    <div className='card-stat-each'>
                        <p>{props.user.savedPosts.length}</p>
                        <p>Project View</p>
                    </div>
                </div>
                <div className='user-card-btn'>
                    <button id='user-card-btn-1'><img src={require('../../images/icons/follow-btn.svg')} alt="svg icon" /> <strong>Follow</strong></button>
                    <button id='user-card-btn-2'><img src={require('../../images/icons/mess-btn-1.svg')} alt="svg icon" /> <strong>Message</strong></button>
                </div>
            </div>
        </div>
    )
}