import './MessageList.css';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

export default function MessageList(props) {
    return(
        <div>
            <div className='mlHeader'>
                <p>Messages</p>
                <CloseIcon onClick={props.closeChat} />
            </div>
            <form>
                <input></input>
            </form>
            <div onClick={props.onClick} className='messagelist-container'>
                <img src={require('../../images/image/no_profile_image.png')}></img>
                <div>
                    <p>Name</p>
                    <p>Message Preview</p>
                </div>
            </div>
        </div>
    )
}