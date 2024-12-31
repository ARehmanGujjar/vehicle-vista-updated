"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Eye from "../../images/PasswordEye.svg";
import Google from "../../images/Google.svg";
import Apple from "../../images/Apple.svg";
import Button from "../Button/Button";
import { useFormik, Formik, Form, Field } from "formik";
import { useRouter } from "next/navigation";

const initialValues = {
  email: "",
  password: "",
};

import { Oval } from "react-loader-spinner";
import { LognFormValidation } from "../Validation/FormValidation";
// import axiosInstance from "../lib/axiosInstance";
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
          // setLoader(true);
          // Cookies.remove();

          push("/vehiclevista-user/dashboard");
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
    <div className="Login w-[full]   min-h-screen sm:flex">
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
        <div className="m-auto border shadow-lg border-black rounded-lg font-poppins mt-5">

          <div className="img m-auto">
            <Image
              className="w-44 sm:w-56 sm:h-50 m-auto"
              src={"/logoImages/appLogo.png"}
              alt=""
              width={100}
              height={100}
            />
          </div>
          <div className="right m-auto font-poppins">
            <form
              className="container flex flex-col gap-1 sm:justify-center sm:px-10 py-1 px-2"
              method="diaolog"
              onSubmit={handleSubmit}
              >
              <h1 className="SignIn text-lg sm:text-lg md:text-4xl text-center font-dancing text-[#071952]">Welcome Back!</h1>
              <div className="userInput flex flex-col gap-2">
                <div className="email ">
                  <p className="text-sm md:text-lg font-poppins">email address</p>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    className=" w-[100%] outline-none p-2 border border-black rounded-lg bg-[#F2F4F8] sm:text-md text-sm"
                  />
                  <br />
                  {errors.email && touched.email ? (
                    <p className="form-error  text-red-600">{errors.email}</p>
                  ) : null}
                  <br />
                </div>
                <div className="">
                  <p className="text-sm md:text-lg">password</p>
                  <div className="flex border border-black bg-[#F2F4F8] rounded-lg p-2">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      placeholder="Enter Password Here"
                      className="w-[100%] outline-none bg-[#F2F4F8] sm:text-md text-sm"
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
                  className="w-[100%] bg-[#071952] hover:outline hover:outline-2 hover:outline-[#071952] rounded-lg text-white p-2 hover:bg-white hover:text-[#071952]"
                  type="submit"
                  >
                  Log In
                </button>
              </div>
              <div className="flex items-center justify-center gap-1 md:flex md:flex-row flex-col ">
                <Button actiond={googleAction} img={Google.src} className="rounded-lg flex justify-center items-center">
                 <span className="text-sm md:text-md">Login with Google</span> 
                </Button>
                <Button actiond={appleAction} img={Apple.src} className="bg-red-500">
                  <span className="text-sm md:text-md">Login with Apple</span>
                </Button>
              </div>
              <div className="border-[1px]"></div>
              <p className="text-[14px] text-center">
                No account yet?{" "}
                <Link href="/SignUp" className="text-[#071952] underline">
                  Sign up
                </Link>
              </p>
              <p className="text-[14px] text-center">
                Back to {" "}
                <Link href="/" className="text-[#071952] underline">
                  Home
                </Link>
              </p>
            </form>
          </div>
      </div>
        </>
      )}
    </div>
  );
}
