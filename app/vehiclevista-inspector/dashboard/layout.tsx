"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
// import { Icons } from "@/constants/icons";
import { Nav, inspector } from "@/constants/navComponents";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import { useDispatch } from "react-redux";
import { Handlee } from "next/font/google";
import { Oval } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import AuthWrapper from "../lib/AuthWrapper";
import { setInspectorAction } from "@/app/lib/reducer/inspectorReducer";

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
        <div className="dasboardMain flex w-[100%]">
          <div className="dashBoardNav w-[15%] min-h-[100vh] border-2 pt-[20px] sticky">
            <div className="flex flex-col items-center gap-8 px-3">
              <h2 className="text-[28px] text-[#529DC7] font-bold w-[100%] pl-[10px]">
                Inspector Panel
              </h2>
              <div className="w-[100%] flex flex-col gap-6 pl-[10px]">
                {nav.map((item) => {
                  const Icon = item.Icon;
                  return (
                    <Link
                      key={item.id}
                      href={item.loc}
                      className="flex gap-2 items-center text-[#9198ad] hover:text-[#529DC7] focus:text-[#529DC7] focus:border-l-2 focus:border-[#529DC7] "
                    >
                      <Icon></Icon>

                      <p>{item.name}</p>
                      {/* {item.name == "Log Out" ? handleLogout() : ""} */}
                    </Link>
                  );
                })}
                <button onClick={() => deleteCookie()}>
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
                </button>
              </div>
            </div>
          </div>
          <div className="dashBoardData w-[85%]">{children}</div>
        </div>
        // </AuthWrapper>
      )}
    </>
  );
}
