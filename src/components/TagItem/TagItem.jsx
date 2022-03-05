import './TagItem.css';
import React from 'react';

export default function TagItem(props) {
    return(
        <button className="tag-btn">
            {props.tag}
        </button>
    )
}