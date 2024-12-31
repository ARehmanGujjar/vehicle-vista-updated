import Hero from "@/app/Components/MainPage/Hero";
import NearInspect from "@/app/Components/MainPage/NearInspect";
import Team from "@/app/Components/MainPage/Team";
import Contactform from "@/app/Components/MainPage/Contactform";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import React from "react";
export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <NearInspect />
      <Team />
      <Contactform />
      <Footer />
    </>
  );
}
