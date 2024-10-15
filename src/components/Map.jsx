// src/components/Map/MapView.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapView = () => {
  const locations = [
    {
        position: [19.076, 72.8777], // Mumbai Central
        description: "Parking Spot 1: 2/4 spots available. Pincode: 400008",
      },
      {
        position: [19.2183, 72.9781], // Dadar
        description: "Parking Spot 2: 3/4 spots available. Pincode: 400014",
      },
      {
        position: [19.0887, 72.8661], // Andheri
        description: "Parking Spot 3: 1/4 spots available. Pincode: 400058",
      },
      {
        position: [19.0402, 72.8347], // Bandra
        description: "Parking Spot 4: 4/4 spots available. Pincode: 400050",
      },
      {
        position: [19.2094, 72.8339], // Vile Parle
        description: "Parking Spot 5: 2/4 spots available. Pincode: 400057",
      },
      {
        position: [19.0176, 72.8562], // Marine Lines
        description: "Parking Spot 6: 3/4 spots available. Pincode: 400002",
      },
      {
        position: [19.1141, 72.8983], // Powai
        description: "Parking Spot 7: 0/4 spots available. Pincode: 400076",
      },
  ];

  const handleBookNow = () => {
    window.open("http://localhost:5173/find-parking", "_blank"); 
  };

  return (
    <MapContainer center={[19.076, 72.8777]} zoom={12} style={{ height: "600px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location, index) => (
        <Marker key={index} position={location.position}>
          <Popup>
            {location.description}
            <br />
            <button
              onClick={handleBookNow}
              style={{
                marginTop: '10px',
                padding: '5px 10px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Book Now
            </button>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
