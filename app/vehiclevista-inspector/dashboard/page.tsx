"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useSelector } from "react-redux";
import axiosInstance from "@/app/lib/axiosInstance";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface Coordinates {
  latitude: string;
  longitude: string;
}

interface RoutingProps {
  start: [number, number];
  end: [number, number];
}

const Routing: React.FC<RoutingProps> = ({ start, end }) => {
  const map = useMap();
  const routingControlRef = useRef<L.Routing.Control | null>(null);

  useEffect(() => {
    if (!start || !end) return;

    routingControlRef.current = L.Routing.control({
      waypoints: [L.latLng(start), L.latLng(end)],
      routeWhileDragging: true,
    }).addTo(map);

    return () => {
      if (routingControlRef.current) {
        map.removeLayer(routingControlRef.current);
        routingControlRef.current = null;
      }
    };
  }, [map, start, end]);

  return null;
};

const Page: React.FC = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [targetCoords, setTargetCoords] = useState<Coordinates>({
    latitude: "",
    longitude: "",
  });
  const [targetPosition, setTargetPosition] = useState<[number, number] | null>(
    null
  );
  const inspector = useSelector(
    (state: any) => state?.inspector?.inspectorDetails?.email
  );
  console.log(inspector);
  useEffect(() => {
    let isMounted = true;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (location) => {
          const { latitude, longitude } = location.coords;

          if (isMounted) {
            setPosition([latitude, longitude]);

            try {
              await axiosInstance.post(`postLocation`, {
                email: inspector,
                latitude,
                longitude,
                type: "inspector",
              });
            } catch (error) {
              console.error("Error posting location data:", error);
            }
          }
        },
        (error) => {
          console.error("Error accessing geolocation:", error);
          alert("Unable to access your location. Please check permissions.");
        }
      );
    } else {
      alert("Geolocation API is not supported by your browser.");
    }

    return () => {
      isMounted = false;
    };
  }, [inspector]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setTargetCoords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSetTargetLocation = (): void => {
    const { latitude, longitude } = targetCoords;
    const parsedLat = parseFloat(latitude);
    const parsedLng = parseFloat(longitude);

    if (
      !isNaN(parsedLat) &&
      parsedLat >= -90 &&
      parsedLat <= 90 &&
      !isNaN(parsedLng) &&
      parsedLng >= -180 &&
      parsedLng <= 180
    ) {
      setTargetPosition([parsedLat, parsedLng]);
    } else {
      alert(
        "Please enter valid latitude (-90 to 90) and longitude (-180 to 180)."
      );
    }
  };

  return (
    <div>
      {/* <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Target Latitude"
          name="latitude"
          value={targetCoords.latitude}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Target Longitude"
          name="longitude"
          value={targetCoords.longitude}
          onChange={handleInputChange}
        />
        <button onClick={handleSetTargetLocation}>Set Target Location</button>
      </div> */}

      {position ? (
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "100vh", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>Your Location</Popup>
          </Marker>
          {targetPosition && (
            <>
              <Marker position={targetPosition}>
                <Popup>Target Location</Popup>
              </Marker>
              <Routing start={position} end={targetPosition} />
            </>
          )}
        </MapContainer>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};

export default Page;
