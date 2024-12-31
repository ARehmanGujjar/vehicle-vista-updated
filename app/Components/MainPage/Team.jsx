import usamaImg from "@/app/public/mainPageimages/usama.jpg"
import usmanImg from "@/app/public/mainPageimages/usman.png"
import arehmanImg from "@/app/public/mainPageimages/arehman.png"
import Image from "next/image"

const Team = () => {
  return (
    <>
    <section className="text-gray-600 body-font">
  <div className="container px-5 py-16 mx-auto">
    <div className="flex flex-col text-center w-full mb-10">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Our Team</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base">We are passionate group of people who are finding their passion in solving society problems.</p>
    </div>
    <div className="flex flex-wrap -m-2">
      <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
          <Image alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={arehmanImg}/>
          <div className="flex-grow">
            <h2 className="text-gray-900 title-font font-medium">A Rehman </h2>
            <p className="text-gray-500">Software engineer</p>
          </div>
        </div>
      </div>
      <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
          <Image alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={usamaImg}/>
          <div className="flex-grow">
            <h2 className="text-gray-900 title-font font-medium">Usama Attique</h2>
            <p className="text-gray-500">Web Engineer</p>
          </div>
        </div>
      </div>
      <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
          <Image alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={usmanImg}/>
          <div className="flex-grow">
            <h2 className="text-gray-900 title-font font-medium">Usman Zafar</h2>
            <p className="text-gray-500">Mobile App Developer</p>
          </div>
        </div>
      </div>
     
        
    </div>
  </div>
</section>
    
    </>
  )
}

export default Team