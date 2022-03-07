import './MessagePopUp.css'
import React, {useState}from 'react';
import Avatar from '@mui/material/Avatar';
import { Button, TextField, InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';


export default function MessagePopUp(props) {

    const [draftmessage, setdraftMessage] = useState('')

    function sendMessage(e){
        e.preventDefault();
        console.log('crazy')
    }

    return (
        <div className="chat-box-popup">
            <CloseIcon className="close" onClick={props.closeChatBox}/>
            <div className='dp-container'>
                <Avatar className="dp" src={require('../../images/image/no_profile_image.png')}/>
                <p className='chat-name'>{props.name}</p>
            </div>
            <form onSubmit={sendMessage}>
                <TextField 
                    fullWidth
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