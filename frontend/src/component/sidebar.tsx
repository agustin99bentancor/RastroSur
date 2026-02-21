import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
    FaHome,
    FaTrophy,
    FaBox,
    FaChartBar,
    FaCalendar,
    FaUser
} from 'react-icons/fa';

const Sidebar: React.FC = () => {
const menuItems = [
    { path: '/dashboard', icon: FaHome, label: 'Dashboard' },
    { path: '/ganados', icon: FaTrophy, label: 'Ganados' },
    { path: '/lotes', icon: FaBox, label: 'Lotes' },
    { path: '/estadisticas', icon: FaChartBar, label: 'Estadísticas' },
    { path: '/eventos', icon: FaCalendar, label: 'Eventos' },
    { path: '/perfil', icon: FaUser, label: 'Perfil' },
];

return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
        <div className="mb-8">
            <h1 className="text-2xl font-bold text-center">RastroSur</h1>
        </div>
        
        <nav>
            <ul className="space-y-2">
                {menuItems.map((item) => (
                    <li key={item.path}>
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                    isActive
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-300 hover:bg-gray-700'
                                }`
                            }
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    </aside>
);
};

export default Sidebar;