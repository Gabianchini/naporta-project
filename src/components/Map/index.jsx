import React, { useRef, useState, useEffect } from "react";
import "./styles.css";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete
} from "@react-google-maps/api";

const center = { lat: 37.422355, lng: -122.0843435 }; // Center of the map


function Map({sentFromAddress,receivedAtAddress}) {
  const [map, setMap] = useState(null);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"], //places api needed to autocomplete and routes/directions
  });

  const [sentFromPosition, setSentFromPosition] = useState(null);
  const [receivedAtPosition, setReceivedAtPosition] = useState(null);



  useEffect(() => {
    if (isLoaded && !loadError) {// If google map api is loaded load geocode
      const geocodeAddress = (address, setPosition) => {
        const geocoder = new window.google.maps.Geocoder();

        geocoder.geocode({ address }, (results, status) => {
         
          if (status === 'OK' && results && results.length > 0) {
            const coords = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng()
            };
            setPosition(coords);
            
            
            
          } else {
            console.error('Geocode was not successful for the following reason:', status);
          }
        });
      };
      geocodeAddress(sentFromAddress, setSentFromPosition);
     
      geocodeAddress(receivedAtAddress, setReceivedAtPosition);
    }
  }, [isLoaded, loadError]);


  const mapContainer = React.useRef(null);


  return (
      <div className="Mapcomp" ref={mapContainer}>
        {sentFromPosition && receivedAtPosition && isLoaded && !loadError ? (
          // Render map only if Google Maps API is loaded and there is no error
        
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={center}
            zoom={15}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={(map) => setMap(map)}
          >

        {sentFromPosition && 
            <Marker
              position={sentFromPosition}
              map={map}
              icon={{
              url:"https://i.ibb.co/XFVxY1P/car-icon-map.png",
              scaledSize: new window.google.maps.Size(40, 40),
            }} 
          />
        }
        {receivedAtPosition &&
          <Marker
            position={receivedAtPosition}
            map={map}
            icon={{
              url:'https://i.ibb.co/pWjy9G9/flag-icon-map.png',
              scaledSize: new window.google.maps.Size(40, 40),
            }}
          />
          }
            
          </GoogleMap>
         
        ) : (
          <span>Loading...</span>
        )}
      </div>
  
  );
}

export default Map;
