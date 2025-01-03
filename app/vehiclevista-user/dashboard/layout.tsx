"use client";
import AuthWrapper from "@/components/AuthWrapper";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Nav } from "@/constants/navComponents";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { Handlee } from "next/font/google";
import { Oval } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import { setUserAction } from "@/app/lib/reducer/userReducer";

export default function layout({ children }: { children: React.ReactNode }) {
  const nav = Nav;
  const [cookieValue, setCookieValue] = useState("");
  const [decoded, setDecoded] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const [loader, setLoader] = useState(false);

  // useEffect(() => {
  //   const authToken: any = Cookies.get("auth_token");

  //   if (!authToken) {
  //     setLoader(true);
  //     router.push("/vehiclevista-user");
  //     return;
  //   }
  //   setCookieValue(authToken);

  //   const decodedToken: any = jwtDecode(authToken);
  //   setDecoded(decodedToken);
  //   console.log(decodedToken);
  //   console.log("decoded", decodedToken?.user?.email);
  //   dispatch(setUserAction(decodedToken?.user?.email));
  // }, [dispatch, router]);

  function deleteCookie() {
    Cookies.remove("auth_token");
    router.push("/vehiclevista-user");
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
        <div className="dasboardMain flex w-full h-screen">
          {/* Left Sidebar */}
          <div className="dashBoardNav w-[25%] min-h-screen border-2 m-1  pt-2 sticky top-0 rounded-lg">
            <div className="flex flex-col items-center gap-8 px-3">
              <h2 className="text-lg sm:text-lg md:text-4xl text-center font-dancing text-[#071952] mb-4">
                User Panel
              </h2>
              <div className="w-[100%] flex flex-col gap-6 pl-[10px]">
                {nav.map((item) => {
                  const Icon = item.Icon;
                  return (
                    <Link
                      key={item.id}
                      href={item.loc}
                      className="flex gap-2 items-center text-gray-500 rounded-lg border-gray-200 border hover:text-[#071952] hover:border-[#071952] focus:text-white focus:border-l-2 focus:rounded-lg focus: p-1 focus:bg-[#071952] focus:border-[#071952]"
                    >
                      <Icon></Icon>
                      <p>{item.name}</p>
                    </Link>
                  );
                })}
                <button className="flex justify-center items-center gap-2 hover:bg-[#071952] rounded-lg p-1 hover:text-white" onClick={() => deleteCookie()}>
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

          {/* Right Content Area with Scroll */}
          <div className="dashBoardData w-[75%] overflow-y-auto">
            {children}
          </div>
        </div>
        // </AuthWrapper>
      )}
    </>
  );
}
