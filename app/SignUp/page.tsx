"use client";
import React from "react";
import Eye from "../../images/PasswordEye.svg";
import Google from "../../images/Google.svg";
import Apple from "../../images/Apple.svg";
import Button from "../Button/Button";
import Link from "next/link";
import Leftimg from "../../images/Leftimg.jpg";
import { useState } from "react";
import { useFormik, Formik, Form, Field } from "formik";
import { FormValidation } from "../Validation/FormValidation";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axiosInstance from "../lib/axiosInstance";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "", 
  password: "",
  remember: false,
};

export default function SignUp() {
  const { push } = useRouter();
  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: FormValidation,
      onSubmit: async (values) => {
        try {
          console.log(values);

          const response = await axiosInstance.post("SignUp", values);
          console.log(response.data, "res");
          if (response?.data?.authToken) {
            console.log(response.data.authToken, "auth");
            Cookies.set("auth_token", response?.data?.authToken);
            push("/vehiclevista-user/dashboard");
          }
        } catch (error) {
          console.error("Error submitting form:", error);
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
      <div className="left sm:w-[50%]">
        <img
          className="sm:w-[100%] sm:h-[100vh] w-[100%] h-[30vh] bg-blue"
          src={Leftimg.src}
          alt=""
        />
      </div>
      <div className="right sm:w-[50%] font-Roboto">
        <form
          method="dialog"
          onSubmit={handleSubmit}
          className="container flex flex-col gap-[30px] sm:justify-center min-h-[100vh] sm:px-[40px]   px-[20px]"
        >
          <h1 className="SignUp text-lg sm:text-lg md:text-4xl text-center font-dancing text-[#071952]">Sign Up</h1>
          <div className="userInput flex flex-col gap-[12px]">
            <div className="flex justify-between ">
              <div className="w-[49%]">
                <p className="text-[14px]">First Name</p>
                <input
                  type="name"
                  name="firstName"
                  value={values.firstName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-[100%] outline-none p-2 border border-black rounded-lg bg-[#F2F4F8] sm:text-md text-sm"
                />
                <br />
                {errors.firstName && touched.firstName ? (
                  <p className="form-error text-red-600">{errors.firstName}</p>
                ) : null}
                <br />
              </div>
              <div className="w-[49%]">
                <p className="text-[14px]">Last Name</p>
                <input
                  type="name"
                  name="lastName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  placeholder="Last Name"
                  className="w-[100%] outline-none p-2 border border-black rounded-lg bg-[#F2F4F8] sm:text-md text-sm"
                />
                <br />
                {errors.lastName && touched.lastName ? (
                  <p className="form-error  text-red-600">{errors.lastName}</p>
                ) : null}
                <br />
              </div>
            </div>

            <div className="email ">
              <p className="text-[14px]">Email Address</p>
              <input
                type="email"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                placeholder="Enter Email Here"
                className=" w-[100%] outline-none p-2 border border-black rounded-lg bg-[#F2F4F8] sm:text-md text-sm"
              />
              <br />
              {errors.email && touched.email ? (
                <p className="form-error  text-red-600">{errors.email}</p>
              ) : null}
              <br />
            </div>
            <div className="">
              <p className="text-[14px]">Password</p>
              <div className="flex border border-black bg-[#F2F4F8] rounded-lg p-2">
                <input
                  type="password"
                  name="password"
                  id="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  placeholder="Enter Password Here"
                  className="w-[100%] outline-none  py-[4px] bg-[#F2F4F8] text-[14px]"
                />
                <button onClick={(e) => handlePassword(e)}>
                  <img src={Eye.src} alt="" />
                </button>
              </div>
              {errors.password && touched.password ? (
                <p className="form-error  text-red-600">{errors.password}</p>
              ) : null}
            </div>
            <div className="flex justify-between text-[14px]">
              <div className="flex align-center gap-[10px]">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  className="w-[20px]"
                  checked={values.remember == true}
                  onChange={handleChange}
                />
                <label htmlFor="Remember">Remember Me</label>
              </div>
            </div>
            <button
              className="w-[100%] bg-[#071952] hover:outline hover:outline-2 hover:outline-[#071952] rounded-lg text-white p-2 hover:bg-white hover:text-[#071952]"
              type="submit"
            >
              Sign Up
            </button>
          </div>
          <div className="flex items-center gap-1 md:flex md:flex-row flex-col ">
            <Button actiond={googleAction} img={Google.src}>
              Login with Google
            </Button>
            <Button actiond={appleAction} img={Apple.src}>
              Login with Apple
            </Button>
          </div>
          <div className="border-[1px]"></div>
          <p className="text-[14px]">
            Already have an account?{" "}
            <Link href="/" className="text-[#0F62FE]">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
