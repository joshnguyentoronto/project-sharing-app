import './MessageBox.css';
import React, {useState} from 'react';
import MessageList from "../../components/MessageList/MessageList"
import MessageListItem from "../../components/MessageListItem/MessageListItem"

export default function MessageBox(props) {
    const [messageData, setMessageData] = useState(false)

    function onClick(){
        let value = !messageData
        setMessageData(value)
    }

    return(
        <div className='message-container'>
            {messageData ? 
                <MessageListItem closeChat={props.openChatList} onClick={onClick} /> : 
                <MessageList closeChat={props.openChatList} onClick={onClick}/>
            }
        </div>
    )
}