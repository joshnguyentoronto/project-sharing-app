import './InputLink.css';
import React from 'react';

export default function InputLink(props) {
    return(
        <div className="input-link-each">
            <div className="input-link-each-name">
                <p>Link Name:</p>
                <input onChange={props.handleInputLinkNameChange} name={props.link.index} type="text" required value={props.link.name} />
            </div>
            <div className="input-link-each-url">
                <p>Link URL:</p>
                <input onChange={props.handleInputLinkUrlChange} name={props.link.index} type="text" required value={props.link.url} />
            </div>
            <div className="input-link-each-del">
                <p onClick={() => props.deleteLink(props.link.index)} ><img src={require('../../images/icons/x.svg')} alt="svg icon" /></p>
            </div>
        </div>
    )
}