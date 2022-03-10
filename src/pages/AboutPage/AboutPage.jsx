import "./AboutPage.css"
import React, { Component } from 'react'
import Header from '../../components/Header/Header'
import Footer from "../../components/Footer/Footer"

export default class AboutPage extends Component {
    render() {
        return(
            <div className="aboutPage">
                <Header
                    openChatList={this.props.openChatList}
                    userLogout={this.props.userLogout}
                    user={this.props.user} 
                />
                <div className="about">
                    <h1>About Us</h1>
                </div>
                <Footer user={this.props.user} />
            </div>
        )
    }
}