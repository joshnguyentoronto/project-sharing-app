import './MessageBox.css';
import React, {useState, useEffect} from 'react';
import MessageList from "../../components/MessageList/MessageList"
import MessageListItem from "../../components/MessageListItem/MessageListItem"
import CloseIcon from '@mui/icons-material/Close';
import { TextField, InputAdornment } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';


export default function MessageBox(props) {
    const [messageData, setMessageData] = useState(false)
    const [messageinfo, setmessageInfo] = useState('')
    const [messageList, setmessageList] = useState([])
    const [nameFromList, setNameFromList] = useState('')
    
    function onClick(data, name){
        let value = !messageData
        setmessageInfo(data)
        setMessageData(value)
        setNameFromList(name)
    }

    function searchUsers(e){
        e.preventDefault();
    }

    useEffect( async () =>{
        let jwt = localStorage.getItem('token')
        let fetchResponse = await fetch('/api/users/allmessages', 
            {headers: {'Authorization': 'Bearer ' + jwt}})
        let messages = await fetchResponse.json()
        let array = await JSON.parse(messages)
        setmessageList(array)
    },[messageinfo])
    
    
    if (messageData){
        return (
            <div className='message-container'>
                <MessageListItem
                    closeChat={props.openChatList}
                    onClick={onClick}
                    messageData={messageinfo}
                    currentUser={props.currentUser}
                    socket={props.socket}
                    name={nameFromList}
                />
            </div>            
        )
    } else {
        return (
            <div className='message-container'>
                <CloseIcon className="close" onClick={props.openChatList} />
                <p className="message-title">Messages</p>            
                <form onSubmit={searchUsers}>
                    <TextField className='message-search-bar'
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchRoundedIcon
                                        sx={{color: 'white'}}
                                    />
                                </InputAdornment>
                            ), 
                        }}
                        fullWidth
                        size="small"
                        type="search" />
                </form>
                <br></br>
                {messageList.map(m =>
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