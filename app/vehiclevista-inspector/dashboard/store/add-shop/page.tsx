"use client";
import React, { useState } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "@/FirebaseConfig";
import axiosInstance from "@/app/lib/axiosInstance";
import { useSelector } from "react-redux";

interface ImagePreview {
  file: File;
  preview: string;
  storageRef?: any;
}

const page = () => {
  const inspector = useSelector(
    (state: any) => state.inspector.inspectorDetails
  );
  console.log(inspector, "inspector");

  const [images, setImages] = useState<ImagePreview[]>([]);
  const [uploadedImages, setUploadedImages] = useState<
    {
      url: string;
      storageRef: any;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [shopName, setShopName] = useState("");
  const [address, setAddress] = useState(""); // Changed location to address
  const [about, setAbout] = useState(""); // About field

  const handleShopNameChange = (e: any) => {
    setShopName(e.target.value);
  };

  const handleAddressChange = (e: any) => {
    setAddress(e.target.value); // Updated function for address
  };

  const handleAboutChange = (e: any) => {
    setAbout(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const removeUploadedImage = async (index: number) => {
    const imageToDelete = uploadedImages[index];
    const storageRef = imageToDelete.storageRef;

    try {
      await deleteObject(storageRef);
      console.log("File deleted from Firebase");
      const newImages = uploadedImages.filter((_, i) => i !== index);
      setUploadedImages(newImages);
    } catch (error) {
      console.error("Error deleting image from Firebase", error);
    }
  };

  const uploadImages = async () => {
    if (!images.length) return;

    setLoading(true);
    try {
      const imageUrls: string[] = [];

      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const storageRef = ref(
          storage,
          `VehicleVista/Shop/${Date.now()}-${image.file.name}`
        );
        await uploadBytes(storageRef, image.file);
        const url = await getDownloadURL(storageRef);
        imageUrls.push(url);

        setUploadedImages((prevUrls) => [...prevUrls, { url, storageRef }]);
      }

      setImages([]);
      console.log("All images uploaded successfully");
      await saveShopDataToDatabase(imageUrls);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setLoading(false);
    }
  };

  const saveShopDataToDatabase = async (imageUrls: string[]) => {
    try {
      const response = await axiosInstance.post("postShop", {
        firstName: inspector.firstName,
        lastName: inspector.lastName,
        email: inspector.email,
        address: address, // Using address field here
        profilepic: inspector.profilepic,
        images: imageUrls,
        shopName: shopName,
        about: about,
      });

      if (response.status === 201) {
        console.log("Shop created successfully");
      } else {
        console.error("Failed to create shop");
      }
    } catch (error) {
      console.error("Error saving shop data to the database", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-5">
      {/* Shop Name Input */}
      <div className="flex gap-3 items-center mb-5">
        <h1 className="text-xl font-semibold text-gray-700 w-[30%]">
          Shop Name:
        </h1>
        <input
          type="text"
          value={shopName}
          onChange={handleShopNameChange}
          placeholder="Enter shop name"
          className="border border-gray-300 p-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg w-full"
        />
      </div>

      {/* Address Input */}
      <div className="flex gap-3 items-center mb-5">
        <h1 className="text-xl font-semibold text-gray-700 w-[30%]">
          Address:
        </h1>
        <input
          type="text"
          value={address} // Updated to use address
          onChange={handleAddressChange} // Updated handler for address
          placeholder="Enter shop address"
          className="border border-gray-300 p-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg w-full"
        />
      </div>

      {/* About Input */}
      <div className="flex gap-3 items-baseline mb-5">
        <h1 className="text-xl font-semibold text-gray-700 w-[30%]">
          About the Shop:
        </h1>
        <textarea
          value={about}
          onChange={handleAboutChange}
          placeholder="Enter a description about the shop"
          className="border border-gray-300 p-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg w-full h-32"
        />
      </div>

      {/* Image Upload */}
      <div className="flex items-center gap-3 mb-6">
        {/* Select Images Button */}
        <label className="bg-blue-500 text-white py-2 px-4 rounded-md shadow cursor-pointer hover:bg-blue-600 transition">
          {loading ? "Uploading..." : "Select Images"}
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            disabled={loading}
            className="hidden"
          />
        </label>

        {/* Upload Images Button */}
        {images.length > 0 && (
          <button
            onClick={uploadImages}
            disabled={loading}
            className="bg-green-500 text-white py-2 px-4 rounded-md shadow hover:bg-green-600 transition disabled:bg-gray-400"
          >
            {loading ? "Uploading..." : "Upload Images"}
          </button>
        )}
      </div>

      {/* Selected Image Previews */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative w-full h-40 rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={image.preview}
              alt={`Selected-${index}`}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
