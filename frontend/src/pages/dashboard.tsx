import { useState } from 'react';
import { allLotes,allGanado } from '../services/authService';

import './dashboard.css';

interface DashboardProps {

}


export default function Dashboard() {
    const [view, setView] = useState('menu');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchLotes = async () => {
        setLoading(true);
        try {
            const result = await allLotes();
            setData(result);
            setView('lotes');
        } catch (error) {
            alert('Error no tiene autorizacion');
            console.error('Error fetching lotes:', error);
        }
        setLoading(false);
    };

    const fetchVacas = async () => {
        setLoading(true);
        try {
            console.log('Fetching vacas...');
            const result = await allGanado();
            console.log('Vacas fetched:', result);
            setData(result);
            setView('vacas');
        } catch (error) {
            console.error('Error fetching vacas:', error);
        }
        setLoading(false);
    };

    if (view === 'menu') {
        return (
            <div className="dashboard-menu">
                <h1>Dashboard</h1>
                <div className="action-btn">
                <button
                    onClick={fetchLotes}
                    style={{
                        padding: '20px 40px',
                        fontSize: '18px',
                        marginRight: '10px',
                        cursor: 'pointer',
                    }}
                >
                    Lotes
                </button>
                <button
                    onClick={fetchVacas}
                    style={{
                        padding: '20px 40px',
                        fontSize: '18px',
                        cursor: 'pointer',
                    }}
                >
                    Vacas
                </button>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard" style={{ padding: '20px' }}>
            <button

                onClick={() => setView('menu')}
                className='action-btn-back'
            >
                Atrás
            </button>

            {loading ? (
                <p>Cargando...</p>
            ) : (
                <table
                    className="dashboard-table"
                    border={1}
                    style={{ width: '100%', borderCollapse: 'collapse' }}
                >
                    <thead>
                        <tr>
                            {data.length > 0 &&
                                Object.keys(data[0])
                                    .filter((key) => key !== 'id')
                                    .map((key) => (
                                        <th key={key}
                                            style={{ padding: '10px', textAlign: 'left' }}>
                                            {key}
                                        </th>
                                    ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                {Object.entries(item)
                                    .filter(([key]) => key !== 'id')
                                    .map(([key, value]) => (
                                        <td key={key} style={{ padding: '10px' }}>
                                            {
                                                typeof value === 'object' ? JSON.stringify(value) : String(value)
                                            }
                                        </td>
                                    ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}