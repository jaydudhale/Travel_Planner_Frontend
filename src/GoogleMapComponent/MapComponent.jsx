import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

const GoogleMapComponent = ({ origin, destination }) => {
  const [directionsResponse, setDirectionsResponse] = useState(null);

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: 20.5937, // Center of India
    lng: 78.9629,
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {origin && destination && (
          <DirectionsService
            options={{
              origin: origin,
              destination: destination,
              travelMode: "DRIVING",
            }}
            callback={(response, status) => {
              if (status === "OK") {
                setDirectionsResponse(response);
              } else {
                console.error("Directions request failed due to " + status);
              }
            }}
          />
        )}

        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;