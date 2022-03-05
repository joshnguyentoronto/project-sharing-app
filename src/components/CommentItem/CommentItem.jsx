import './CommentItem.css';
import React from 'react';

export default function CommentItem(props) {
    return(
        <div className='comment-each'>
            <div className='comment-each-user'>
                <button className='comment-user-img'><img src={require('../../images/icons/user.svg')} alt="svg icon" /></button>
            </div>
            <div className='comment-each-main'>
                <p>{props.comment.user} <span> {props.comment.date}</span></p>
                <p>{props.comment.text}</p>
            </div>
        </div>
    )
}