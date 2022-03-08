import './MessageListItem.css';
import React, {useState} from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import MessageBubble from '../MessageBubble/MessageBubble'
import { Box, FormHelperText, TextField, InputAdornment } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack'
import {io} from 'socket.io-client';
const socket = io()


export default function MessageListItem(props) {
    const [draftMessage, setDraftMessage] = useState('')
    const [listofMessages, setListofMessages] = useState(props.messageData.messages)

    function handleChange(e){
        setDraftMessage(e.target.value)
    };

    async function recieveMessage(){
        let jwt = localStorage.getItem('token')
        let fetchResponse = await fetch('/api/users/recieve/message', {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + jwt,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                convoId: props.messageData._id,
            })
        })
        console.log(fetchResponse.ok)
                
        let jsonResponse = await fetchResponse.json()
        let parsed = await JSON.parse(jsonResponse)
        setListofMessages(parsed.messages)
        setDraftMessage('')
    }

    socket.on('add-message', function (data){
        recieveMessage()
    })

    async function sendMessage(e){
        e.preventDefault();
        let jwt = localStorage.getItem('token')
        let fetchResponse = await fetch('/api/users/sendmessage',{
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + jwt,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: draftMessage,
                convoId: props.messageData._id,
                users: props.messageData.users
            })
        })
        console.log(fetchResponse.ok)
                
        let jsonResponse = await fetchResponse.json()
        let parsed = await JSON.parse(jsonResponse)
        setListofMessages(parsed.messages)
        setDraftMessage('')

        socket.emit('add-message', {
            package: 'sent'
        })

    }

    return(
        <div>
            {/* <div className='messageListItem'>
            </div> */}
            <Stack direction="row">
                    <ArrowBackIosNewIcon onClick={props.onClick} />
                    <Avatar src={require('../../images/image/no_profile_image.png')}/>
                    <p>Name</p>
                    <CloseIcon className="close" onClick={props.closeChat}/>
            </Stack>
            <div className='messages'>
                {listofMessages.map(m =>
                    <MessageBubble
                        text={m.text}
                        currentUser={props.currentUser}
                        sender={m.sender}
                        recipient={m.recipient}                   
                    />
                )}
            </div>
            <div>
                <form onSubmit={sendMessage}>
                    <TextField 
                            fullWidth 
                            label="text"
                            size="small"
                            type="text"
                            margin="normal" 
                            name="text"
                            value={draftMessage} 
                            onChange={handleChange} 
                    />
                    <br></br>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        endIcon={<SendIcon />}
                    >
                        Send
                    </Button>
                </form>
            </div>
        </div>
    )
}