import './Flag.css';
import React from 'react';

export default function Flag(props) {
    return(
        <button onClick={() => {props.filterByFlag(props.flag)}} className="flag-btn">{props.flag}</button>
    )
}