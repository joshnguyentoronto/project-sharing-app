import './MessageListItem.css';
import React, {useState} from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import MessageBubble from '../MessageBubble/MessageBubble'
import { Box, FormHelperText, TextField, InputAdornment } from '@mui/material';


export default function MessageListItem(props) {
    const [draftMessage, setDraftMessage] = useState('')
    const [listofMessages, setListofMessages] = useState(props.messageData.messages)

    console.log('right before')
    console.log(props.messageData)

    function handleChange(e){
        setDraftMessage(e.target.value)
    };

    async function sendMessage(e){
        e.preventDefault();
        console.log('submit button pressed')
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
        let parsed = await JSON.parse(fetchResponse)
        console.log(parsed)
    }

    return(
        <div>
            <div className='messageListItem'>
                <ArrowBackIosNewIcon onClick={props.onClick} />
                <img src={require('../../images/image/no_profile_image.png')}></img>
                <p>Name</p>
                <CloseIcon onClick={props.closeChat}/>
            </div>
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
                            label="text"
                            id="fullWidth" 
                            size="small"
                            type="text"
                            margin="normal" 
                            name="text" 
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