import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>401</h1>
            <h2 style={styles.subtitle}>ERROR</h2>
            <p style={styles.message}>
                Lo sentimos, No tienes permisos para acceder a esta página.
            </p>
            <Link to="/" style={styles.link}>
                Volver al inicio
            </Link>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        padding: '20px',
    },
    title: {
        fontSize: '6rem',
        margin: '0',
        color: '#333',
    },
    subtitle: {
        fontSize: '2rem',
        margin: '10px 0',
        color: '#666',
    },
    message: {
        fontSize: '1.2rem',
        margin: '20px 0',
        color: '#888',
    },
    link: {
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: '5px',
        fontSize: '1rem',
    },
};

export default NotFound;