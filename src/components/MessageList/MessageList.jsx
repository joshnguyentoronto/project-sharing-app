import './MessageList.css';
import React from 'react';
import Avatar from '@mui/material/Avatar';


export default function MessageList(props) {
    let chatName = 'could not load'
    for (let i=0; i < props.users.length; i++){
        if (props.users[i]._id !== props.currentUser._id){
            chatName = props.users[i].name
        }
    }
    
    return(
        <div onClick={() => props.onClick(props.messageData)} className='messagelist-container'>
            <Avatar className="dp" src={require('../../images/image/no_profile_image.png')}/>
            <div>
                <p className='chat-name'>{chatName}</p>
                <p className='message-preview'>{props.lastMessage}</p>
            </div>
        </div>
    )
}