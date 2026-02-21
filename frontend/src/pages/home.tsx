import React, { useEffect } from 'react';
import './home.css';
import cow from  '../assets/homeCow2.jpg';
import { FaCheck } from "react-icons/fa";
import MapaBasico from '../component/map.tsx';
import celScreen  from '../assets/celScreen.png';
import { useAuth } from '../context/authContext.tsx';
import { useNavigate }  from 'react-router-dom';

export default function Home() {
    const { isAuthenticated } = useAuth();    
    const navigate = useNavigate();

    useEffect(() => {
    if (isAuthenticated) {
        navigate('/dashboard');  // ✅ Redirige automáticamente
    }
    }, [isAuthenticated]);

    return (
        <main className="style-light">   
            <div className="flex flex-col items-center justify-center mt-10 mb-10 px-150">
                <h2 className="font-family['Montserrat'] text-[31px] font-bold text-center leading-tight ">
                    Gestiona tu ganado, lotes y trazabilidad en una sola plataforma
                        <strong className="text-figma-style">
                            Rastro
                            <strong style={{color: "var(--secondary)"}}>
                                Sur 
                            </strong>
                        </strong >
                        <p></p>
                    menos papeles, más productividad.
                </h2>
            </div>
            <div className="flex justify-between items-center bg-white px-20 py-10 mx-20 ">
                <div className="cow-container">
                    <img src={cow} alt="Imagen" className="cow-image"/>
                </div>
                <div className="ml-10 w-2/5">
                    <h2
                        className="font-family['Montserrat'] text-[24px] font-weight[400] text-center leading-tight "
                    > 
                        <strong className="text-figma-style">
                            Rastro
                            <strong style={{color: "var(--secondary)"}}>
                                Sur 
                            </strong>
                        </strong >
                        <br/>
                        es la plataforma digital que revoluciona la gestión ganadera. Registra animales, controla lotes, gestiona salud y reproducción, y accede a reportes completos desde cualquier dispositivo.
                    </h2>
                    <img src={celScreen} alt="Captura de pantalla en celular"></img>
                    <ul className="benefits-list">
                        <li className="benefit-item">
                            <FaCheck className="benefit-icon" />
                            <span>Registro y seguimiento de animales</span>
                        </li>
                        <li className="benefit-item">
                            <FaCheck className="benefit-icon" />
                            <span>Gestión de lotes y pasturas</span>
                        </li>
                        <li className="benefit-item">
                            <FaCheck className="benefit-icon" />
                            <span>Control de salud y reproducción</span>
                        </li>
                        <li className="benefit-item">
                            <FaCheck className="benefit-icon" />
                            <span>Reportes detallados y análisis</span>
                        </li>
                        <li className="benefit-item">
                            <FaCheck className="benefit-icon" />
                            <span>Acceso desde cualquier dispositivo</span>
                        </li>
                    </ul>
                    
                </div>
            </div>
            <footer
                className="footer"
            >
                <div
                    className="flex justify-between items-center px-20 mx-20 "
                >
                    <div>
                        <h1>Contactos</h1>
                        <h2>(+590) 094612421</h2>
                        <h2>0200-415192</h2>
                        <h2>rastroSur@gmail.com</h2>
                    </div>
                    <div>
                        <h1>Ubicación</h1>
                        <MapaBasico></MapaBasico>
                        <h2>18 de julio y Roxlo</h2>
                    </div>
                </div>
                <p>
                    &copy; 2024 RastroSur. Todos los derechos reservados.
                </p>
            </footer>
        </main>
    );
}