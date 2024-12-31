import Footer from "../Components/Footer";
import Header from "../Components/Header";

const page = () => {
  return (
    <>
      <Header />
      <div className="w-2/3 text-center p-6 m-auto">
        <h1 className="text-5xl mb-5">About Us</h1>
        <p className="text-lg">
          In daily life, finding car best inspectors is one of the biggest
          problem, If in case some apps,try to provides car inspections service
          then having just their own team or offering their own price tag,
          without any negotiation. VehicleVista is a web-based and mobile app to
          solve user’s such need of finding nearest car inspectors around him,
          it uses artificial intelligence to find best car mechanics on basis of
          user’s preference like price, distance, reviews etc.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default page;
