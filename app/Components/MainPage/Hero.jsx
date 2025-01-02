import Link from "next/link"
import Image from "next/image"
import HeroImg from "@/app/public/mainPageimages/heroImg.jpg"
const Hero = () => {
  return (
    <>
    <section className="text-gray-600 body-font">
  <div className="container mx-auto flex px-3 py-10 md:px-5 md:py-16 sm:py-24 md:flex-row flex-col items-center">
    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 className="title-font sm:text-4xl md:text-5xl text-3xl mb-4 font-dancing font-medium text-[#071952]">Car Inspection at
        <div className=" lg:block">Your Doorstep</div>
      </h1>
      <p className="mb-8 leading-relaxed"> VehicleVista is a solution your need of finding best and reliable car inspectors around you, We uses artificial intelligence to find best car mechanics for you, Happy Finding!</p>
      <div className="flex justify-center">
        <Link href='/vehiclevista-user'><button className="inline-flex hover:text-white text-[#071952]  py-1 px-3 outline outline-2 outline-[#071952] hover:bg-[#071952] rounded text-lg
        transition-transform duration-300 ease-in-out transform 
          hover:scale-105 hover:shadow-lg hover:shadow-[#071952]
        ">Book Now</button></Link>
      </div>
    </div>
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
      <Image className="object-cover object-center rounded" alt="hero" src={HeroImg} />
    </div>
  </div>
</section>
    </>
  )
}

export default Hero