import React from 'react';
import logo from '../assets/logo.svg';

import './loading.css';

const Loading = () => {
    return (
        <div className="loading-container">
            <div className="spinner"></div>
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
                <h1 className='h1'>RastroSur</h1>
            </div>
        </div>
    );
};

export default Loading;