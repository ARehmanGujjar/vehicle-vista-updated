"use client";
import React, { useState } from "react";
import Eye from "../../../images/PasswordEye.svg";
import back from "@/app/public/img/back_button.png"
import inspectorSignup from "../../public/img/inspectorSignup.jpg";
import { useFormik } from "formik";
import { FormValidation } from "../../Validation/FormValidation";
import axiosInstance from "@/app/lib/axiosInstance";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/FirebaseConfig";
import Image from "next/image";
import Link from "next/link";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  remember: false,
  address: "",
  profilePicture: "",
};

export default function Page() {
  const { push } = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: FormValidation,
      onSubmit: async (values) => {
        const formData = { ...values, profilepic: profilePicUrl };
        console.log(formData);
        try {
          setErrorMessage("");
          const response = await axiosInstance.post(
            "signupInspector",
            formData
          );
          if (response?.data?.authToken) {
            Cookies.set("insp_token", response?.data?.authToken);
            push("/vehiclevista-inspector/dashboard");
          }
        } catch (error: any) {
          console.error("Error submitting form:", error);
          if (error.response && error.response.data) {
            setErrorMessage(error.response.data.error || "An error occurred");
          } else {
            setErrorMessage("An error occurred. Please try again later.");
          }
        }
      },
    });

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfilePicFile(file);
    const storageRef = ref(storage, `VehicleVista/Inspectors/${Date.now()}`);

    try {
      // Upload the image to Firebase Storage
      await uploadBytes(storageRef, file);

      // Get the URL of the uploaded image
      const url = await getDownloadURL(storageRef);
      console.log(url);
      setProfilePicUrl(url); // Store the URL in state
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  };
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
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
  const handleRemoveProfilePic = () => {
    setProfilePicFile(null);
    setProfilePicUrl("");
  };

  return (
    <div className="Login w-[full] h-[100vh] sm:flex my-1">
      <Link href={"/"} className="absolute top-3 left-6 md:top-10  w-10 h-auto md:w-12 md:h-10 md:left-10 rounded-full bg-[#071952]">
      <Image
          className="w-auto h-auto m-auto"
          src={back}  width={20} height={20}     alt="back button"
        />
      </Link>
      <div className="left lg:w-[50%] w-auto h-auto">
        <Image
          className="lg:w-[100%] lg:h-[95vh] w-[100vw] h-auto rounded-lg m-1 bg-blue"
          src={"/mainPageimages/heroimganime.jpg"} width={150} height={150}     alt="signup page"
        />
      </div>
      <div className="right lg:w-[50%] font-Roboto">
        <form
          method="dialog"
          onSubmit={handleSubmit}
          className="container flex flex-col gap-1 sm:justify-center sm:px-10 py-1 px-2"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-dancing text-[#071952] mb-4">Sign Up</h1>

          <div className="error-message text-red-600 text-center">
            {errorMessage && <p>{errorMessage}</p>}
          </div>

          <div className="userInput flex flex-col gap-[12px]">
            <div className="flex items-center justify-between">
              <p className="text-[14px]">Profile Picture</p>
              {profilePicFile ? (
                <div className="relative w-[70px] h-[70px]">
                  <img
                    src={URL.createObjectURL(profilePicFile)}
                    alt="Profile Preview"
                    className="w-full h-full object-cover rounded-full"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveProfilePic}
                    className="absolute top-0 right-0  text-white rounded-full w-[20px] h-[20px] text-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="black"
                    >
                      <path
                        d="M18 6L6 18M6 6l12 12"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <input
                  type="file"
                  name="profilePicture"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-[80%] outline-none border-b-2 px-[8px] py-[4px] bg-[#F2F4F8] rounded-lg text-[14px]"
                />
              )}
            </div>

            {/* Other fields like first name, last name, email, password, etc. */}
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
                {errors.firstName && touched.firstName ? (
                  <p className="form-error text-red-600">{errors.firstName}</p>
                ) : null}
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
                {errors.lastName && touched.lastName ? (
                  <p className="form-error text-red-600">{errors.lastName}</p>
                ) : null}
              </div>
            </div>

            <div className="email">
              <p className="text-[14px]">Email Address</p>
              <input
                type="email"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                placeholder="Enter Email Here"
                className="w-[100%] outline-none p-2 border border-black rounded-lg bg-[#F2F4F8] sm:text-md text-sm"
              />
              {errors.email && touched.email ? (
                <p className="form-error text-red-600">{errors.email}</p>
              ) : null}
            </div>

            <div className="address">
              <p className="text-[14px]">Address</p>
              <input
                type="address"
                name="address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                placeholder="Enter Address Here"
                className="w-[100%] outline-none p-2 border border-black rounded-lg bg-[#F2F4F8] sm:text-md text-sm"
              />
              {errors.address && touched.address ? (
                <p className="form-error text-red-600">{errors.address}</p>
              ) : null}
            </div>

            <div>
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
                  className="w-[100%] outline-none py-[4px] bg-[#F2F4F8] text-[14px]"
                />
                <button onClick={(e) => handlePassword(e)}>
                  <img src={Eye.src} alt="" />
                </button>
              </div>
              {errors.password && touched.password ? (
                <p className="form-error text-red-600">{errors.password}</p>
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

          {/* <div className="flex items-center gap-4 md:flex md:flex-row flex-col ">
            <Button actiond={googleAction} img={Google.src}>
              Login with Google
            </Button>
            <Button actiond={appleAction} img={Apple.src}>
              Login with Apple
            </Button>
          </div> */}
        </form>
      </div>
    </div>
  );
}
