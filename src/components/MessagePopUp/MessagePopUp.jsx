import './MessagePopUp.css'
import React, {useState}from 'react';
import Avatar from '@mui/material/Avatar';
import { TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

export default function MessagePopUp(props) {
    const [draftmessage, setdraftMessage] = useState('')
    async function sendMessage(e){
        if(draftmessage && !draftmessage.match(/^ *$/)){
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
    }

    return (
        <div className="chat-box-popup">
            <div>
                <CloseIcon className="pop-close" onClick={props.closeChatBox}/>
            </div>
            <div className='dp-container'>
                <Avatar className="dp" src={require('../../images/image/no_profile_image.png')}/>
                <p className='chat-pop-name'>{props.author.name}</p>
            </div>
            <form onSubmit={sendMessage}>
                <TextField 
                    fullWidth
                    multiline
                    rows={8}
                    sx={{bgcolor: 'white'}}
                    value={draftmessage}
                    onChange={(e) => setdraftMessage(e.target.value)}
                />
                <br></br>
                <br></br>
                <button type="submit" className='pop-button'>
                    <ChatBubbleOutlineIcon/>Message
                </button>
            </form>
        </div>
    )

}