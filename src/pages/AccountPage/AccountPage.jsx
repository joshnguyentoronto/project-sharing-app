import "./AccountPage.css"
import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'

export default class AccountPage extends Component {
    render() {
        return(
            <div className="account">
                <div className="account-background">
                </div>
                <div className="account-main-container">
                    <div className="account-main">
                        <h1>THE EXHIBIT</h1>
                        <Outlet/>
                    </div>
                </div>
            </div>
        )
    }
}