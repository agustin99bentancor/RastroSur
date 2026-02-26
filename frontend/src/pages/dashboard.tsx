import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import PetsIcon from '@mui/icons-material/Pets';
import EventIcon from '@mui/icons-material/Event';

import { allLotes, allGanado, allEvents } from '../services/authService';

import CardKPIs from '../component/dashboard/card.tsx';
import Gline from '../component/dashboard/gline.tsx';
import GBar from '../component/dashboard/gBar.tsx';
import Activity from '../component/dashboard/activity.tsx';

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
                <CardKPIs title="Peso Promedio" value={ganadoVivo} icon={TrendingUpIcon}/>
                <CardKPIs title="Ventas" value={eventosEsteMes} icon={EventIcon} />
                <CardKPIs title="Tasa de mortalidad" value={totalLotes} icon={AgricultureIcon} />
            </Box>

            {/* Charts Section */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 4 }}>
                <Gline
                    title="Ganado por Raza"
                    data={razaChartData.map((item: any) => ({ name: item.raza, value: item.cantidad }))}
                />
                <GBar
                    title="Eventos por Tipo"
                    data={eventosChartData.map((item: any) => ({ name: item.tipo, value: item.cantidad }))}
                />
            </Box>

            {/* Recent Activity Section */}
            <Activity events={recentEvents}/>
        </div>
    );
}