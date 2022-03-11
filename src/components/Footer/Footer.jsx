import './Footer.css';
import React from 'react';
import { Link } from 'react-router-dom'

export default function Footer(props) {
    let theUser = ''
    if (props.user) {
        props.user._id ? theUser = props.user._id : theUser = ""
    }
    return(
        <div className="footer">
            <div className='footer1'>
                <div className='footer-main'>
                    <h1>THE EXHIBIT</h1>
                    <p>Show case your work, connect<br/> with employers, get hired.</p>
                    <div className='footer-main-social'>
                        <a href="http://facebook.com" target="_blank" rel="noopener noreferrer"><img src={require('../../images/icons/facebook-btn.svg')} alt="social media svg icon" /></a>
                        <a href="http://twitter.com" target="_blank" rel="noopener noreferrer"><img src={require('../../images/icons/twitter-btn.svg')} alt="social media svg icon" /></a>
                        <a href="http://linkedin.com" target="_blank" rel="noopener noreferrer"><img src={require('../../images/icons/linkedin-btn.svg')} alt="social media svg icon" /></a>
                        <a href="http://instagram.com" target="_blank" rel="noopener noreferrer"><img src={require('../../images/icons/insta-btn.svg')} alt="social media svg icon" /></a>
                        <a href="http://pinterest.com" target="_blank" rel="noopener noreferrer"><img src={require('../../images/icons/pin-btn.svg')} alt="social media svg icon" /></a>
                    </div>
                </div>
                <div className='footer-group1'>
                    <ul>
                        <li><strong>Company</strong></li>
                        <li><a href="https://github.com/joshnguyentoronto/project-sharing-app" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/about">FAQs</Link></li>
                        <li><Link to="/about">Career</Link></li>
                        <li><Link to="/about">Support</Link></li>
                        <li><Link to="/terms-of-service">Terms of Service</Link></li>
                        <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                    </ul>
                </div>
                <div className='footer-group2'>
                    <ul>
                        <li><strong>My account</strong></li>
                        <li><Link to="/account/login">Login</Link></li>
                        <li><Link to="/account/login">Register</Link></li>
                        { theUser ?  <li><Link to="/profile">Profile</Link></li> : <li><Link to="/account/login">Profile</Link></li> }
                        { theUser ? <li><Link to="/profile">Favourites</Link></li> : <li><Link to="/account/login">Favourites</Link></li> }
                    </ul>
                </div>
                <div className='footer-email'>
                    <p><strong>Join Our Email List</strong></p>
                    <p>Get weekly emails with trending projects!</p>
                    <form className='footer-form'>
                        <input type="email" required />
                        <button>Sign up</button>
                    </form>
                </div>
            </div>
            <div className='footer2'>
                <p>© The Exhibit 2022</p>
            </div>
        </div>
    )
}