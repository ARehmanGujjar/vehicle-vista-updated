"use client";

import axiosInstance from "@/app/lib/axiosInstance";
import { setShopAction } from "@/app/lib/reducer/userReducer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

function Inspector() {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axiosInstance.get("getAllShops");
        console.log(response);
        if (response.status === 200 && response.data.shops) {
          setShops(response.data.shops);
        } else {
          console.error("Failed to fetch shops");
        }
      } catch (error) {
        console.error("Error fetching shop data", error);
      }
    };

    fetchShops();
  }, []);

  const dispatch = useDispatch();
  const router = useRouter();
  const handleShop = (shop: any) => {
    dispatch(setShopAction(shop));
    router.push("/vehiclevista-user/dashboard/inspectors/shopDetails");
  };

  return (
    <ScrollArea
      className="mt-[10px]"
      style={{
        height: "calc(100vh - 20px)",
      }}
    >
      <div className="flex flex-wrap justify-center items-center gap-6 bg-gray-100 p-6">
        {shops.length > 0 ? (
          shops.map((shop: any) => (
            <div
              onClick={() => handleShop(shop)}
              key={shop._id}
              className="bg-white cursor-pointer rounded-lg shadow-lg  w-[600px] p-5 mb-6 text-center transform transition-transform hover:scale-105"
            >
              <div className="space-y-2 flex flex-col gap-2">
                <h2 className="text-xl font-semibold text-gray-800">
                  {shop.shopName}
                </h2>
                <p className="text-sm text-gray-600">
                  Owner: {`${shop.firstName} ${shop.lastName}`}
                </p>
                <p className="text-sm text-gray-600">Email: {shop.email}</p>
                <p className="text-sm text-gray-600 mb-4">
                  Address: {shop.address}
                </p>

                {/* Display Shop Images */}
                <div className="flex gap-4 justify-center pt-4">
                  {shop.images?.map((image: any, index: any) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Shop Image ${index}`}
                      className="w-18 h-16 object-cover rounded-md"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No shops available.</p>
        )}
      </div>
    </ScrollArea>
  );
}

export default Inspector;
