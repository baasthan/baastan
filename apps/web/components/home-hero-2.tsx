"use client";

import {
  Card,
  CardDescription,
  CardHeader,
} from "@workspace/ui/components/card";
import gsap from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HousePlus } from "lucide-react";
import Image from "next/image";
import Hero2Apartments from "../public/hero_2_apartments.svg";
import Hero2Professional from "../public/hero_2_professional.svg";
import Hero2Searching from "../public/hero_2_searching.svg";
gsap.registerPlugin(ScrollTrigger);

const HomeHero2 = () => {
  return (
    <section
      className="flex flex-col items-center justify-center gap-10"
      id="hero-2"
    >
      <div className="flex flex-row gap-2">
        <HousePlus id="hero_section_2_logo" className="size-10 text-primary" />
        <h1 className="flex flex-row items-center gap-2 text-4xl font-semibold text-primary">
          What We Offer
        </h1>
      </div>
      <div
        className="flex flex-col lg:flex-row gap-10 "
        id="hero_section_2_content"
      >
        <Card>
          <CardHeader>
            <h3 className="text-2xl font-semibold text-center">
              Verified PGs for students & professionals
            </h3>
          </CardHeader>
          <CardDescription>
            <Image
              src={Hero2Professional}
              alt="Paying guest for students and professionals"
              className=" aspect-square max-w-xs"
            />
          </CardDescription>
        </Card>
        <Card className="hero_section_2_content_service">
          <CardHeader>
            <h3 className="text-2xl font-semibold text-center">
              Affordable apartment rentals
            </h3>
          </CardHeader>
          <CardDescription>
            <Image
              src={Hero2Apartments}
              alt="Affordable apart,emts"
              className=" aspect-square max-w-xs"
            />
          </CardDescription>
        </Card>
        <Card className="hero_section_2_content_service">
          <CardHeader>
            <h3 className="text-2xl font-semibold text-center">
              Smart listings with real-time availability
            </h3>
          </CardHeader>
          <CardDescription>
            <Image
              src={Hero2Searching}
              alt="Affordable apart,emts"
              className=" aspect-square max-w-xs"
            />
          </CardDescription>
        </Card>
      </div>
    </section>
  );
};

export default HomeHero2;
