import './InputTagItem.css';
import React from 'react';

export default function InputTagItem(props) {
    return(
        <div className='tag-item'>
            <span>{props.tag}</span>
            <span onClick={() => props.removeTag(props.tag)}><img src={require('../../images/icons/x.svg')} alt="svg icon" /></span>
        </div>
    )
}