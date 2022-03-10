import "./TermPage.css"
import React, { Component } from 'react'
import Header from '../../components/Header/Header'
import Footer from "../../components/Footer/Footer"

export default class TermPage extends Component {
    state={
        
    }

    render() {
        return(
            <div className="term">
                <Header
                    openChatList={this.props.openChatList}
                    userLogout={this.props.userLogout}
                    user={this.props.user} 
                />
                <div>
                    <h1>Term of Services</h1>
                </div>
                <Footer user={this.props.user} />
            </div>
        )
    }
}