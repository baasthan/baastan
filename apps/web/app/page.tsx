import Amenities from "@/components/amenities";
import HomeHero1 from "@/components/home-hero-1";
import HomeHero2 from "@/components/home-hero-2";
import WhyBaasthan from "@/components/why-baasthan";

export default function Page() {
  return (
    <div className="flex flex-col">
      <HomeHero1 />
      <div className="flex flex-col gap-10">
        <WhyBaasthan />
        <HomeHero2 />
        <Amenities />
      </div>
      {/* Amenities Card - Bottom Right */}

      {/* Why Baasthan - Bottom Left */}
      {/* <div className="fixed bottom-6 left-6 w-80 p-6 bg-white border border-black rounded-lg shadow-md z-50 transition-transform duration-700 ease-out hover:-translate-y-1 hover:shadow-lg">
        <h2 className="text-2xl font-bold text-black mb-2 flex items-center gap-2">
          Why Baasthan? <span className="text-2xl">❓</span>
        </h2>
        <p className="text-sm text-black leading-relaxed">
          Baasthan is a trustworthy PG service that ensures safety, comfort, and
          reliability for all its residents. We keep your peace of mind as our
          top priority.
        </p>
      </div> */}
    </div>
  );
}
