"use client";
import axiosInstance from "@/app/lib/axiosInstance";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Page() {
  const inspector = useSelector(
    (state: any) => state.inspector.inspectorDetails
  );
  const [user, setUser] = useState<any | null>(null); // Initialize state with null

  useEffect(() => {
    const createShop = async () => {
      try {
        const response = await axiosInstance.post("getShop", {
          email: inspector.email,
        });

        // Ensure the response contains data
        if (response.status === 200 && response.data.shop) {
          setUser(response.data.shop); // Set shop data to state
        } else {
          console.error("Failed to fetch shop");
        }
      } catch (error) {
        console.error("Error fetching shop data", error);
      }
    };

    if (inspector?.email) {
      createShop();
    }
  }, [inspector?.email]);

  if (!user) {
    return <p>Loading...</p>; // Show a loading message while the data is being fetched
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg w-80 p-5 text-center transform transition-transform hover:scale-105">
        <img
          src={user.profilepic}
          alt="Profile Pic"
          className="w-24 h-24 rounded-full object-cover mb-4"
        />
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-800">
            {user.shopName}
          </h2>
          <p className="text-sm text-gray-600">{`${user.firstName} ${user.lastName}`}</p>
          <p className="text-sm text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-600 mb-4">{user.address}</p>
          <div className="flex gap-2 justify-center">
            {user.images.map((image: string, index: number) => (
              <img
                key={index}
                src={image}
                alt={`Shop Image ${index}`}
                className="w-16 h-16 object-cover rounded-md"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
