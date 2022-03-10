import './HomeHeader.css';
import React from 'react';
import {Link} from 'react-router-dom'


export default function HomeHeader(props) {
    let theUser = ''
    if (props.user) {
        props.user._id ? theUser = props.user._id : theUser = ""
    }
    function alertUser() {
        alert("Please login to chat with other")
    }

    return(
        <div className="header">
            <div className='header-empty'>
            </div>
            <div className='header-link-container'>
                { theUser ? <Link className='header-link-upload' to="/upload">Upload</Link> : <Link className='header-link-upload' to="/account/login">Login to use all features</Link> }
                <button className="header-btn"><img src={require('../../images/icons/notification.svg')} alt="svg icon" /></button>
                { theUser ? <button onClick={props.openChatList} className="header-btn"><img src={require('../../images/icons/message.svg')} alt="svg icon" /></button> : <button onClick={() => alertUser()} className="header-btn"><img src={require('../../images/icons/message.svg')} alt="svg icon" /></button> }
                {theUser ? 
                    <div className='header-link-container-user'>
                        <Link to="/profile" ><img className='header-link-container-user-img' src={require('../../images/icons/user.svg')} alt="svg icon" /></Link>
                        <Link className='header-link-upload' onClick={props.userLogout}to="/">Logout</Link>
                    </div>
                    : 
                    <Link style={{width: "120px"}} className='header-link-upload' to="/account/login">Login / Signup</Link>
                }
            </div>
        </div>
    )
}
