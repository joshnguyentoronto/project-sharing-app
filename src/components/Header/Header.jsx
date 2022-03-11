import './Header.css';
import React from 'react';
import { Link } from 'react-router-dom'
import UserIcon from '../UserIcon/UserIcon';


export default function Header(props) {
    let theUser = ''
    if (props.user) {
        props.user._id ? theUser = props.user._id : theUser = ""
    }
    return(
        <div className="header">
            <div className='header-icon'>
                <button onClick={ () => window.location.href = "/"}><h1><img className='home-icon' src={require('../../images/icons/home.svg')} alt="svg icon" />THE EXHIBIT</h1></button>
            </div>
            <div className='header-link-container'>
                { theUser ? <Link className='header-link-upload' to="/upload">Upload</Link> : <Link className='header-link-upload' to="/account/login">Login to Upload new Project</Link> }
                <button className="header-btn"><img src={require('../../images/icons/notification.svg')} alt="svg icon" /></button>
                <button onClick={() => props.openChatList()} className="header-btn"><img src={require('../../images/icons/message.svg')} alt="svg icon" /></button>
                {theUser ? 
                    <Link to="/profile" ><UserIcon user={props.user} /></Link>
                    : 
                    false
                }
                {theUser ? 
                    <Link className='header-link' onClick={props.userLogout}to="/">Logout</Link>
                    : 
                    <Link style={{width: "120px"}} className='header-link-log' to="/account/login">Login / Signup</Link>
                }
            </div>
        </div>
    )
}


