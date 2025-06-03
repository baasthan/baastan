import Image from "next/image";
import AboutUsHero1 from "../../public/about-us-hero1.png";
import AboutUsSecion1 from "../../public/about-us-section1.png";
function AboutUsPage() {
  return (
    <>
      <div className="relative w-full max-h-svh overflow-y-hidden">
        <Image
          src={AboutUsHero1}
          alt="The place you can trust"
          className="w-full h-auto"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/80 to-black/50" />
        <div className="absolute inset-0 flex flex-col lg:max-w-1/4 justify-center text-white p-4 gap-2">
          <h1 className=" text-4xl font-semibold ">
            Beautiful homes made for you
          </h1>
          <p> Where every detail is crafted to make you feel truly at home.</p>
        </div>
      </div>
      <div className="relative flex flex-col lg:flex-row gap-10 py-20 px-4 w-full">
        <Image
          src={AboutUsSecion1}
          alt=""
          className="flex-1 rounded-2xl shadow-2xl aspect-square object-cover"
        />
        <div className="flex flex-col flex-1 justify-center">
          <div className="lg:max-w-1/2">
            <h1 className="text-4xl font-semibold">You're in good hands</h1>
            <p className="mt-4 text-lg text-gray-600">
              Our team of experts ensures a seamless journey from selection to
              settling in.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUsPage;
