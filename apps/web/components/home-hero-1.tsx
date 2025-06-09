"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";
import HomeChill from "../public/home_chill.svg";
import Logo from "../public/logo.svg";

gsap.registerPlugin(ScrollTrigger);

const HomeHero1 = () => {
  const sectionRef = useRef(null);
  useGSAP(
    () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 30%",
          end: "bottom 90%",
        },
      });
      timeline
        .from("#hero_section_1_logo", { opacity: 0, scale: 5 })
        .from("#hero_section_1_text_heading", {
          opacity: 0,
          translateX: -100,
          scaleX: 0,
        })
        .from("#hero_section_1_text_subheading", {
          opacity: 0,
          translateY: 100,
        })
        .from("#hero_section_1_image", { opacity: 0 });
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      className="flex flex-col items-center justify-center gap-10 min-h-[calc(100svh-3.5rem)]"
      ref={sectionRef}
      id="hero-1"
    >
      <div className="flex flex-col gap-2" id="hero_section_1_text">
        <div className="flex flex-row items-center justify-center gap-2">
          <Image
            src={Logo}
            alt="Baasthan Logo"
            className="h-10 w-auto"
            id="hero_section_1_logo"
          />
          <h1
            className="text-4xl font-semibold text-primary"
            id="hero_section_1_text_heading"
          >
            Baasthan
          </h1>
        </div>
        <h3 className="text-2xl" id="hero_section_1_text_subheading">
          Your smart housing platform
        </h3>
      </div>

      <Image
        id="hero_section_1_image"
        src={HomeChill}
        alt="Baasthan a safe heaven"
        className="w-1/3"
      />
    </section>
  );
};

export default HomeHero1;
