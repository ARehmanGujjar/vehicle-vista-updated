"use client";
import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Make sure to import Leaflet CSS

const GetLatLongUsingLeaflet = () => {
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const getLatLong = () => {
    if (!address) return;

    const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      address
    )}`;

    // Make the request to Nominatim API
    fetch(geocodeUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const firstResult = data[0];
          setLat(parseFloat(firstResult.lat));
          setLng(parseFloat(firstResult.lon));
          setError("");
        } else {
          setError("Unable to find location");
          setLat(null);
          setLng(null);
        }
      })
      .catch(() => {
        setError("Error fetching location data");
        setLat(null);
        setLng(null);
      });
  };

  useEffect(() => {
    if (lat && lng) {
      // Initialize map only when lat and lng are available
      const map = L.map("map").setView([lat, lng], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Add marker at the fetched coordinates
      L.marker([lat, lng]).addTo(map).bindPopup("Location found!").openPopup();

      // Cleanup map on component unmount
      return () => {
        map.remove();
      };
    }
  }, [lat, lng]); // Trigger map update whenever lat or lng changes

  return (
    <div>
      <h2>Get Latitude and Longitude from Address (Leaflet + Nominatim)</h2>
      <input
        type="text"
        value={address}
        onChange={handleAddressChange}
        placeholder="Enter an address"
      />
      <button onClick={getLatLong}>Get Coordinates</button>

      {lat && lng && (
        <div style={{ height: "400px", width: "100%" }}>
          <div id="map" style={{ height: "100%" }}></div>
        </div>
      )}
    </div>
  );
};

export default GetLatLongUsingLeaflet;
