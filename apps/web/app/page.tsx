"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Amenities from "@/components/amenities";
import HomeHero1 from "@/components/home-hero-1";
import HomeHero2 from "@/components/home-hero-2";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  BedDouble,
  Smile,
  Home,
  ShoppingBag,
  MessageCircle,
  Star,
  Share2,
  Settings,
} from "lucide-react";

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Hamburger Button (top-left) */}
      <button
        onClick={() => setMenuOpen(true)}
        className="absolute top-4 left-4 z-50 text-2xl px-3 py-1 rounded-md focus:outline-none hover:bg-gray-200"
      >
        ☰
      </button>

      {/* Sidebar Drawer (left-side) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md z-40 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-bold text-lg">Baasthan</span>
          <button onClick={() => setMenuOpen(false)} className="text-xl font-semibold">
            ×
          </button>
        </div>
        <ul className="flex flex-col p-4 space-y-4 text-sm">
          <SidebarItem icon={<Home className="h-4 w-4" />} label="Home" />
          <SidebarItem icon={<ShoppingBag className="h-4 w-4" />} label="Properties for Buy" />
          <SidebarItem icon={<ShoppingBag className="h-4 w-4" />} label="Properties for Rent" />
          <SidebarItem icon={<MessageCircle className="h-4 w-4" />} label="Feedback" />
          <SidebarItem icon={<Star className="h-4 w-4" />} label="Rate Us" />
          <SidebarItem icon={<Share2 className="h-4 w-4" />} label="Share" />
          <SidebarItem icon={<Settings className="h-4 w-4" />} label="Settings" />
        </ul>
      </div>

      {/* Hero Section */}
      <HomeHero1 />

      {/* Main Content */}
      <div className="flex flex-col gap-16 px-6 md:px-12 py-12">
        <WhyBaasthan />
        <TrustBar />
        <HomeHero2 />
        <Amenities />
        <CallToAction />
      </div>
    </div>
  );
}

function SidebarItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <li className="flex items-center gap-3 px-2 py-2 hover:bg-gray-100 cursor-pointer rounded-md">
      <span>{icon}</span>
      <span>{label}</span>
    </li>
  );
}

function WhyBaasthan() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full bg-[#fdfdfd] rounded-xl shadow-sm py-12"
    >
      <div className="max-w-5xl mx-auto text-center space-y-6">
        <motion.h2 className="text-4xl font-bold text-indigo-600">
          Why Baasthan?
        </motion.h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          Baasthan is a trustworthy PG service designed for your comfort and peace of mind. We focus on making your stay{" "}
          <span className="font-medium text-indigo-600">safe</span>,{" "}
          <span className="font-medium text-indigo-600">cozy</span>, and{" "}
          <span className="font-medium text-indigo-600">stress-free</span>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
          <FeatureCard
            icon={<ShieldCheck className="text-indigo-600 mb-3 h-8 w-8 mx-auto" />}
            title="Secure Living"
            description="24/7 surveillance and safety protocols to ensure your protection."
          />
          <FeatureCard
            icon={<BedDouble className="text-indigo-600 mb-3 h-8 w-8 mx-auto" />}
            title="Comfortable Rooms"
            description="Spacious, clean rooms with modern amenities tailored for comfort."
          />
          <FeatureCard
            icon={<Smile className="text-indigo-600 mb-3 h-8 w-8 mx-auto" />}
            title="Friendly Staff"
            description="Always here to help and ensure you feel at home."
          />
        </div>
      </div>
    </motion.section>
  );
}

function TrustBar() {
  return (
    <section className="bg-white border border-gray-200 py-6 rounded-lg shadow-sm text-center">
      <p className="text-gray-600 text-sm">
        Trusted by <span className="text-indigo-600 font-semibold">20,000+</span> students across India’s top cities
      </p>
    </section>
  );
}

function CallToAction() {
  const router = useRouter();
  return (
    <section className="bg-indigo-600 text-white py-10 px-6 rounded-xl text-center mt-6">
      <h4 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Stay?</h4>
      <p className="text-sm mb-6">Explore locations, book rooms, and experience the easiest way to live comfortably.</p>
      <button
        onClick={() => router.push("/explore")}
        className="bg-white text-indigo-600 font-semibold px-6 py-2 rounded-md hover:bg-gray-100 transition"
      >
        Get Started
      </button>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      className="bg-white border border-gray-200 p-6 rounded-lg shadow hover:shadow-md transition group"
      whileHover={{ scale: 1.03 }}
    >
      {icon}
      <h3 className="text-xl font-semibold mt-3 group-hover:text-indigo-600 transition-colors duration-200">
        {title}
      </h3>
      <p className="text-sm text-gray-600 mt-2">{description}</p>
    </motion.div>
  );
}
