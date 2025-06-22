// apps/web/components/Header.tsx

import { useState } from "react";
import { Menu, ChevronDown } from "lucide-react";

const Header = () => {
  const [location, setLocation] = useState("Dwarka, Delhi");

  const locations = [
    "Dwarka, Delhi",
    "Blue Apartment, Solo",
    "Palm Harbor, FL",
    "Brigade Road, Bangalore",
  ];

  return (
    <header className="w-full shadow-sm border-b px-4 py-3 flex justify-between items-center bg-white">
      {/* Left: Logo + Hamburger */}
      <div className="flex items-center gap-3">
        <button className="lg:hidden">
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
        <span className="text-2xl font-bold text-indigo-600">🏠 Baasthan</span>
      </div>

      {/* Center: Location selector */}
      <div className="relative hidden md:flex items-center gap-1">
        <span className="text-sm text-gray-700">{location}</span>
        <ChevronDown className="w-4 h-4" />
        <select
          className="absolute top-full mt-1 left-0 bg-white shadow-lg rounded-md border text-sm p-1 hidden group-hover:block"
          onChange={(e) => setLocation(e.target.value)}
        >
          {locations.map((loc, idx) => (
            <option key={idx} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Right: Post Property */}
      <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition">
        Post Property
      </button>
    </header>
  );
};

export default Header;
