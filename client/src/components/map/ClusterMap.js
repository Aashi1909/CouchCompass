import React, { useEffect, useState } from 'react';
import { useValue } from '../../context/ContextProvider';
import { getRooms } from '../../actions/room';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster'; // React wrapper for MarkerClusterGroup
import 'leaflet/dist/leaflet.css'; // Leaflet CSS
import '@changey/react-leaflet-markercluster/dist/styles.min.css'; // MarkerCluster CSS

import { Avatar, Paper } from '@mui/material';
import './cluster.css';

const ClusterMap = () => {
  const {
    state: { rooms },
    dispatch,
    mapRef,
  } = useValue();
  const [points, setPoints] = useState([]);
  const [zoom, setZoom] = useState(10); // Default zoom level

  useEffect(() => {
    getRooms(dispatch);
  }, []);

  useEffect(() => {
    if (Array.isArray(rooms)) {
      const points = rooms.map((room) => ({
        lat: room.lat,
        lng: room.lng,
        roomId: room._id,
        price: room.price,
        title: room.title,
        description: room.description,
        images: room.images,
        uPhoto: room.uPhoto,
        uName: room.uName,
      }));
      setPoints(points);
    } else {
    }
  }, [rooms]);

  const handleZoomEnd = () => {
    const map = mapRef.current;
    setZoom(map.getZoom());
  };

  return (
    <MapContainer
      center={[51.5072, 0.1276]} // Default location (London)
      zoom={zoom}
      style={{ width: '100%', height: '100%' }}
      whenCreated={(map) => { mapRef.current = map; }}
      onZoomEnd={handleZoomEnd}
      maxZoom={20}
    >
<TileLayer
  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
  attribution='&copy; <a href="https://carto.com/">CARTO</a>'
/>
      
      <MarkerClusterGroup>
        {points.map((point) => (
          <Marker key={point.roomId} position={[point.lat, point.lng]}>
            <Tooltip>{point.uName}</Tooltip>
            <Popup>
              <div>
                <Avatar src={point.uPhoto} component={Paper} elevation={2} />
                <h3>{point.title}</h3>
                <p>{point.description}</p>
                <p>Price: {point.price}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default ClusterMap;
