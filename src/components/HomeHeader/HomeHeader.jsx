import './HomeHeader.css';
import React from 'react';
import {Link} from 'react-router-dom'


export default function HomeHeader(props) {

    return(
        <div className="header">
            <div className='header-icon'>
            </div>
            <div className='header-link-container'>
                <Link to="/upload">Upload</Link>
                <button className="header-btn"><img src={require('../../images/icons/notification.svg')} alt="svg icon" /></button>
                <button onClick={props.openChatList} className="header-btn"><img src={require('../../images/icons/message.svg')} alt="svg icon" /></button>
                {props.user ? 
                    <div>
                        <Link to="/profile"><img src={require('../../images/icons/user.svg')} alt="svg icon" /></Link>
                        <Link onClick={props.userLogout}to="/">Logout</Link>
                    </div>
                    : 
                    <Link to="/account/login">Login / Signup</Link>
                }
            </div>
        </div>
    )
}
