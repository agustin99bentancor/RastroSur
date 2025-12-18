import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import logo from '../assets/logo.svg';

export default function Header() {
    return (
    <nav className="header">
        <div className="header-left">
            <img src={logo} alt="Logo" className="logo" />
            <h1>RastroSur</h1>
        </div>
        <div className="header-right">
            <Link to="/home" className="header-login">
                <button className="header-button">Login</button>
            </Link>
        </div>
    </nav>
    );
}