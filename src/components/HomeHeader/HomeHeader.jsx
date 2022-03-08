import './HomeHeader.css';
import React from 'react';
import {Link} from 'react-router-dom'


export default function HomeHeader(props) {

    return(
        <div className="header">
            <div className='header-empty'></div>
            <div className='header-link-container'>
                <Link className='header-link-upload' to="/upload">Upload</Link>
                {/* <button className="header-btn"><img src={require('../../images/icons/notification.svg')} alt="svg icon" /></button> */}
                <button onClick={props.openChatList} className="header-btn"><img src={require('../../images/icons/message.svg')} alt="svg icon" /></button>
                {props.user ? 
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
