import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Icon from 'leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Esto es un "hack" necesario porque a veces los iconos no cargan bien en React/Webpack
import icon from '../../node_modules/leaflet/dist/images/marker-icon.png';
import iconShadow from '../../node_modules/leaflet/dist/images/marker-shadow.png';

import pin from "../assets/pin.png";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const customIcon = new L.Icon({
  // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconUrl: pin,
  iconSize: [38, 38] // size of the icon
});

type Props = {
  center?: [number, number];
  zoom?: number;
  height?: number | string;
  showPopupText?: string;
};

const MapaBasico: React.FC<Props> = ({
  center = [-34.9034098, -56.1812591],
  zoom = 14,
  height = 160,
  showPopupText = 'Rastro Sur oficina central',
}) => {
  const posicion: [number, number] = center;

  return (
    <div style={{ height: height, width: 200 }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        dragging={false}
        touchZoom={false}
        keyboard={false}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={posicion}
            icon={customIcon}
        >
          <Popup>{showPopupText}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapaBasico;