import './MessageBubble.css'
import React from 'react';


export default function MessageListItem(props) {

    let position = 'bubble-left'
    if (props.currentUser._id == props.sender){
        position='bubble-right'
    }
    return(
        <div className={`bubble ${position}`}>
            
            <p>{props.text}</p>
        </div>
    )
}