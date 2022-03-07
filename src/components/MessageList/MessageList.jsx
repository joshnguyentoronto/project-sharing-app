import './MessageList.css';
import React from 'react';


export default function MessageList(props) {
    let chatName = 'could not load'
    for (let i=0; i < props.users.length; i++){
        if (props.users[i]._id != props.currentUser._id){
            chatName = props.users[i].name
        }
    }
    
    return(
        <div>
            <div onClick={() => props.onClick(props.messageData)} className='messagelist-container'>
                <img src={require('../../images/image/no_profile_image.png')}></img>
                <div>
                    <p>{chatName}</p>
                    <p>{props.lastMessage}</p>
                </div>
            </div>
        </div>
    )
}