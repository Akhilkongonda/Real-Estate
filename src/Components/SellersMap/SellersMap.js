import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const SellerMap = () => {
  const [markers, setMarkers] = useState([]);
  const [mapType, setMapType] = useState('roadmap');
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showModal, setShowModal] = useState(false);


  // Fetch markers from API
  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/formdata/allPoints');

        console.log("Response of the Markers are:", response.data);

        setMarkers(response.data.map(point => {
          if (point && point.propertyLocation && point.propertyLocation.lat && point.propertyLocation.lng) {
            return {
              ...point,
              propertyLocation: {
                lat: parseFloat(point.propertyLocation.lat),
                lng: parseFloat(point.propertyLocation.lng)
              }
            };
          } else {
            // Handle the case where propertyLocation is missing or invalid
            return null;
          }
        }).filter(marker => marker !== null)); // Filter out any null values
      } catch (error) {
        console.error('Error fetching markers:', error);
      }
    };

    fetchMarkers();
  }, []);

  // Handle marker click event
  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setShowModal(true);
  };

  // Toggle map type between 'roadmap' and 'hybrid'
  const handleToggleMapType = () => {
    setMapType(mapType === 'roadmap' ? 'hybrid' : 'roadmap');
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBbz5agIqI3MeWg1FoOUQCMsTmN-z5Ktww">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: 17.3850, lng: 78.4867 }} // Default center
        zoom={8}
        mapTypeId={mapType}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.propertyLocation}
            onClick={() => handleMarkerClick(marker)}
            options={{
              icon: {
                url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
              }
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
            cursor: 'pointer'
          }}
          onClick={handleToggleMapType}
        >
          {mapType === 'roadmap' ? 'Switch to Hybrid' : 'Switch to Roadmap'}
        </button>
      </GoogleMap>

      {showModal && selectedMarker && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '80%' }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Marker Details</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body text-center">
                <p>Width: {selectedMarker.width}</p>
                <p>Length: {selectedMarker.length}</p>
                <p>Price: {selectedMarker.price}</p>
                <p>Facing: {selectedMarker.facing}</p>
                <p>Location Link: <a href={selectedMarker.locationLink} target="_blank" rel="noopener noreferrer">{selectedMarker.locationLink}</a></p>
                <p>Agent Name: {selectedMarker.agentName}</p>
                <p>Agent Mobile: {selectedMarker.agentMobile}</p>
                <p>Description: {selectedMarker.description}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </LoadScript>
  );
}

export default React.memo(SellerMap);
