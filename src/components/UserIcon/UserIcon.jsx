import './UserIcon.css';
import React from 'react';

export default function UserIcon(props) {
    let theUser = ''
    if (props.user) {
        props.user._id ? theUser = props.user._id : theUser = ""
    }
    let Initial = "A"
    if (theUser) {
        let name = props.user.username.split(' ')
        if (name.length > 1) {
            Initial = name[0][0].toUpperCase() + name[1][0].toUpperCase();
        } else {
            Initial = props.user.username[0].toUpperCase();
        }
    }
    return(
        <p className='UserIcon'>{Initial}</p>
    )
}