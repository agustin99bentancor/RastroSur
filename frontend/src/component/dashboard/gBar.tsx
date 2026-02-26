import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, BarChart } from 'recharts';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';


interface DataPoint {
    name: string;
    value: number;
}

interface GBarProps {
    title: string;
    data: DataPoint[];
}

const GBar: React.FC<GBarProps> = ({ title, data }) => {
    return (
                <Paper sx={{ p: 3, height: 400 }}>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                        {title}
                    </Typography>
                    <ResponsiveContainer width="100%" height="85%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#2e7d32" />
                        </BarChart>
                    </ResponsiveContainer>
                </Paper>
    );
};

export default GBar;