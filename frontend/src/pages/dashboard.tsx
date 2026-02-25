import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import PetsIcon from '@mui/icons-material/Pets';
import EventIcon from '@mui/icons-material/Event';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { allLotes, allGanado, allEvents } from '../services/authService';
import CardKPIs from '../component/dashboard/card.tsx';
import Gline from '../component/dashboard/gline.tsx';

import './dashboard.css';

export default function Dashboard() {
    const [lotes, setLotes] = useState([]);
    const [ganado, setGanado] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [lotesData, ganadoData, eventsData] = await Promise.all([
                allLotes(),
                allGanado(),
                allEvents()
            ]);
            setLotes(lotesData || []);
            setGanado(ganadoData || []);
            setEvents(eventsData || []);
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    // KPIs calculations
    const totalGanado = ganado.length;
    const totalLotes = lotes.length;
    const ganadoVivo = ganado.filter((g: any) => g.estado === 'VIVO').length;
    const eventosEsteMes = events.filter((e: any) => {
        const eventDate = new Date(e.fecha);
        const now = new Date();
        return eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear();
    }).length;

    // Chart 1: Ganado por raza
    const ganadoPorRaza = ganado.reduce((acc: any, animal: any) => {
        const raza = animal.raza || 'Desconocida';
        acc[raza] = (acc[raza] || 0) + 1;
        return acc;
    }, {});
    
    const razaChartData = Object.entries(ganadoPorRaza).map(([raza, cantidad]) => ({
        raza,
        cantidad
    }));
    
    // Chart 2: Eventos por tipo (últimos 6 meses)
    const eventosPorTipo = events.reduce((acc: any, evento: any) => {
        const tipo = evento.tipo || 'Otros';
        acc[tipo] = (acc[tipo] || 0) + 1;
        return acc;
    }, {});

    const eventosChartData = Object.entries(eventosPorTipo).map(([tipo, cantidad]) => ({
        tipo,
        cantidad
    }));

    // Recent activity - últimos 8 eventos
    const recentEvents = [...events]
        .sort((a: any, b: any) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
        .slice(0, 8);

    const formatDate = (fecha: string) => {
        const date = new Date(fecha);
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
    };

    if (loading) {
        return (
            <div className="dashboard" style={{ padding: '20px' }}>
                <Typography variant="h5">Cargando...</Typography>
            </div>
        );
    }

    return (
        <div className="dashboard" style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
                Dashboard
            </Typography>

            {/* KPIs Section */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
                <CardKPIs title="Total Ganado" value={totalGanado} icon={PetsIcon} />
                <CardKPIs title="Ganado Vivo" value={ganadoVivo} icon={TrendingUpIcon}/>
                <CardKPIs title="Total Lotes" value={totalLotes} icon={AgricultureIcon} />
                <CardKPIs title="Eventos del Mes" value={eventosEsteMes} icon={EventIcon} />
            </Box>

            {/* Charts Section */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 4 }}>
                <Gline
                    title="Ganado por Raza"
                    data={razaChartData.map((item: any) => ({ name: item.raza, value: item.cantidad }))}
                />
                <Paper sx={{ p: 3, height: 400 }}>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                        Eventos por Tipo
                    </Typography>
                    <ResponsiveContainer width="100%" height="85%">
                        <BarChart data={eventosChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="tipo" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="cantidad" fill="#2e7d32" />
                        </BarChart>
                    </ResponsiveContainer>
                </Paper>
            </Box>

            {/* Recent Activity Section */}
            <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mb: 2 }}>
                    Actividad Reciente
                </Typography>
                <List>
                    {recentEvents.length === 0 ? (
                        <Typography color="textSecondary" align="center" sx={{ py: 3 }}>
                            No hay eventos recientes
                        </Typography>
                    ) : (
                        recentEvents.map((evento: any, index: number) => (
                            <Box key={evento.id}>
                                <ListItem sx={{ px: 0 }}>
                                    <ListItemText
                                        primary={
                                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                                <Typography variant="body1" fontWeight="medium">
                                                    {evento.tipo} - {evento.animal?.caravanaId || 'N/A'}
                                                </Typography>
                                                <Typography variant="caption" color="textSecondary">
                                                    {formatDate(evento.fecha)}
                                                </Typography>
                                            </Box>
                                        }
                                        secondary={
                                            <Typography variant="body2" color="textSecondary">
                                                {evento.descripcion || 'Sin descripción'}
                                                {evento.animal?.raza && ` • Raza: ${evento.animal.raza}`}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                                {index < recentEvents.length - 1 && <Divider />}
                            </Box>
                        ))
                    )}
                </List>
            </Paper>
        </div>
    );
}