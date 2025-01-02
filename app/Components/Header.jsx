import Link from "next/link";
import Image from "next/image";
import Logo from "@/app/public/logoImages/appLogo.png";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  return (
    <>
      <header className="text-gray-600 z-10 body-font flex justify-between items-center  rounded-md shadow-md ">
        <div className="flex md:hidden">
          <Sheet>
          <SheetTrigger><Image width={35} height={35} src={"/hamburger.svg"} alt="hamburger" /></SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle><Link
            href="/"
            className="flex flex-col title-font font-medium items-center text-gray-900 sm:mb-4 md:mb-0"
          >
            <Image width={100} height={100} src={Logo} alt="logo" />
            <span className=" font-exo text-xl text-[#071952]">
              VehicleVista
            </span>
          </Link></SheetTitle>
              <SheetDescription>
              <nav className="md:ml-auto py-10 md:mr-auto sm:flex flex-col flex-wrap items-center flex text-base justify-center">
            <Link href={"/"} className="mr-5 m-2 hover:text-gray-900">
              Home
            </Link>
            <Link href={"/about"} className="mr-5 m-2 hover:text-gray-900">
              About
            </Link>
            <a className="mr-5 m-2 hover:text-gray-900">Contact Us</a>
            <a className="mr-5 m-2 hover:text-gray-900">Services</a>
          </nav>
          <div className="justify-center items-center gap-2 md:flex">
          <Link href={"/vehiclevista-user"}>
              <button className="inline-flex m-2 items-center outline outline-2 outline-[#071952] hover:bg-[#071952] border-0 py-1 px-3 focus:outline-none hover:text-white rounded text-[#071952] text-base sm:mt-4 md:mt-0">
                Continue as User
              </button>
            </Link>
            <Link href={"/vehiclevista-inspector"}>
              <button className=" sm:ml-2 m-2  text-[#071952]  sm:inline-flex outline outline-2 outline-[#071952] items-center hover:text-white hover:bg-[#071952] border-0 py-1 px-3 focus:outline-none  rounded text-base sm:mt-4 md:mt-0">
                Continue as Inspector
              </button>
            </Link>
          </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        </div>
        <div className="container mx-auto flex flex-wrap p-1 sm:p-5 justify-end sm:justify-center md:flex-row items-center">
          <Link
            href="/"
            className="flex title-font font-medium items-center text-gray-900 sm:mb-4 md:mb-0"
          >
            <Image width={100} height={100} className="w-16 h-16 md:w-100 md:h-100" src={Logo} alt="logo" />
            <span className=" font-exo text-md md:text-xl text-[#071952]">
              VehicleVista
            </span>
          </Link>
          <nav className="md:ml-auto md:mr-auto sm:flex flex-wrap items-center hidden  text-base justify-center">
            <Link href={"/"} className="mr-5 hover:text-gray-900">
              Home
            </Link>
            <Link href={"/about"} className="mr-5 hover:text-gray-900">
              About
            </Link>
            <a className="mr-5 hover:text-gray-900">Contact Us</a>
            <a className="mr-5 hover:text-gray-900">Services</a>
          </nav>
          <div className="justify-center items-center gap-2 hidden md:flex">
            <Link href={"/vehiclevista-user"}>
              <button className="inline-flex items-center outline outline-2 outline-[#071952] hover:bg-[#071952] border-0 py-1 px-3 focus:outline-none hover:text-white rounded text-[#071952] text-base sm:mt-4 md:mt-0">
                Continue as User
              </button>
            </Link>
            <Link href={"/vehiclevista-inspector"}>
              <button className=" sm:ml-2  text-[#071952]  hidden sm:inline-flex outline outline-2 outline-[#071952] items-center hover:text-white hover:bg-[#071952] border-0 py-1 px-3 focus:outline-none  rounded text-base sm:mt-4 md:mt-0">
                Continue as Inspector
              </button>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
