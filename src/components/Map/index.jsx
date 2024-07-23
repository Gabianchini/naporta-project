import React, { useCallback, useState, useEffect } from "react";
import "./styles.css";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

function Map({ sentFromAddress, receivedAtAddress }) {
  const mapContainer = React.useRef(null); // refer to map container in div
  const [map, setMap] = useState(null);
  const [response, setResponse] = useState(null);
  const [directionsServiceOptions, setDirectionsServiceOptions] = useState(null);
  const [center, setCenter] = useState({});

  const directionsResult = {
    directions: response,
    suppressMarkers: true,
  };

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"], //places api needed to autocomplete and routes/directions
  });

  const [sentFromPosition, setSentFromPosition] = useState(null);
  const [receivedAtPosition, setReceivedAtPosition] = useState(null);

  useEffect(() => {
    if (isLoaded && !loadError) {
      // If google map api is loaded load geocode
      const geocodeAddress = (address, setPosition) => {
        const geocoder = new window.google.maps.Geocoder();

        geocoder.geocode({ address }, (results, status) => {
          if (status === "OK" && results && results.length > 0) {
            const coords = { //get coords to address
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
            };
            setPosition(coords);
          } else {
            console.error(
              "Geocode was not successful for the following reason:",
              status
            );
          }
        });
      };
      if (
        addressNotEmpty(sentFromAddress) && addressNotEmpty(receivedAtAddress)
      ) {
        geocodeAddress(sentFromAddress, setSentFromPosition);

        geocodeAddress(receivedAtAddress, setReceivedAtPosition);
      }
    }
  }, [isLoaded, loadError]);

  useEffect(() => { //check if markers exist in map defore display origin and destination route 
    if (
      sentFromPosition &&
      receivedAtPosition &&
      !directionsServiceOptions &&
      isLoaded &&
      !loadError
    ) {
      setDirectionsServiceOptions({
        destination: receivedAtPosition,
        origin: sentFromPosition,
        travelMode: window.google.maps.TravelMode.DRIVING,
      });
    }
  }, [sentFromPosition, receivedAtPosition, directionsServiceOptions]);

  useEffect(() => { //Map will zooom in origin address
    setCenter(sentFromPosition);
  }, [sentFromPosition]);

  const addressNotEmpty = (address) => { // Check if address is empty 
    if (typeof address === "string" && address.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  // Leveraging the example from this library's main documentation:
  // https://github.com/JustFly1984/react-google-maps-api/blob/develop/packages/react-google-maps-api/src/components/directions/DirectionsRenderer.md

  const directionsCallback = useCallback((result, status) => {
    if (result !== null) {
      if (status === "OK") {
        setResponse(result);
      } else {
        console.log("response: ", result);
      }
    }
  }, []);

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
          {sentFromPosition && (
            <Marker
              position={sentFromPosition}
              map={map}
              icon={{
                url: "https://i.ibb.co/JBFR3Wn/car-blue.png",
                scaledSize: new window.google.maps.Size(40, 40),
              }}
            />
          )}
          {receivedAtPosition && (
            <Marker
              position={receivedAtPosition}
              map={map}
              icon={{
                url: "https://i.ibb.co/frdGQmd/flag-blue.png",
                scaledSize: new window.google.maps.Size(40, 40),
              }}
            />
          )}

          {directionsServiceOptions && (
            <DirectionsService
              options={directionsServiceOptions}
              callback={directionsCallback}
            />
          )}

          {directionsResult.directions && (
            <DirectionsRenderer
              options={directionsResult}
            />
          )}
        </GoogleMap>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Map;
