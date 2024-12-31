"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Eye from "../../images/PasswordEye.svg";
import Google from "../../images/Google.svg";
import Apple from "../../images/Apple.svg";
import Leftimg from "../../images/Leftimg.jpg";
import { useFormik, Formik, Form, Field } from "formik";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const initialValues = {
  email: "",
  password: "",
};

import { Oval } from "react-loader-spinner";
import Button from "@/app/Button/Button";
import { LognFormValidation } from "@/app/Validation/FormValidation";
export default function Home() {
  const [authenticationError, setAuthenticationError] = useState("");
  const [loader, setLoader] = useState(false);

  const { push } = useRouter();
  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: LognFormValidation,
      onSubmit: async (values) => {
        console.log(initialValues);
        try {
          console.log(values);
          setLoader(true);
          const response = await axios.post(
            "http://localhost:5000/api/v1/adminLogin",
            values
          );
          // setLoader(true);
          // Cookies.remove();
          if (response?.data?.token) {
            Cookies.set("auth_token", response?.data?.token, {
              expires: 1,
            });
            push("/vehiclevista-admin");
          }
          console.log("resdata", response.data);
        } catch (error: any) {
          console.error("Error submitting form:", error);
          console.error("Error submitting form:", error.response.data);
          setAuthenticationError(error.response.data.error);
          setLoader(false);
        }
      },
    });

  function googleAction() {
    console.log("google");
  }
  function appleAction() {
    console.log("apple");
  }

  function handlePassword(e: any) {
    e.preventDefault();

    const passwordInput = document.getElementById(
      "password"
    ) as HTMLInputElement;

    if (passwordInput) {
      passwordInput.type =
        passwordInput.type === "password" ? "text" : "password";
    }
  }

  return (
    <div className="Login w-[full]  h-[100vh] sm:flex">
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
        <>
          <div className="flex justify-center items-center w-[100%]">
            <div className="sm:w-[40%] font-Roboto">
              <form
                className="container flex flex-col gap-[40px] sm:justify-center min-h-[100vh] sm:px-[40px]   px-[20px]"
                method="diaolog"
                onSubmit={handleSubmit}
              >
                <h1 className=" font-bold text-[42px] flex justify-center">
                  Log In
                </h1>
                <div className="userInput flex flex-col gap-[22px]">
                  <div className="email ">
                    <p className="text-[14px] pb-[10px]">Email Address</p>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Email Here"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      className=" w-[100%]  outline-none border-b-2  px-[8px] py-[4px] bg-[#F2F4F8] text-[14px]"
                    />
                    <br />
                    {errors.email && touched.email ? (
                      <p className="form-error  text-red-600">{errors.email}</p>
                    ) : null}
                    <br />
                  </div>
                  <div className="">
                    <p className="text-[14px] pb-[10px]">Password</p>
                    <div className="flex  border-b-2 bg-[#F2F4F8] px-[8px]">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.password}
                        placeholder="Enter Password Here"
                        className="w-[100%] outline-none  py-[4px] bg-[#F2F4F8] text-[14px]"
                      />

                      <button type="button" onClick={(e) => handlePassword(e)}>
                        <img src={Eye.src} alt="" />
                      </button>
                    </div>
                    {errors.password && touched.password ? (
                      <p className="form-error  text-red-600">
                        {errors.password}
                      </p>
                    ) : null}

                    <p className="text-[12px] text-[#697077] pt-[4px]">
                      It must be a combination of minimum 8 letters, numbers,
                      and symbols.
                    </p>
                  </div>

                  {authenticationError && (
                    <p className="text-red-600">{authenticationError}</p>
                  )}
                  <button
                    className="w-[100%] bg-[#0F62FE] text-white p-[10px] mt-[20px] rounded-lg"
                    type="submit"
                  >
                    Log In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
