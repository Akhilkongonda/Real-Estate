import React, { useState, useEffect } from 'react';
import { GoogleMap,LoadScript,Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

function MyComponent() {
  const [markers, setMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [map, setMap] = useState(null); 
  const [mapType, setMapType] = useState('roadmap'); // 'roadmap' or 'hybrid'

  // Fetch user's current location on component mount


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

  // Handle map click event
  const handleClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    const newMarker = { lat, lng };

    // Update markers array
    setMarkers((current) => [...current, newMarker]);
  };

  // Effect to add marker for user's current location
  useEffect(() => {
    if (map && userLocation) {
      console.log("User's current location:", userLocation);
      const userMarker = new window.google.maps.Marker({
        position: userLocation,
        map,
        icon: {
          url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png', // Custom marker icon
          scaledSize: new window.google.maps.Size(30, 30), // Size of the marker
          origin: new window.google.maps.Point(0, 0), // Origin point of the icon
          anchor: new window.google.maps.Point(20, 40) // Anchor point of the icon (0,0 is top left)
        }
      });

      return () => {
        userMarker.setMap(null); // Cleanup: remove marker when component unmounts
      };
    }
  }, [map, userLocation]);

  // Toggle map type between 'roadmap' and 'hybrid'
  const handleToggleMapType = () => {
    setMapType(mapType === 'roadmap' ? 'hybrid' : 'roadmap');
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBbz5agIqI3MeWg1FoOUQCMsTmN-z5Ktww">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation || { lat: 17.3850, lng: 78.4867 }} // Center map on user's current location or default center
        zoom={userLocation ? 20 : 8} // Zoom level based on user's location availability
        mapTypeId={mapType} // Set mapTypeId based on mapType state
        onClick={handleClick} // Attach click event handler
        onLoad={(map) => setMap(map)} // Set the map instance
      >
        {/* Display all markers */}
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker}
            options={{
              icon: {
                url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png', // Custom marker icon
                scaledSize: new window.google.maps.Size(30, 30), // Size of the clicked marker
                origin: new window.google.maps.Point(0, 0), // Origin point of the icon
                anchor: new window.google.maps.Point(15, 30) // Anchor point of the icon (0,0 is top left)
              },
              optimized: false,
              zIndex: 1
            }}
          />
        ))}

        {/* Toggle button */}
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

      {/* Display coordinates for clicked location */}
      {markers.length > 0 && (
        <div style={{ position: 'absolute', top: 10, left: 10, background: 'white', padding: 10, borderRadius: 5 }}>
          <p>Latitude: {markers[markers.length - 1].lat}</p>
          <p>Longitude: {markers[markers.length - 1].lng}</p>
        </div>
      )}
    </LoadScript>
  );
}

export default React.memo(MyComponent);
