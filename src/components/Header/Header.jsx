import './Header.css';
import React from 'react';
import {Link} from 'react-router-dom'


export default function Header(props) {
    return(
        <div className="header">
            <div className='header-icon'>
            </div>
            <div className='header-link-container'>
                <button className="header-upload-btn">Upload</button>
                <button className="header-btn"><img src={require('../../images/icons/notification.svg')} alt="svg icon" /></button>
                <button className="header-btn"><img src={require('../../images/icons/message.svg')} alt="svg icon" /></button>
                {props.user ? 
                    <Link to="/profile"><img src={require('../../images/icons/user.svg')} alt="svg icon" /></Link> : 
                    <Link to="/account/login">Login / Signup</Link>
                }
            </div>
        </div>
    )
}


