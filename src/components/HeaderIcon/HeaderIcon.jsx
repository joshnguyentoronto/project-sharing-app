import './HeaderIcon.css';
import React from 'react';

export default function HeaderIcon(props) {
    return(
        <button className="header-btn">{props.name}</button>
    )
}