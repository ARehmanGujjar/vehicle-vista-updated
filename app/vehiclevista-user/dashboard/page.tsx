"use client";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"; // Ensure Routing Machine is imported
import { useSelector } from "react-redux";
import axiosInstance from "@/app/lib/axiosInstance";
import inspector from "../../public/img/mechanic-icon.png";
import repair from "../../public/img/repair.png";
import repair2 from "../../public/img/2.png";
import InspectorPopup from "./components/InspectorPopup";
import Link from "next/link";

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
  iconUrl: repair2.src, // Car tool icon
  iconRetinaUrl: "https://cdn-icons-png.flaticon.com/512/2910/2910484.png", // High resolution version
  iconSize: [30, 30], // Adjust the size as necessary
  iconAnchor: [15, 30], // Anchor the icon to the bottom
  popupAnchor: [0, -30], // Popup position relative to the marker
  // shadowUrl:
  //   "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
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
  const [popupInfo, setPopupInfo] = useState<{
    latitude: number;
    longitude: number;
    firstName: string;
    profilepic: string;
    lastName: string;
    email: string;
    address: string;
  } | null>(null);
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
  const handleInspectorClick = (
    latitude: number,
    longitude: number,
    firstName: string,
    lastName: string,
    profilepic: string,
    email: string,
    address: string
  ) => {
    console.log(
      "Inspector clicked:",
      latitude,
      longitude,
      profilepic,
      firstName,
      lastName,
      address
    );
    setRoute([latitude, longitude]); // Update route to new inspector
    setPopupInfo({
      latitude,
      longitude,
      firstName,
      profilepic,
      lastName,
      email,
      address,
    });
  };
  const closePopup = () => {
    setPopupInfo(null);
  };
  const closeRoute = () => {
    setRoute(null);
  };
  return (
    <div className="relative">
      {position ? (
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "100vh", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <Marker position={position}>
            <Popup>Your Location</Popup>
          </Marker>

          {inspectors.map((inspector) => (
            <Marker
              key={inspector._id}
              position={[inspector.latitude, inspector.longitude]}
              icon={inspectorIcon}
              eventHandlers={{
                click: () =>
                  handleInspectorClick(
                    inspector.latitude,
                    inspector.longitude,
                    inspector.firstName,
                    inspector.lastName,
                    inspector.profilepic,
                    inspector.email,
                    inspector.address
                  ),
              }}
            ></Marker>
          ))}

          {route && <RoutingControl start={position} end={route} />}
        </MapContainer>
      ) : (
        <p>Loading map...</p>
      )}

      {popupInfo && (
        <div
          className="popup absolute top-2 left-20 bg-white shadow-lg rounded-lg p-6"
          style={{ zIndex: 1000 }}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Inspector Details</h3>
            <button
              onClick={() => {
                closePopup();
                closeRoute();
              }}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <InspectorPopup popupInfo={popupInfo} />
        </div>
      )}

      {/* {route && (
        <button
          onClick={closeRoute}
          className="absolute bottom-4 right-4 z-[10000] bg-blue-500 text-white py-2 px-4 rounded shadow-lg"
        >
          Close Route
        </button>
      )} */}
    </div>
  );
};

export default Page;
