import { Metadata } from "next";
import Image from "next/image";
import DigitalHome from "../../public/digital-home.svg";
import ListHome from "../../public/list-home.svg";
import SmartHome from "../../public/smart-home-platform.svg";

export const metadata: Metadata = {
  title: "About Us",
};

function About() {
  return (
    <div className="relative flex flex-col items-center gap-y-10 p-2">
      <h1 className="text-4xl font-bold capitalize">About Us</h1>
      <div className="md:max-w-lg flex flex-row flex-row-reverse items-center">
        <p className="leading-7 [&:not(:first-child)]:mt-6 text-right">
          Baasthan is a smart digital housing platform designed to help students
          and working professionals find affordable and verified PGs and rental
          accomodations with ease.
        </p>
        <Image
          src={SmartHome}
          className="w-1/3 mx-10"
          alt="smart digital housing"
        />
      </div>
      <div className="md:max-w-lg flex flex-row flex-row items-center">
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          With zero brokerage and no hidden fees, Baasthan simplifies the
          process of finding a place you can call home. Through out
          user-friendly app , users can browse, compare and book accomodations
          in just a few clicks - all with complete transparancy
        </p>
        <Image
          src={DigitalHome}
          alt="Digital Marketplace"
          className="w-1/3 mx-10"
        />
      </div>
      <div className="md:max-w-lg flex flex-row-reverse items-center">
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          At the same time, Baasthan empowers property owners by helping them
          efficiently manage, list and operate their properties through a
          dedicated dashboard - ensuring better occupancy, visibility and
          operational control
        </p>
        <Image src={ListHome} alt="list properties" className="w-1/3 mx-10" />
      </div>
    </div>
  );
}

export default About;
