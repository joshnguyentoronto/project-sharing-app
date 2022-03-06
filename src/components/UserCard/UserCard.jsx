import './UserCard.css';
import React from 'react';

export default function UserCard(props) {
    return(
        <div className="card">
            <div className='card-bg'>
                <p>background img</p>
            </div>
            <img className='card-img' id='card-img' src={require('../../images/icons/user.svg')} alt="svg icon" />
            <div className='card-name'>
                <p className='card-name-name'>{props.user.name}</p>
                <p className='card-name-lo'>{props.user.location}</p>
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
            <div className='card-btn'>
                <button>Follow</button>
                <button>Message</button>
            </div>
        </div>
    )
}