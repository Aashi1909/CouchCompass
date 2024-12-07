import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';  // Import Leaflet here
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder';
import { useValue } from '../../../context/ContextProvider';


const Geocoder = () => {
  const { dispatch } = useValue();
  const map = useMap(); // Get access to the map instance

  useEffect(() => {
    // Initialize the geocoder control
    const geocoder = L.Control.geocoder({
      defaultMarkGeocode: false, // Prevents automatic marker addition by the geocoder
    }).addTo(map);

    // Listen for geocode results
    geocoder.on('markgeocode', (e) => {
      const { center } = e.geocode;
      // Center the map on the result
      map.setView(center, 10);

      // Dispatch the coordinates to your context
      dispatch({
        type: 'UPDATE_LOCATION',
        payload: { lng: center.lng, lat: center.lat },
      });

      // Add a draggable marker at the searched location
      const marker = L.marker(center, { draggable: true }).addTo(map);

      // Update the location in the state when the marker is dragged
      marker.on('dragend', (event) => {
        const newCoords = event.target.getLatLng();
        dispatch({
          type: 'UPDATE_LOCATION',
          payload: { lng: newCoords.lng, lat: newCoords.lat },
        });
      });
    });

    // Cleanup: remove geocoder control when the component unmounts
    return () => {
      map.removeControl(geocoder);
    };
  }, [map, dispatch]);

  return null;
};

export default Geocoder;
