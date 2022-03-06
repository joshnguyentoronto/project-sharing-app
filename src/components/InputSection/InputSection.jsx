import './InputSection.css';
import React from 'react';

export default function InputSection(props) {
    return(
        <div className="input-sec-each">
            <p>Section title:<span onClick={() => props.deleteSection(props.text.index)} >Delete</span></p>
            <input onChange={props.handleInputTextHeadingChange} name={props.text.index} type="text" value={props.text.heading} required />
            <p>Section description:</p>
            <textarea onChange={props.handleInputTextBoxChange} name={props.text.index} value={props.text.text} required ></textarea>
        </div>
    )
}