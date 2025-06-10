"use client";

import Amenities from "@/components/amenities";
import HomeHero1 from "@/components/home-hero-1";
import HomeHero2 from "@/components/home-hero-2";
import { motion } from "framer-motion";
import { BedDouble, ShieldCheck, Smile } from "lucide-react";

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

function WhyBaasthan() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full px-6 md:px-12 py-12 bg-[#fdfdfd] rounded-xl shadow-sm"
    >
      <div className="max-w-5xl mx-auto text-center space-y-6">
        <motion.h2
          className="text-4xl font-bold text-primary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Why Baasthan?
        </motion.h2>

        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          Baasthan is a trustworthy PG service designed for your comfort and
          peace of mind. We focus on making your stay{" "}
          <span className="font-medium text-primary">safe</span>,{" "}
          <span className="font-medium text-primary">cozy</span>, and{" "}
          <span className="font-medium text-primary">stress-free</span>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
          <motion.div
            className="bg-white border border-gray-200 p-6 rounded-lg shadow hover:shadow-md transition group"
            whileHover={{ scale: 1.03 }}
          >
            <ShieldCheck className="text-primary mb-3 h-8 w-8 mx-auto" />
            <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-500 transition-colors duration-200">
              Secure Living
            </h3>
            <p className="text-sm text-gray-600">
              24/7 surveillance and safety protocols to ensure your protection.
            </p>
          </motion.div>

          <motion.div
            className="bg-white border border-gray-200 p-6 rounded-lg shadow hover:shadow-md transition group"
            whileHover={{ scale: 1.03 }}
          >
            <BedDouble className="text-primary mb-3 h-8 w-8 mx-auto" />
            <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-500 transition-colors duration-200">
              Comfortable Rooms
            </h3>
            <p className="text-sm text-gray-600">
              Spacious, clean rooms with modern amenities tailored for comfort.
            </p>
          </motion.div>

          <motion.div
            className="bg-white border border-gray-200 p-6 rounded-lg shadow hover:shadow-md transition group"
            whileHover={{ scale: 1.03 }}
          >
            <Smile className="text-primary mb-3 h-8 w-8 mx-auto" />
            <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-500 transition-colors duration-200">
              Friendly Staff
            </h3>
            <p className="text-sm text-gray-600">
              Always here to help and ensure you feel at home.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

const services = [
  {
    name: "Wi-Fi",
    description: "High-speed internet available 24/7.",
    icon: "📶",
  },
  {
    name: "Private Balcony",
    description: "Relax with fresh air and a scenic view.",
    icon: "🌇",
  },
  {
    name: "Laundry Service",
    description: "On-site washing and drying available.",
    icon: "🧺",
  },
  {
    name: "Food Delivery",
    description: "Tasty meals delivered to your doorstep.",
    icon: "🍽",
  },
  {
    name: "Hot Water",
    description: "24/7 hot water in all rooms.",
    icon: "♨",
  },
];
