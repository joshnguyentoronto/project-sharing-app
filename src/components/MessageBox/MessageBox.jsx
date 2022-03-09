import './MessageBox.css';
import React, {useState} from 'react';
import MessageList from "../../components/MessageList/MessageList"
import MessageListItem from "../../components/MessageListItem/MessageListItem"
import CloseIcon from '@mui/icons-material/Close';
import { TextField } from '@mui/material';


export default function MessageBox(props) {
    const [messageData, setMessageData] = useState(false)
    const [messageinfo, setmessageInfo] = useState('')
    
    function onClick(data){
        let value = !messageData
        setmessageInfo(data)
        setMessageData(value)
    }
    
    if (messageData){
        return (
            <div className='message-container'>
                <MessageListItem
                    closeChat={props.openChatList}
                    onClick={onClick}
                    messageData={messageinfo}
                    currentUser={props.currentUser}
                    socket={props.socket}
                />
            </div>            
        )
    } else {
        return (
            <div className='message-container'>
                <CloseIcon className="close" onClick={props.openChatList} />
                <p className="message-title">Messages</p>            
                <form>
                    <TextField
                        fullWidth
                        size="small"
                        id="outlined-search" 
                        label="Search" 
                        type="search" />
                </form>
                <br></br>
                {props.messageList.map(m =>
                    <MessageList
                        messageData={m}
                        closeChat={props.openChatList} 
                        onClick={onClick}
                        lastMessage={m.messages[m.messages.length -1].text}
                        currentUser={props.currentUser}
                        users={m.users}
                    />
                )}
            </div>
        )
    }
}