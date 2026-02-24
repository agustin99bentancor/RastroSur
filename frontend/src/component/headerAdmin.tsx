import './header.css';
import logo from '../assets/logo.svg';
import { useAuth } from '../context/authContext.tsx';
import { FaBell, FaSignOutAlt } from 'react-icons/fa';

interface HeaderAdminProps {
    onLogout: () => void;
}

export default function HeaderAdmin({ onLogout }: HeaderAdminProps) {
    const { user } = useAuth();

    return (
    <nav className="header">
        <div className="header-left">
            <img src={logo} alt="Logo" className="logo" />
            <h1>RastroSur</h1>
        </div>
        <div  style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '1rem'
            }}>
            <button 
                className="icon-button" 
                onClick={() => console.log('Notificaciones')}
                title="Notificaciones"
            >
                <FaBell size={20} />
            </button>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div className="profile-circle">
                    <h1 className='userName'> 
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </h1>
                </div>
                <span className='userNameSpan'>{user?.name || 'Usuario'}</span>
            </div>
            
            <button 
                className="icon-button" 
                onClick={onLogout}
                title="Cerrar sesión"
            >
                <FaSignOutAlt size={20} />
            </button>
        </div>
    </nav>
    );
}