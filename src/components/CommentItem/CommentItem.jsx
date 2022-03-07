import './CommentItem.css';
import React from 'react';
import moment from 'moment'

export default function CommentItem(props) {
    return(
        <div className='comment-each'>
            <div className='comment-each-user'>
                <button className='comment-user-img'><img src={require('../../images/icons/user.svg')} alt="svg icon" /></button>
            </div>
            <div className='comment-each-main'>
                <div className='comment-each-main-head'>
                    <p>{props.user.name}</p>
                    <p>{ moment(props.date).fromNow() }</p>
                    <p>{props.like} liked</p>
                    <p onClick={() => props.delCom([ props.id, props.projectId ])}>delete</p>
                </div>
                <p>{props.comment}</p>
            </div>
        </div>
    )
}