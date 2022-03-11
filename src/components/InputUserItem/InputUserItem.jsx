import './InputUserItem.css';
import React from 'react';

export default function InputUserItem(props) {
    return(
        <div className='tag-item'>
            <span>{props.user}</span>
            <span onClick={() => props.removeUser(props.user)}><img src={require('../../images/icons/x.svg')} alt="svg icon" /></span>
        </div>
    )
}