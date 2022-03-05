import './Header.css';
import React from 'react';
import {Link} from 'react-router-dom'


export default function Header(props) {

    return(
        <div className="header">
            <div className='header-icon'>
                <h1>THE EXHIBIT</h1>
            </div>
            <div className="header-search">
                <form autoComplete='off'  onSubmit={props.filterByTag}>
                    <input onChange={props.handleChange} name="currentTag" className='header-search-bar' type="text" />
                    <button onSubmit={props.filterByTag} type='submit'><img src={require('../../images/icons/search.svg')} alt="svg icon" /></button>
                </form>
            </div>
            <div className='header-link-container'>
                <Link className='header-link' to="/upload">Upload</Link>
                <button className="header-btn"><img src={require('../../images/icons/notification.svg')} alt="svg icon" /></button>
                <button className="header-btn"><img src={require('../../images/icons/message.svg')} alt="svg icon" /></button>
                <Link className='header-link' to="/profile"><img src={require('../../images/icons/user.svg')} alt="svg icon" /></Link>
            </div>
        </div>
    )
}


