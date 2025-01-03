"use client";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"; // Ensure Routing Machine is imported
import { useSelector } from "react-redux";
import axiosInstance from "@/app/lib/axiosInstance";
import Loaderss from "@/app/Components/MainPage/Loaderss"

// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const inspectorIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2910/2910484.png", // Car tool icon
  iconRetinaUrl: "https://cdn-icons-png.flaticon.com/512/2910/2910484.png", // High resolution version
  iconSize: [30, 30], // Adjust the size as necessary
  iconAnchor: [15, 30], // Anchor the icon to the bottom
  popupAnchor: [0, -30], // Popup position relative to the marker
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const RoutingControl: React.FC<{
  start: [number, number];
  end: [number, number];
}> = ({ start, end }) => {
  const map = useMap();

  useEffect(() => {
    if (map) {
      // Ensure that L.Routing is defined before using it
      if (L.Routing) {
        try {
          const routingControl = L.Routing.control({
            waypoints: [L.latLng(start), L.latLng(end)],
            routeWhileDragging: true,
            createMarker: () => null,
          }).addTo(map);

          return () => {
            map.removeControl(routingControl);
          };
        } catch (error) {
          console.error("Error initializing the routing control:", error);
        }
      } else {
        console.error(
          "L.Routing is undefined. Make sure leaflet-routing-machine is properly loaded."
        );
      }
    }
  }, [start, end, map]);

  return null;
};

const Page: React.FC = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [inspectors, setInspectors] = useState<Array<any>>([]);
  const [route, setRoute] = useState<[number, number] | null>(null); // New state to store the target inspector position
  const user = useSelector((state: any) => state?.user?.userDetails?.email);

  useEffect(() => {
    let isMounted = true;

    // Get user's current position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (location) => {
          const { latitude, longitude } = location.coords;

          if (isMounted) {
            setPosition([latitude, longitude]);

            try {
              // Post user's location to the server
              await axiosInstance.post(`postLocation`, {
                email: user,
                latitude,
                longitude,
                type: "user",
              });

              // Fetch inspectors' data
              const response = await axiosInstance.get(`getLocation`);
              if (response.data?.inspectors) {
                setInspectors(response.data.inspectors);
              }
            } catch (error) {
              console.error("Error fetching data:", error);
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
  }, [user]);

  // Handle inspector marker click
  const handleInspectorClick = (latitude: number, longitude: number) => {
    console.log("Inspector clicked:", latitude, longitude);
    setRoute([latitude, longitude]); // Update route to new inspector
  };

  return (
    <div>
      {position ? (
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "100vh", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* User's location */}
          <Marker position={position}>
            <Popup>Your Location</Popup>
          </Marker>

          {/* Inspectors' locations */}
          {inspectors.map((inspector) => (
            <Marker
              key={inspector._id}
              position={[inspector.latitude, inspector.longitude]}
              icon={inspectorIcon}
              eventHandlers={{
                click: () =>
                  handleInspectorClick(inspector.latitude, inspector.longitude),
              }}
            >
              <Popup>
                <strong>Inspector:</strong> {inspector.email}
              </Popup>
            </Marker>
          ))}

          {/* If route is set, show the routing control */}
          {route && <RoutingControl start={position} end={route} />}
        </MapContainer>
      ) : (
        <Loaderss/>
      )}
    </div>
  );
};

export default Page;
