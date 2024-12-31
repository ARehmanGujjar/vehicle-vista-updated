"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Eye from "../../images/PasswordEye.svg";
import Google from "../../images/Google.svg";
import Apple from "../../images/Apple.svg";
import Leftimg from "../../images/Leftimg.jpg";
import inspectorSignup from "../public/img/inspectorSignup.jpg";

import Button from "../Button/Button";
import { useFormik, Formik, Form, Field } from "formik";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const initialValues = {
  email: "",
  password: "",
};

import { Oval } from "react-loader-spinner";
import { LognFormValidation } from "../Validation/FormValidation";
import { useDispatch } from "react-redux";
// import { setInspectorAction } from "../lib/reducer/userReducer";
import axiosInstance from "../lib/axiosInstance";
export default function Home() {
  const [authenticationError, setAuthenticationError] = useState("");
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const { push } = useRouter();
  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: LognFormValidation,
      onSubmit: async (values) => {
        console.log(initialValues);
        try {
          console.log(values);
          push("/vehiclevista-inspector/dashboard");
        } catch (error: any) {}
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
          <div className="left sm:w-[50%]">
            <img
              className="sm:w-[100%] sm:h-[100vh] w-[100%] h-[30vh] "
              src={inspectorSignup.src}
              alt=""
            />
          </div>
          <div className="right sm:w-[50%] font-Roboto">
            <form
              className="container flex flex-col gap-[30px] sm:justify-center min-h-[100vh] sm:px-[40px]   px-[20px]"
              method="diaolog"
              onSubmit={handleSubmit}
            >
              <h1 className=" font-bold text-[42px]">Log In</h1>
              <div className="userInput flex flex-col gap-[12px]">
                <div className="email ">
                  <p className="text-[14px]">Email Address</p>
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
                  <p className="text-[14px]">Password</p>
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
                    It must be a combination of minimum 8 letters, numbers, and
                    symbols.
                  </p>
                </div>
                <div className="flex justify-between text-[14px]">
                  <div className="flex align-center gap-[10px]">
                    <input type="checkbox" id="Remember" className="w-[20px]" />
                    <label htmlFor="Remember">Remember Me</label>
                  </div>
                  <a href="">Forgot Password?</a>
                </div>
                {authenticationError && (
                  <p className="text-red-600">{authenticationError}</p>
                )}
                <button
                  className="w-[100%] bg-[#0F62FE] text-white p-[10px]"
                  type="submit"
                >
                  Log In
                </button>
              </div>
              <div className="flex items-center gap-4 md:flex md:flex-row flex-col ">
                <Button actiond={googleAction} img={Google.src}>
                  Login with Google
                </Button>
                <Button actiond={appleAction} img={Apple.src}>
                  Login with Apple
                </Button>
              </div>
              <div className="border-[1px]"></div>
              <p className="text-[14px]">
                No account yet?{" "}
                <Link
                  href="/vehiclevista-inspector/SignUp"
                  className="text-[#0F62FE]"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
