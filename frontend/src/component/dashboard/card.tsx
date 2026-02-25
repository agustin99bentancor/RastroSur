import Card from '@mui/material/Card';
import { SvgIconComponent } from '@mui/icons-material';
import './card.css';

interface CardKPIsProps {
    title: string;
    value: number | string;
    icon: SvgIconComponent;
    color?: string;
}

export default function CardKPIs({ title, value, icon: Icon, color = '#1976d2' }: CardKPIsProps) {
    // Convierte el color hex a rgba para el fondo del icono
    const hexToRgba = (hex: string, alpha: number) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    return (
        <Card 
            className="kpi-card"
            style={{ 
                '--card-color': color,
                '--icon-bg': hexToRgba(color, 0.1),
            } as React.CSSProperties}
        >
            <div className="kpi-card-content">
                <div className="kpi-card-box">
                    <div className="kpi-card-text-container">
                        <div className="kpi-card-title">
                            {title}
                        </div>
                        <div className="kpi-card-value">
                            {value}
                        </div>
                    </div>
                    <div className="icon-wrapper">
                        <Icon className="kpi-card-icon" style={{ color: color }} />
                    </div>
                </div>
            </div>
        </Card>
    );
}