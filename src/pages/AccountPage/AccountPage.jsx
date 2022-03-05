import "./AccountPage.css"
import React, { Component } from 'react'
import { Link, Outlet } from 'react-router-dom'


export default class AccountPage extends Component {
      render() {
        return(
            <div className="account">
                <h1>THE EXHIBIT</h1>
                <Outlet/>
            </div>
        )
    }
}