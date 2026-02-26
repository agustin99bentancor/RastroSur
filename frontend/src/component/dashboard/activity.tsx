
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

interface ActivityProps {
    events: any[];
}

const formatDate = (fecha: string) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
};

const Activity = ({ events }: ActivityProps) => {
  return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mb: 2 }}>
                Actividad Reciente
            </Typography>
            <List>
                {events.length === 0 ? (
                    <Typography color="textSecondary" align="center" sx={{ py: 3 }}>
                        No hay eventos recientes
                    </Typography>
                ) : (
                    events.map((evento: any, index: number) => (
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
                            {index < events.length - 1 && <Divider />}
                        </Box>
                    ))
                )}
            </List>
        </Paper>
  );
};

export default Activity;