"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
// import { Icons } from "@/constants/icons";
import { Nav, inspector } from "@/constants/navComponents";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logo from "@/app/public/logoImages/appLogo.png";

import { useDispatch } from "react-redux";
import { Handlee } from "next/font/google";
import { Oval } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import AuthWrapper from "../lib/AuthWrapper";
import { setInspectorAction } from "@/app/lib/reducer/inspectorReducer";
import Image from "next/image";

export default function layout({ children }: { children: React.ReactNode }) {
  const nav = inspector;
  const [cookieValue, setCookieValue] = useState("");
  const [decoded, setDecoded] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const [loader, setLoader] = useState(false);

  // useEffect(() => {
  //   const authToken: any = Cookies.get("insp_token");

  //   if (!authToken) {
  //     setLoader(true);
  //     router.push("/vehiclevista-inspector");
  //     return;
  //   }
  //   setCookieValue(authToken);

  //   const decodedToken: any = jwtDecode(authToken);
  //   setDecoded(decodedToken);
  //   dispatch(setInspectorAction(decodedToken.inspector));
  // }, [dispatch, router]);

  function deleteCookie() {
    Cookies.remove("insp_token");
    router.push("/vehiclevista-inspector");
  }

  return (
    <>
      {loader ? (
        <div className="transition duration-3000 flex justify-center items-center w-full h-full">
          <Oval
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        // <AuthWrapper>

        <div className="dasboardMain w-[100%] flex ">
          <div className="flex justify-start items-start md:hidden">
          <Sheet>
          <SheetTrigger><Image width={35} height={35} src={"/hamburger.svg"} alt="hamburger" /></SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle><Link
            href="/"
            className="flex flex-col title-font font-medium items-center text-gray-900 sm:mb-4 md:mb-0"
          >
            <Image width={100} height={100} src={Logo} alt="logo" />
            <span className=" font-exo text-xl text-[#071952]">
              VehicleVista
            </span>
          </Link></SheetTitle>
              <SheetDescription>
              <div className="flex flex-col items-center gap-8 px-3">
              <h2 className="text-lg sm:text-lg md:text-4xl text-center font-dancing text-[#071952] mb-4">
                Inspector Panel
              </h2>
              <div className="w-[100%] flex flex-col gap-6 pl-[10px]">
                {nav.map((item) => {
                  const Icon = item.Icon;
                  return (
                    <Link
                      key={item.id}
                      href={item.loc}
                      className="flex gap-2 items-center text-gray-500 rounded-lg border-gray-200 border hover:text-[#071952] hover:border-[#071952] focus:text-white focus:border-l-2 focus:rounded-lg focus: p-1 focus:bg-[#071952] focus:border-[#071952] "
                    >
                      <Icon></Icon>

                      <p>{item.name}</p>
                      {/* {item.name == "Log Out" ? handleLogout() : ""} */}
                    </Link>
                  );
                })}
                <button className="flex justify-start items-center gap-2 hover:bg-red-600 rounded-lg p-1 hover:text-white" onClick={() => deleteCookie()}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-log-in ml-3 size-5"
                  >
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                    <polyline points="10 17 15 12 10 7"></polyline>
                    <line x1="15" x2="3" y1="12" y2="12"></line>
                  </svg>
                  <p>Logout</p> 
                </button>
              </div>
            </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        </div>
          <div className="dashBoardNav w-[25%] min-h-[100vh] hidden md:block rounded-lg m-1 border-2 pt-2 sticky">
            <div className="img m-auto">
                        <Image
                          className="w-24 sm:w-24  sm:h-24 m-auto"
                          src={"/logoImages/appLogo.png"}
                          alt=""
                          width={100}
                          height={100}
                        />
                      </div>
            <div className="flex flex-col items-center md:gap-2 gap-2 px-3">
              <h2 className="text-lg sm:text-lg md:text-4xl text-center font-dancing text-[#071952] mb-4">
                Inspector Panel
              </h2>
              <div className="w-[100%] flex flex-col gap-6 pl-[10px]">
                {nav.map((item) => {
                  const Icon = item.Icon;
                  return (
                    <Link
                      key={item.id}
                      href={item.loc}
                      className="flex gap-2 items-center text-gray-500 rounded-lg border-gray-200 border hover:text-[#071952] hover:border-[#071952] focus:text-white focus:border-l-2 focus:rounded-lg focus: p-1 focus:bg-[#071952] focus:border-[#071952] "
                    >
                      <Icon></Icon>

                      <p>{item.name}</p>
                      {/* {item.name == "Log Out" ? handleLogout() : ""} */}
                    </Link>
                  );
                })}
                <button className="flex justify-start items-center gap-2 hover:bg-red-600 rounded-lg p-1 hover:text-white" onClick={() => deleteCookie()}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-log-in ml-3 size-5"
                  >
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                    <polyline points="10 17 15 12 10 7"></polyline>
                    <line x1="15" x2="3" y1="12" y2="12"></line>
                  </svg>
                  <p>Logout</p> 
                </button>
              </div>
            </div>
          </div>
          <div className="dashBoardData z-0 w-[85%]">{children}</div>
        </div>
        // </AuthWrapper>
      )}
    </>
  );
}
