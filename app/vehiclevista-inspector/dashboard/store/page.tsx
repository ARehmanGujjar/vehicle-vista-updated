import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="flex items-center justify-center h-[100vh] gap-5">
      <Link
        href={"/vehiclevista-inspector/dashboard/store/add-shop"}
        className="px-[50px]  rounded-lg py-[15px] transition hover:bg-[#f07b45]  text-white font-[500] shadow-md bg-[#E08358]"
      >
        Add
      </Link>
      <Link
        href={"/vehiclevista-inspector/dashboard/store/shops"}
        className="px-[50px] rounded-lg  py-[15px] text-white transition hover:bg-[#16171d] font-[500] shadow-md bg-[#222530]"
      >
        View Existing
      </Link>
    </div>
  );
}
