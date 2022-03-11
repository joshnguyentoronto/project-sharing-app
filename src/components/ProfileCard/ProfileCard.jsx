import "./ProfileCard.css"
import React from 'react'
import { Link } from 'react-router-dom';

export default function ProfileCard (props) {
    return (
        <div className="profile-card" >
            { props.loginUser.avatar ? <img src={props.user.avatar} alt="profile"/> : <img src={require('../../images/image/no_profile_image.png')} alt="profile"/> }
            <h1>{props.user.name}</h1>
            <h4>{props.user.location}</h4>
            {props.loginUser ? props.user._id === props.loginUser._id ? <Link to="/profile/edit">Edit Profile</Link> 
            : <Link to="/profile/follow"><img src={require('../../images/icons/follow-btn.svg')} alt="svg icon" />follow</Link> 
            : <Link to="/profile/follow"><img src={require('../../images/icons/follow-btn.svg')} alt="svg icon" />follow</Link> 
            }
            <br />
            {props.loginUser ? props.user._id === props.loginUser._id ? <Link to="/upload">Upload a Project</Link> 
            : <Link to="/profile/message"><img src={require('../../images/icons/mess-btn-1.svg')} alt="svg icon" />Message</Link> 
            : <Link to="/profile/message"><img src={require('../../images/icons/mess-btn-1.svg')} alt="svg icon" />Message</Link> 
            }
            <p>
                <span>Project Views</span> 
                {props.loginUser ? props.user._id === props.loginUser._id ? <span>{props.allView}</span>
                :<span>{props.otherView}</span>
                :<span>{props.otherView}</span>
                }
            </p>
            <p>
                <span>Likes</span> 
                {props.loginUser ? props.user._id === props.loginUser._id ? <span>{props.allLike}</span>
                :<span>{props.otherLike}</span>
                :<span>{props.otherLike}</span>
                }
            </p>
            <p><span>Followers</span> <span>999</span></p>
            <p><span>Following</span> <span>999</span></p>
        </div>
    )

}