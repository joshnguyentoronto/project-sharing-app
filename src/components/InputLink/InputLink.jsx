import './InputLink.css';
import React from 'react';

export default function InputLink(props) {
    return(
        <div id="input-link-each">
            <div className="input-link-each-name">
                <p id="link-name-id">Link Name:</p>
                <input 
                    id='input-link-each-input1' 
                    onChange={props.handleInputLinkNameChange} 
                    name={props.link.index} 
                    type="text" 
                    value={props.link.name} 
                    required 
                />
            </div>
            <div className="input-link-each-url">
                <p id="link-url-id">Link URL:</p>
                <input 
                    id='input-link-each-input2' 
                    onChange={props.handleInputLinkUrlChange} 
                    name={props.link.index} 
                    type="text" 
                    value={props.link.url} 
                    required 
                />
            </div>
            <div className="input-link-each-del">
                <p onClick={() => props.deleteLink(props.link.index)} ><img src={require('../../images/icons/x.svg')} alt="svg icon" /></p>
            </div>
        </div>
    )
}