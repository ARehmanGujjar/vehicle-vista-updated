import inspector1 from "@/app/public/mainPageimages/inspector1.png"
import inspector2 from "@/app/public/mainPageimages/inspector2.png"
import inspector3 from "@/app/public/mainPageimages/inspector4.jpg"
import rating from "@/app/public/mainPageimages/star.png"
import Link from "next/link"
import Image from "next/image";
const NearInspect = () => {
  return (
    <>
        <h1 className="text-3xl text-center">Inspectors of the Month</h1>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-16 mx-auto  ">
          <div className="flex flex-wrap -m-4">
            <div className="p-4 md:w-1/3">
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <Image
                  className="lg:h-40 sm:mt-5 md:h-36  w-1/2 object-cover object-center rounded-full m-auto"
                  alt="blog"
                  src={inspector1}
                />
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    Syed Bilal Shah{" "}
                  </h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                    Raza Tawakli Autos
                  </h1>
                  <p className="leading-relaxed mb-3">
                    We are serving to town for more than 20 years,having
                    expertise on engine maintainace{" "}
                  </p>
                  <Link href={"/vehiclevista-user"} className="flex items-center flex-wrap ">
                    <button className="bg-[#071952] text-white p-1 rounded-lg inline-flex items-center md:mb-2 lg:mb-0">
                      Book Now
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </button>
                    <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      1.2K
                    </span>
                    <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                      <Image
                        className="w-4 h-4 mr-1"
                        src={rating}

                        alt="rating"
                      ></Image>
                      4.7
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3">
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <Image
                  className="lg:h-40 sm:mt-5 md:h-36  w-1/2 object-cover object-center rounded-full m-auto"
                  alt="blog"
                  src={inspector3}

                />
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    Muhammad Hassan{" "}
                  </h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                    Hassan Auto Workshop
                  </h1>
                  <p className="leading-relaxed mb-3 line-clamp-3">
                    Premium Service, Available all over the Lahore, Engine specialist for Honda, Suzuki, Available to work
                  </p>
                  <Link href={"/vehiclevista-user"} className="flex items-center flex-wrap ">
                    <button className="bg-[#071952] text-white p-1 rounded-lg inline-flex items-center md:mb-2 lg:mb-0">
                      Book Now
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </button>
                    <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      1.2K
                    </span>
                    <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                      <Image
                        className="w-4 h-4 mr-1"
                        src={rating}

                        alt="rating"
                      ></Image>
                      4.7
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3">
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <Image
                  className="lg:h-40 sm:mt-5 md:h-36  w-1/2 object-cover object-center rounded-full m-auto"
                  src={inspector2}
                  alt="blog"
                />
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    Akmal ali
                  </h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                    A one Autos 
                  </h1>
                  <p className="leading-relaxed mb-3">
                    All Spare Parts available for all car brands like Suzuki, Honda, Custom car modification, plus Engine expert
                  </p>
                  <Link href={"/vehiclevista-user"} className="flex items-center flex-wrap ">
                    <button className="bg-[#071952] text-white p-1 rounded-lg inline-flex items-center md:mb-2 lg:mb-0">
                      Book Now
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </button>
                    <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      1.2K
                    </span>
                    <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                      <Image
                        className="w-4 h-4 mr-1"
                        src={rating}
                        alt="rating"
                      ></Image>
                      4.7
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
         
        </div>
        
        
      </section>
    </>
  );
};

export default NearInspect;
