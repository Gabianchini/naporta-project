import React, { useRef, useState, useEffect } from "react";
import "./styles.css";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";

const center = { lat: 48.8584, lng: 2.2945 }; // Center of the map
const marker1Position = { lat: 48.8584, lng: 2.2945 }; // Coordinates for Marker 1
const marker2Position = { lat: 48.8607, lng: 2.3524 }; // Coordinates for Marker 2

function Map() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);

  useEffect(() => {
    if (isLoaded && !loadError) {
      // Google Maps API is loaded successfully
      const mapInstance = new window.google.maps.Map(mapContainer.current, {
        center: center,
        zoom: 15,
        disableDefaultUI: true, // Disable default UI controls
      });
      setMap(mapInstance);
    }
  }, [isLoaded, loadError]);

  const mapContainer = React.useRef(null);

  return (
    <div className="mapComp">
      <div className="Mapcontainer" ref={mapContainer}>
        {isLoaded && !loadError ? (
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
            {map && (
              <>
                <Marker //map origin and destination markers
                  position={marker1Position}
                  map={map}
                  icon={{
                    url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                    scaledSize: new window.google.maps.Size(40, 40), 
                  }}
                />
                <Marker
                  position={marker2Position}
                  map={map}
                  icon={{
                    url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                    scaledSize: new window.google.maps.Size(40, 40),
                  }}
                />
              </>
            )}
          </GoogleMap>
        ) : (
          // Display error message if Google Maps API fails to load
          <span>Error loading map</span>
        )}
      </div>
    </div>
  );
}

export default Map;
