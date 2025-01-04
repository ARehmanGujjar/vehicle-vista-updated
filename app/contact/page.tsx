import Image from "next/image";
import Link from "next/link";
import profilePhoto from "@/app/public/logoImages/appLogo.png";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
const Contact = () => {
  return (
    <>
    <Header/>
      <div className="my-5 mt-10 md:mt-20 rounded-lg dark:bg-secondary ">
        <section className="  relative py-10 bg-[#0C195D] rounded-lg  h-[300px] bg-no-repeat bg-cover bg-center ">
          <div className="absolute w-full bottom-0 mx-auto px-4">
            <div className="  container mx-auto ">
              <div className=" grid lg:grid-cols-3  lge:grid-cols-3 md:grid-cols-1 mdsm:grid-cols-1 sm:grid-cols-1 ">
                <div className=" col-span-2 relative ">
                  <div className=" absolute bottom-0 py-10">
                    <h3 className=" text-[#c7b130]  relative after:bg-[#fff] after:w-[10%] text-4xl font-semibold   pb-4">
                      Contact Us
                    </h3>
                    <h4 className=" text-[#fff]  text-[20px] ">
                      Looking for more information? Contact us, on WhatsApp for
                      real-time help directly with our representative.
                    </h4>
                    <Link
                      href={"https://wa.me/3218122180"}
                      target="_blank"
                      className=" border-2 my-2 inline-block w-auto m-auto border-green-500 rounded-md py-1 px-2 text-green-500 hover:bg-green-500 hover:text-white"
                    >
                      Whatsapp
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer/>
      
    </>
  );
};

export default Contact;
