import React from 'react'
import logo from '../logo.svg'
import './Header.css'

export default function Header(){

    return(
        <div className="header">
            <div className="logo-header">
                <img src={logo} alt="logo"/>
                <p>Frontend Developer assignment</p>
            </div>
        </div>
    )
}