import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';


interface DataPoint {
    name: string;
    value: number;
}

interface GlineProps {
    title: string;
    data: DataPoint[];
}

const Gline: React.FC<GlineProps> = ({ title, data }) => {
    return (
        <Paper sx={{ p: 3, height: 400, paddingBottom: 5 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
                {title}
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </Paper>
    );
};

export default Gline;