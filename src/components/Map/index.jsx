import React, { useRef, useState, useEffect } from "react";
import carIcon from '../../assets/car-icon-map.png'
import flagIcon from '../../assets/flag-icon-map.png'
import "./styles.css";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";

const center = { lat: 37.422355, lng: -122.0843435 }; // Center of the map
const marker1Position = { lat: 48.8584, lng: 2.2945 }; // Coordinates for Marker 1
const marker2Position = { lat: 48.8607, lng: 2.3524 }; // Coordinates for Marker 2

function Map({sentFromAddress,receivedAtAddress}) {
  const [map, setMap] = useState(null);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [sentFromPosition, setSentFromPosition] = useState(null);
  const [receivedAtPosition, setReceivedAtPosition] = useState(null);
  // const sentFromAddress = '1900 Amphitheatre Parkway, Mountain View, CA';
  // const receivedAtAddress = '1700 Charleston Road, Mountain View, CA';


  useEffect(() => {
    if (isLoaded && !loadError) {

      const geocodeAddress = (address, setPosition) => {
        const geocoder = new window.google.maps.Geocoder();

        geocoder.geocode({ address }, (results, status) => {
          console.log(results);
          console.log(status);
          if (status === 'OK' && results && results.length > 0) {
            const coords = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng()
            };
            setPosition(coords);
            console.log(coords);
            
            
          } else {
            console.error('Geocode was not successful for the following reason:', status);
          }
        });
      };
      geocodeAddress(sentFromAddress, setSentFromPosition);
      console.log(sentFromPosition);
      geocodeAddress(receivedAtAddress, setReceivedAtPosition);
    }
  }, [isLoaded, loadError]);

  // useEffect(() => {
  //   if(map){
    
  // }
  // }, []);

  const mapContainer = React.useRef(null);

  // useEffect(() => {
  //   if (sentFromPosition) {
  //     // setMapCenter(sentFromPosition);
  //     console.log(sentFromPosition);
  //     // setLoadedSentFromPosition(true);
  //   }
  // }, [sentFromPosition]);

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
              // url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
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
              // url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              scaledSize: new window.google.maps.Size(40, 40),
            }}
          />
          }
            
          </GoogleMap>
         
        ) : (
          <span>Error loading map</span>
        )}
      </div>
  
  );
}

export default Map;
