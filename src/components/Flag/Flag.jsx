import './Flag.css';
import React from 'react';

export default function Flag(props) {
    return(
        <button className="flag-btn">{props.flag}</button>
    )
}