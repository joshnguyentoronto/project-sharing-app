import './MessagePopUp.css'
import React, {useState}from 'react';
import Avatar from '@mui/material/Avatar';
import { Button, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';


export default function MessagePopUp(props) {

    const [draftmessage, setdraftMessage] = useState('')

    async function sendMessage(e){
        e.preventDefault();
        let jwt = localStorage.getItem('token')
        let fetchResponse = await fetch('/api/users/startconvo',{
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + jwt,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: draftmessage,
                recipient: props.author._id
            })
        })
        setdraftMessage('')
        props.setpopUpChat(false)
    }

    return (
        <div className="chat-box-popup">
            <CloseIcon className="close" onClick={props.closeChatBox}/>
            <div className='dp-container'>
                <Avatar className="dp" src={require('../../images/image/no_profile_image.png')}/>
                <p className='chat-name'>{props.author.name}</p>
            </div>
            <form onSubmit={sendMessage}>
                <TextField 
                    fullWidth
                    value={draftmessage}
                    onChange={(e) => setdraftMessage(e.target.value)}
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
    )

}