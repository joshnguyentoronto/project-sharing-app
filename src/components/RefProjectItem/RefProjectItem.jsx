import './RefProjectItem.css';
import React from 'react';

export default function RefProjectItem(props) {
    return(
        <button className="ref-project-item">
            <img src={require("../../images/image/test.png")} alt="project representation" />
        </button>
    )
}