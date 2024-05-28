import React, { useState, useEffect, useContext } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { FormContext } from './Contexts/FormContext';
import { useNavigate } from 'react-router-dom';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

function MyComponent() {
  const [markers, setMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [map, setMap] = useState(null);
  const [mapType, setMapType] = useState('roadmap');
  const [showModal, setShowModal] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState({ lat: null, lng: null });
  const { submitFormData, setSubmitFormData } = useContext(FormContext);
  const navigate = useNavigate();

  const handleClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setSelectedCoords({ lat, lng });
    setShowModal(true);
  };

  const handleConfirm = () => {
    setMarkers((current) => [...current, selectedCoords]);
    setSubmitFormData((prevState) => ({ ...prevState, propertyLocation: selectedCoords }));
    setShowModal(false);
    navigate('/submitForm');
  };

  const handleSelectAgain = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (map && userLocation) {
      const userMarker = new window.google.maps.Marker({
        position: userLocation,
        map,
        icon: {
          url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          scaledSize: new window.google.maps.Size(30, 30),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(20, 40),
        },
      });

      return () => {
        userMarker.setMap(null);
      };
    }
  }, [map, userLocation]);

  const handleToggleMapType = () => {
    setMapType(mapType === 'roadmap' ? 'hybrid' : 'roadmap');
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBbz5agIqI3MeWg1FoOUQCMsTmN-z5Ktww">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation || { lat: 17.3850, lng: 78.4867 }}
        zoom={userLocation ? 20 : 8}
        mapTypeId={mapType}
        onClick={handleClick}
        onLoad={(map) => setMap(map)}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker}
            options={{
              icon: {
                url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                scaledSize: new window.google.maps.Size(30, 30),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 30),
              },
              optimized: false,
              zIndex: 1,
            }}
          />
        ))}

        <button
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 1,
            padding: '10px',
            background: 'white',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={handleToggleMapType}
        >
          {mapType === 'roadmap' ? 'Switch to Hybrid' : 'Switch to Roadmap'}
        </button>
      </GoogleMap>

      {markers.length > 0 && (
        <div style={{ position: 'absolute', top: 10, left: 10, background: 'white', padding: 10, borderRadius: 5 }}>
          <p>Latitude: {markers[markers.length - 1].lat}</p>
          <p>Longitude: {markers[markers.length - 1].lng}</p>
        </div>
      )}

      {showModal && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '80%' }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Selected Location</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body text-center">
                <p>Latitude: {selectedCoords.lat}</p>
                <p>Longitude: {selectedCoords.lng}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary w-50 me-2" onClick={handleSelectAgain}>
                  Select Again
                </button>
                <button type="button" className="btn btn-primary w-50 ms-2" onClick={handleConfirm}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </LoadScript>
  );
}

export default React.memo(MyComponent);
