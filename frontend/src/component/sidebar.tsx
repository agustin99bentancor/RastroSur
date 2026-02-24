import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
    FaHome,
    FaHorseHead ,
    FaMapSigns ,
    FaChartBar,
    FaCalendar,
    FaUser
} from 'react-icons/fa';

const Sidebar: React.FC = () => {
const menuItems = [
    { path: '/dashboard', icon: FaHome, label: 'Dashboard' },
    //{ path: '/perfil', icon: FaUser, label: 'Perfil' },
    { path: '/ganado', icon: FaHorseHead, label: 'Ganados' },
    { path: '/lotes', icon: FaMapSigns, label: 'Lotes' },
    { path: '/estadisticas', icon: FaChartBar, label: 'Estadísticas' },
    { path: '/eventos', icon: FaCalendar, label: 'Eventos' },
];

return (
    <aside className="w-64 text-white p-4 border-r-2 border-gray-200">
        
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
                                        : 'text-gray-800 hover:bg-gray-200'
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