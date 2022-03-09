import './MessageListItem.css';
import React, {useState, useEffect} from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import MessageBubble from '../MessageBubble/MessageBubble'
import { Box, FormHelperText, TextField, InputAdornment } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack'

export default function MessageListItem(props) {
    const [draftMessage, setDraftMessage] = useState('')
    const [listofMessages, setListofMessages] = useState(props.messageData.messages)
    const [socketInit, setsocketInit] = useState(false)
    
    function handleChange(e){
        setDraftMessage(e.target.value)
    };
    
    useEffect(() =>{
        if (!socketInit){
            props.socket.emit("join chat", props.messageData._id )
            setsocketInit(true)
        }
        props.socket.on("message recieved", (convoObj) => {
            console.log("recieving socket message rec client side")
            console.log(convoObj.messages)
            setListofMessages(convoObj.messages)
        })
    })

    async function sendMessage(e){
        e.preventDefault();
        let jwt = localStorage.getItem('token')
        let fetchResponse = await fetch('/api/users/sendmessage',{
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + jwt,
            },
            body: JSON.stringify({
                text: draftMessage,
                convoId: props.messageData._id,
                users: props.messageData.users
            })
        })
        console.log('sent message here')
                
        let jsonResponse = await fetchResponse.json()
        let parsed = await JSON.parse(jsonResponse)
        console.log(parsed)
        setListofMessages(parsed.messages)
        setDraftMessage('')

        props.socket.emit('new message', parsed)
        console.log('hit')
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