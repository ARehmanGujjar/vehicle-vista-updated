"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function Page() {
  // Get the shop data from Redux state
  const shop = useSelector((state: any) => state.user.shop);

  // Lightbox state
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openGoogleMaps = () => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      shop.address
    )}`;
    window.open(googleMapsUrl, "_blank", "noopener noreferrer");
  };

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col">
      {shop ? (
        <div className="w-full bg-white rounded-lg overflow-hidden flex flex-col h-full">
          <div className="p-6">
            {/* Shop Name and Map Button */}
            <div className="flex justify-between items-center">
              <h2 className="text-[24px] font-[700] text-gray-600 pb-6">
                {shop.shopName}
              </h2>
              <div
                className="w-[200px] h-[50px] flex items-center justify-center bg-blue-600 rounded-md text-white text-center cursor-pointer shadow-lg hover:bg-blue-700 transition duration-300"
                onClick={openGoogleMaps}
              >
                <div className="flex justify-center items-center gap-2">
                  <svg
                    width="23"
                    height="34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                  >
                    <path
                      d="M21.443 5.74C19.368 2.146 15.651 0 11.5 0S3.63 2.146 1.556 5.74c-2.075 3.594-2.075 7.886 0 11.481l8.916 15.44a1.186 1.186 0 0 0 2.057 0l8.915-15.44c2.075-3.593 2.075-7.886 0-11.48ZM11.5 17.3c-3.21 0-5.82-2.61-5.82-5.819s2.61-5.82 5.82-5.82c3.209 0 5.82 2.611 5.82 5.82 0 3.21-2.611 5.82-5.82 5.82Z"
                      fill="#ffffff"
                    ></path>
                  </svg>
                  <span className="text-lg font-medium">Find us on Maps</span>
                </div>
              </div>
            </div>

            {/* Shop Details */}
            <p className="text-gray-600 pb-4">
              <strong>Owner:</strong> {`${shop.firstName} ${shop.lastName}`}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Address:</strong> {shop.address}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>About:</strong> {shop.about}
            </p>
          </div>

          {/* Scroll Area for Images */}
          {shop.images && shop.images.length > 0 && (
            <ScrollArea className="flex-grow">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6">
                {shop.images.map((image: string, index: number) => (
                  <div
                    key={index}
                    className="w-full h-48 cursor-pointer"
                    onClick={() => openLightbox(index)}
                  >
                    <img
                      src={image}
                      alt={`Shop Image ${index + 1}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      ) : (
        <p className="text-xl text-gray-700">No shop data available.</p>
      )}

      {/* Lightbox Component */}
      {isLightboxOpen && shop.images && (
        <Lightbox
          open={isLightboxOpen}
          close={() => setIsLightboxOpen(false)}
          slides={shop.images.map((image: string) => ({ src: image }))}
          index={currentImageIndex}
          // onIndexChange={setCurrentImageIndex}
        />
      )}
    </div>
  );
}
