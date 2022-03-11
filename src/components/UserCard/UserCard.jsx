import './UserCard.css';
import React from 'react';
import UserIcon from '../UserIcon/UserIcon';

export default function UserCard(props) {

    return(
        <div className="card">
            <div className='user-card-container'>
                { props.user.background ? <div style={{backgroundImage: `url(${props.user.background})`}} className='card-bg'></div> : <div className='card-bg-2'></div> }
                { props.user.avatar 
                ? 
                <button 
                    className='user-icon-bg-btn' 
                    style={{backgroundImage: `url(${props.user.avatar})`}}
                ></button> 
                : 
                <button className='card-user-icon'>
                    <UserIcon user={props.user} 
                /></button> 
                }
                <div className='card-name'>
                    <p className='card-name-name'>{props.user.name}</p>
                    <p className='card-name-lo'><img src={require('../../images/icons/location.svg')} alt="svg icon" /> {props.user.location}</p>
                </div>
                <div className='card-stat'>
                    <div className='card-stat-each'>
                        <p>{props.userCardLike}</p>
                        <p>Project Likes</p>
                    </div>
                    <div className='card-stat-each'>
                        <p>0</p>
                        <p>Follower</p>
                    </div>
                    <div className='card-stat-each'>
                        <p>{props.userCardView}</p>
                        <p>Project View</p>
                    </div>
                </div>
                <div className='user-card-btn'>
                    <button id='user-card-btn-1'><img src={require('../../images/icons/follow-btn.svg')} alt="svg icon" /> 
                        <strong>Follow</strong>
                    </button>
                    <button id='user-card-btn-2'><img src={require('../../images/icons/mess-btn-1.svg')} alt="svg icon" /> 
                        <strong>Message</strong>
                    </button>
                </div>
            </div>
        </div>
    )
}