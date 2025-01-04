import Footer from "@/app/Components/Footer"
import Header from "@/app/Components/Header"

const Policy = () => {
  return (
    <>
    <Header/>
    <h1 className="text-center m-2 my-5 mt-10 md:mt-20 p-1 text-2xl md:text-3xl rounded-full bg-[#0C195D] text-white w-auto">Privacy Policy</h1>
    <p className="text-center my-2 mx-5 md:mx-20 text-m sm:text-lg">
    We are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you use our web application to find car inspectors. By using our application, you consent to the data practices described in this policy.
    </p>
    <h2 className="text-center m-2 p-1 text-xl md:text-2xl underline">Changes to Privacy Policy</h2>
    <p className="text-center my-2 mx-5 md:mx-20 text-m sm:text-lg">
    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the effective date at the top. You are advised to review this Privacy Policy periodically for any changes.
    </p>
    <Footer/>
    </>
  )
}

export default Policy