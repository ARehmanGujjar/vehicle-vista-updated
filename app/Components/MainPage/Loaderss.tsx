import Image from "next/image"
import Logo from "@/app/public/logoImages/appLogo.png";

function Loader() {
  return (
    <>
    <div className="relative h-[90vh] flex justify-center items-center">
    <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#071952]"></div>
    <Image alt="loader" width={100} height={100} src={Logo}  className="rounded-full h-20 w-20"/>
</div>
    </>
  )
}

export default Loader