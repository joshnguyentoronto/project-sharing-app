import './MessageListItem.css';
import React from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';


export default function MessageListItem(props) {
    return(
        <div>
            <div className='messageListItem'>
                <ArrowBackIosNewIcon onClick={props.onClick} />
                <img src={require('../../images/image/no_profile_image.png')}></img>
                <p>Name</p>
                <CloseIcon onClick={props.closeChat}/>
            </div>
        </div>
    )
}