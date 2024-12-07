import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import L from 'leaflet';
import { useValue } from '../../../context/ContextProvider';

// Configure Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow,
});

const AddLocation = () => {
  const {
    state: { location },
    dispatch,
  } = useValue();

  const lng = location?.lng ?? 77.209; // Default longitude
  const lat = location?.lat ?? 28.6139; // Default latitude

  useEffect(() => {
    if (lng === 0 && lat === 0) {
      fetch('https://ipapi.co/json')
        .then((response) => response.json())
        .then((data) => {
          console.log(data, 'Fetched Location Data');
          if (data?.longitude && data?.latitude) {
            dispatch({
              type: 'UPDATE_LOCATION',
              payload: { lng: data.longitude, lat: data.latitude },
            });
          }
        })
        .catch((error) => {
          console.error('Error fetching location:', error);
          dispatch({
            type: 'UPDATE_LOCATION',
            payload: { lng: 77.209, lat: 28.6139 }, // Fallback location
          });
        });
    }
  }, [lng, lat, dispatch]);

  const LocationMarker = () => {
    const map = useMapEvents({
      dragend: () => {
        const center = map.getCenter();
        dispatch({
          type: 'UPDATE_LOCATION',
          payload: { lng: center.lng, lat: center.lat },
        });
      },
    });

    useEffect(() => {
      map.setView([lat, lng], 8);
    }, [lat, lng, map]);

    return (
      <Marker
        position={[lat, lng]}
        draggable
        eventHandlers={{
          dragend: (event) => {
            const { lat, lng } = event.target.getLatLng();
            dispatch({
              type: 'UPDATE_LOCATION',
              payload: { lng, lat },
            });
          },
        }}
      />
    );
  };

  return (
    <Box sx={{ height: 400, position: 'relative' }}>
      <MapContainer center={[lat, lng]} zoom={8} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {lng && lat && <LocationMarker />}
      </MapContainer>
    </Box>
  );
};

export default AddLocation;
