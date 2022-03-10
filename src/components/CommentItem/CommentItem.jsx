import './CommentItem.css';
import React from 'react';
import moment from 'moment'
import UserIcon from '../UserIcon/UserIcon';

export default function CommentItem(props) {
    return(
        <div className='comment-each'>
            <div className='comment-each-user'>
                <button className='comment-user-img'><UserIcon user={props.user} /></button>
            </div>
            <div className='comment-each-main'>
                <div className='comment-each-main-head'>
                    <p>{props.comment.user.name}</p>
                    <p>&nbsp;&nbsp;-&nbsp;&nbsp;{ moment(props.comment.date).fromNow() }&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    { props.comment.user._id === props.user._id ? <p onClick={() => props.delCom([ props.comment._id, props.projectId ])}>delete</p> : false }
                </div>
                <div className='comment-each-main-body'>
                    <p>{props.comment.text}</p>
                </div>
                <div className='comment-each-main-foot'>
                    <p>{props.comment.likeCount} </p>
                    <p>&nbsp;{ props.comment.likedUser.indexOf(props.user._id) === -1 ? <img onClick={() => props.likeComment([ props.comment._id, props.projectId, props.user._id ])} src={require('../../images/icons/likebtn.svg')} alt="svg icon" /> : <img onClick={() => props.unlikeComment([ props.comment._id, props.projectId, props.user._id ])} src={require('../../images/icons/likedbtn.svg')} alt="svg icon" />}</p>
                </div>
            </div>
        </div>
    )
}