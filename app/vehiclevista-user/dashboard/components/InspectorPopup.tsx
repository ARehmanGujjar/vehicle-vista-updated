import React from "react";
import profilePlaceholder from "../../../public/img/profilePlaceholder.png";
import Link from "next/link";
export default function InspectorPopup({ popupInfo }: any) {
  console.log(popupInfo, "pp");

  // const profilePicSrc = popupInfo.profilepic || profilePlaceholder;

  return (
    <div>
      <div className="py-4">
        <img
          src={popupInfo.profilepic}
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
            borderRadius: "100%",
          }} // Add objectFit to prevent distortion
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/100"; // Fallback image if the URL fails
          }}
        />
      </div>
      <p>
        <strong>Name:</strong> {popupInfo.firstName} {popupInfo.lastName}
      </p>
      <p>
        <strong>Email:</strong> {popupInfo.email}
      </p>

      <Link
        href={`/vehiclevista-user/dashboard/inspectorDetails?popupInfo=${encodeURIComponent(
          JSON.stringify(popupInfo)
        )}`}
        className="mt-4 block text-center bg-[#529dc7] text-white py-2 px-4 rounded"
      >
        More About This Inspector
      </Link>
    </div>
  );
}
