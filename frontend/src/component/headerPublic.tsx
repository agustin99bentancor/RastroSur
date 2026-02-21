import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import logo from '../assets/logo.svg';

interface HeaderPublicProps {
  isAuthenticated: boolean;
  onLogout: () => void;
  onLogin: () => void;
}

export default function HeaderPublic({ isAuthenticated, onLogout, onLogin }: HeaderPublicProps) {

    return (
    <nav className="header">
        <div className="header-left">
            <img src={logo} alt="Logo" className="logo" />
            <h1>RastroSur</h1>
        </div>
        <div className="header-right">
            {isAuthenticated ? (
                <>
                    <button className="header-button" onClick={onLogout}>Logout</button>
                </>
            ) : (
                    <button onClick={onLogin} className="header-button">Login</button>
            )}
        </div>
    </nav>
    );
}