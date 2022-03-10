import './Flag.css';
import React from 'react';

export default function Flag(props) {
    return(
        <span>{ (props.currentFlag === props.flag) ? <button onClick={() => {props.filterByFlag(props.flag)}} className="flag-btn-blue">{props.flag}</button> : <button onClick={() => {props.filterByFlag(props.flag)}} className="flag-btn">{props.flag}</button> }</span>
    )
}