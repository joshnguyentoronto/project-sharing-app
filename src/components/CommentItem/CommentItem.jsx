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
                    <p>&nbsp;&nbsp;-&nbsp;&nbsp;{ moment(props.date).fromNow() }&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    <p onClick={() => props.delCom([ props.id, props.projectId ])}>delete</p>
                </div>
                <div className='comment-each-main-body'>
                    <p>{props.comment}</p>
                </div>
                <div className='comment-each-main-foot'>
                    <p>{props.like} </p>
                    <p>&nbsp;<img src={require('../../images/icons/likebtn.svg')} alt="svg icon" /></p>
                </div>
            </div>
        </div>
    )
}