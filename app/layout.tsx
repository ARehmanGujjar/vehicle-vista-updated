import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/app/Components/Header";
import Footer from "@/app/Components/Footer";
import { Provider } from "react-redux";
import StoreProvider from "./lib/StoreProvider";
import NextTopLoader from "nextjs-toploader";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Add the Google Fonts link here */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap"
    rel="stylesheet"
  />
       
        
      </head>
      <body className="max-w-[90%] m-auto font-poppins">
        <StoreProvider>
          <NextTopLoader />
          {/* <Header /> */}
          {children}
          {/* <Footer /> */}
        </StoreProvider>
      </body>
    </html>
  );
}
