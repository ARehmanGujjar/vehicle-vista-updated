"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CLASS_FLEX_CENTER } from "yet-another-react-lightbox";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "@/app/lib/axiosInstance";
import { setShopAction } from "@/app/lib/reducer/userReducer";
import { ScrollArea } from "@/components/ui/scroll-area";

const Page = () => {
  const [shops, setShops] = useState([]);
  const searchParams = useSearchParams();
  const popupInfoString = searchParams.get("popupInfo");
  const popupInfo = popupInfoString
    ? JSON.parse(decodeURIComponent(popupInfoString))
    : null;

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

  // Filter shops to find those with the matching email
  const filteredShops = shops.filter(
    (shop: any) => shop?.email === popupInfo.email
  );
  console.log(filteredShops, "filteredShops");
  const dispatch = useDispatch();
  const router = useRouter();
  const handleShop = (shop: any) => {
    dispatch(setShopAction(shop));
    router.push("/vehiclevista-user/dashboard/inspectorDetails/shopDetails");
  };

  return (
    <div className="flex  min-h-screen ">
      <div className="bg-white rounded-lg  w-full p-6 ">
        <div className="flex justify-center mb-6 ">
          <img
            src={popupInfo.profilepic}
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "100%",
            }}
          />
        </div>
        <div className="w-[100%] flex justify-center">
          <div className="text-center flex items-baseline gap-1">
            <h2 className="text-xl font-bold text-gray-800">
              {popupInfo.firstName} {popupInfo.lastName}
            </h2>
            <p className="text-[14px]">(Inspector)</p>
          </div>
        </div>

        <div className="mt-6 border-y pt-6 pb-3">
          <h3 className="text-lg font-semibold text-gray-800 pb-2 mb-4">
            Contact
          </h3>
          <div className="mb-4">
            <p className="text-gray-700">
              <strong>Email:</strong> {popupInfo.email || "N/A"}
            </p>
            <p className="text-gray-700">
              <strong>Address:</strong> {popupInfo.address || "N/A"}
            </p>
          </div>
        </div>
        <div className="mt-6 border-b ">
          <h3 className="text-lg font-semibold text-gray-800 pb-2 mb-4">
            Shops
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-6 bg-gray-100 p-6">
            {filteredShops.length > 0 ? (
              filteredShops.map((shop: any) => (
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
        </div>
        <div className="flex justify-between mt-6">
          <Link
            href={"/vehiclevista-user/dashboard"}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
