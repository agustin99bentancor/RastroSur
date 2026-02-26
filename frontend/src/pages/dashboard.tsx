import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import PetsIcon from '@mui/icons-material/Pets';
import EventIcon from '@mui/icons-material/Event';
import LocalFloristOutlinedIcon from '@mui/icons-material/LocalFloristOutlined';

import { dashboardInfo } from '../services/authService';

import CardKPIs from '../component/dashboard/card.tsx';
import Gline from '../component/dashboard/gline.tsx';
import GBar from '../component/dashboard/gBar.tsx';
import Activity from '../component/dashboard/activity.tsx';

import './dashboard.css';

export default function Dashboard() {
    const [total, setTotal] = useState<string>('');
    const [peso, setPeso] = useState<string>('');
    const [ventas, setVentas] = useState<string>('');
    const [muerte, setMuerte] = useState<string>('');

    const [eventos, setEventos] = useState<any[]>([]);
    const [evoPeso, setEvoPeso] = useState<any[]>([]);
    const [Distribucion, setDistribucion] = useState<any>({});

    const [loading, setLoading] = useState<Boolean>(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const res = await dashboardInfo(3); /// PONER LA EMPRESA GUARDADA
            setTotal(res.totalVivos || "");
            setPeso(res.pesoPromedio || "");
            setVentas(res.ventasMes || "");
            setMuerte(res.mortalidadMes || "")

            setEventos(res.actividadReciente || [])
            setEvoPeso(res.evolucionPeso || [])
            setDistribucion(res.distribucionLotes || {})

            console.log('Dashboard data:', res);
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const actionEvents = (event: any) => {
        console.log('Evento seleccionado:', event);
        // Aquí puedes agregar lógica adicional para manejar el evento seleccionado, como mostrar un modal con detalles, redirigir a otra página, etc.}
    }

    return (
        <div className="dashboard" style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
                Dashboard
            </Typography>

            {/* KPIs Section */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
                <CardKPIs title="Total Ganado" value={total} icon={PetsIcon} />
                <CardKPIs title="Peso Promedio" value={peso} icon={TrendingUpIcon}/>
                <CardKPIs title="Ventas" value={ventas} icon={EventIcon} />
                <CardKPIs title="Tasa de mortalidad" value={muerte} icon={LocalFloristOutlinedIcon} />
            </Box>

            {/* Charts Section */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 4 }}>
                <Gline
                    title="Evolucion peso"
                    data={evoPeso.map((item: any) => ({ name: item.mes, value: item.promedio }))}
                />
                <GBar
                    title="Tipo Ganado"
                    data={Object.entries(Distribucion).map(([tipo, cantidad]: any) => ({ name: tipo, value: cantidad }))}
                />
            </Box>

            {/* Recent Activity Section */}
            <Activity 
                events={eventos}
                onclick={(event) => actionEvents(event)}
            />
        </div>
    );
}