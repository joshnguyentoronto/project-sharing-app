import './Header.css';
import React from 'react';
import HeaderIcon from '../HeaderIcon/HeaderIcon'

export default function Header(props) {
    return(
        <div className="header">
            <div className='header-icon'>
                <h1>Icon</h1>
            </div>
            <div className='header-link-container'>
                <HeaderIcon onClick={() => props.openChatList()} name="Mess" />
                <HeaderIcon name="@" />
                <HeaderIcon name="@" />
                <HeaderIcon name="@" />
            </div>
        </div>
    )
}