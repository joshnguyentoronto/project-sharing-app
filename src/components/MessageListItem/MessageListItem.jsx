import './MessageListItem.css';
import React, {useState, useEffect, useRef} from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import MessageBubble from '../MessageBubble/MessageBubble'
import { TextField, InputAdornment } from '@mui/material';
import Avatar from '@mui/material/Avatar';


export default function MessageListItem(props) {
    const [draftMessage, setDraftMessage] = useState('')
    const [listofMessages, setListofMessages] = useState(props.messageData.messages)
    const [socketInit, setsocketInit] = useState(false)

    const messagesEndRef = useRef(null)
    
    function scrollToBottom(){
        messagesEndRef.current.scrollIntoView({behavior: "smooth"})
    }

    function handleChange(e){
        setDraftMessage(e.target.value)
    };

    
    useEffect(() =>{
        if (!socketInit){
            props.socket.emit("join chat", props.messageData._id )
            setsocketInit(true)
        }
        props.socket.on("message recieved", (convoObj) => {
            setListofMessages(convoObj.messages)
        })
    })
    
    useEffect(() => {
        scrollToBottom()
    }, [listofMessages])

    async function sendMessage(e){
        e.preventDefault();
        if(draftMessage && !draftMessage.match(/^ *$/)){
            if (draftMessage){
                let jwt = localStorage.getItem('token')
                let fetchResponse = await fetch('/api/users/sendmessage',{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': 'Bearer ' + jwt,
                    },
                    body: JSON.stringify({
                        text: draftMessage,
                        convoId: props.messageData._id,
                        users: props.messageData.users
                    })
                })
                
                let jsonResponse = await fetchResponse.json()
                let parsed = await JSON.parse(jsonResponse)
                setListofMessages(parsed.messages)
                setDraftMessage('')
                
                props.socket.emit('new message', parsed)
            }
        }
    }

    return(
        <div >
            <div className='message-header-box'>
                <ArrowBackIosNewIcon onClick={props.onClick} />
                <Avatar src={require('../../images/image/no_profile_image.png')}/>
                <p>{props.name}</p>
                <CloseIcon className="close" onClick={props.closeChat}/>
            </div>
            <div className='scroll-container'>
                <div className='messages'>
                    {listofMessages.map(m =>
                        <MessageBubble
                            text={m.text}
                            currentUser={props.currentUser}
                            sender={m.sender}
                            recipient={m.recipient}                  
                        />
                    )}
                    <div id={'el'} ref={messagesEndRef}></div>
                </div>
            </div>
            <div>
                <form onSubmit={sendMessage}>
                    <TextField 
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SendIcon
                                        type="submit"
                                        onClick={sendMessage}
                                        />
                                    </InputAdornment>
                                ), 
                            }}
                            fullWidth 
                            size="small"
                            type="text"
                            margin="normal" 
                            name="text"
                            value={draftMessage} 
                            onChange={handleChange} 
                    />
                    <br></br>
                </form>
            </div>
        </div>
    )
}