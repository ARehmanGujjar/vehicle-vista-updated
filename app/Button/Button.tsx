"use client";
import React from "react";

function Button({ actiond, img, children }: any) {
  return (
    <button
      onClick={(e) => {
        if (actiond) {
          actiond();
        }
      }}
      className="flex justify-center gap-1 w-full hover:bg-[#071952] hover:text-white items-center rounded-lg  py-1 border-2 border-[#071952] lg:px-2 "
    >
      {img ? <img src={img} alt="" /> : ""}
      <p className="xl:px-4 lg:px-2">{children}</p>
    </button>
  );
}

export default Button;
