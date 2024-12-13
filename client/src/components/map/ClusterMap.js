import React, { useEffect, useState, useRef } from 'react';
import { useValue } from '../../context/ContextProvider';
import { getRooms } from '../../actions/room';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Supercluster from 'supercluster';
import './cluster.css';
import { Avatar, Paper, Tooltip } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

const supercluster = new Supercluster({
  radius: 75,
  maxZoom: 20,
});

const UpdateMapBounds = ({ setBounds, setZoom }) => {
  useMapEvents({
    zoomend: (e) => setZoom(e.target.getZoom()),
    moveend: (e) => {
      const bounds = e.target.getBounds();
      setBounds([
        bounds.getWest(),
        bounds.getSouth(),
        bounds.getEast(),
        bounds.getNorth(),
      ]);
    },
  });
  return null;
};

const ClusterMap = () => {
  const {
    state: { rooms },
    dispatch,
  } = useValue();
  const [points, setPoints] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [bounds, setBounds] = useState([-180, -85, 180, 85]);
  const [zoom, setZoom] = useState(2);
  const mapRef = useRef(null);

  useEffect(() => {
    getRooms(dispatch);
  }, []);

  useEffect(() => {
    if (!rooms || !Array.isArray(rooms)) return;
    const points = rooms.map((room) => ({
      type: 'Feature',
      properties: {
        cluster: false,
        roomId: room._id,
        price: room.price,
        title: room.title,
        description: room.description,
        lng: room.lng,
        lat: room.lat,
        images: room.images,
        uPhoto: room.uPhoto,
        uName: room.uName,
      },
      geometry: {
        type: 'Point',
        coordinates: [parseFloat(room.lng), parseFloat(room.lat)],
      },
    }));
    setPoints(points);
  }, [rooms]);

  useEffect(() => {
    supercluster.load(points);
    setClusters(supercluster.getClusters(bounds, zoom));
  }, [points, zoom, bounds]);

  return (
    <MapContainer
      center={[51.5072, 0.1276]}
      zoom={zoom}
      style={{ height: '100vh', width: '100%' }}
      whenCreated={(map) => (mapRef.current = map)}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <UpdateMapBounds setBounds={setBounds} setZoom={setZoom} />
      {clusters.map((cluster) => {
        const { cluster: isCluster, point_count } = cluster.properties;
        const [longitude, latitude] = cluster.geometry.coordinates;
        if (isCluster) {
          const clusterSize = 10 + (point_count / points.length) * 20;
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              position={[latitude, longitude]}
              eventHandlers={{
                click: () => {
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    20
                  );
                  mapRef.current.setView([latitude, longitude], expansionZoom);
                },
              }}
              icon={L.divIcon({
                html: `<div class='cluster-marker' style='width: ${clusterSize}px; height: ${clusterSize}px;'>${point_count}</div>`,
                className: 'cluster-icon',
              })}
            />
          );
        }

        return (
          <Marker
            key={`room-${cluster.properties.roomId}`}
            position={[latitude, longitude]}
            icon={L.divIcon({ className: 'room-marker' })}
          >
            <Popup>
              <Tooltip title={cluster.properties.uName} placement="top">
                <Avatar
                  src={cluster.properties.uPhoto}
                  component={Paper}
                  elevation={2}
                />
              </Tooltip>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default ClusterMap;
