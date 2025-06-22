"use client";

const SHOW_EXPLORE_PAGE = false; // Feature flag for the page
const SHOW_PROPERTY_TABS = false; // Feature flag for property tabs

export default function ExplorePage() {
  if (!SHOW_EXPLORE_PAGE) {
    return (
      <div className="p-6 text-center text-gray-600">
        🚧 Explore Page is currently under development or disabled.
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 sm:p-6 w-full">
      <h1 className="text-3xl font-extrabold mb-4 text-indigo-700">Explore Properties</h1>

      {/* Image Banner */}
      <div className="mb-8 overflow-hidden rounded-lg shadow-md">
        <img
          src="https://i.pinimg.com/736x/56/18/17/56181711649c9a2fa90157c65b2f2f74.jpg"
          alt="Explore Banner"
          className="w-full h-64 object-cover transform hover:scale-105 transition duration-500 ease-in-out"
        />
      </div>

      {/*  post button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="text-sm text-gray-600">📍 Dwarka, Delhi</div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 hover:scale-105 transition-all duration-300">
          Post Property
        </button>
      </div>

      {/* S bar */}
      <input
        type="text"
        placeholder="Search properties..."
        className="w-full border border-gray-300 rounded-md px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      />

      {/* Tabs () */}
      {SHOW_PROPERTY_TABS && (
        <div className="flex gap-4 mb-6">
          <button className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full hover:bg-indigo-200 transition">
            Buy
          </button>
          <button className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full hover:bg-indigo-200 transition">
            Rent
          </button>
          <button className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full hover:bg-indigo-200 transition">
            PG
          </button>
        </div>
      )}

      {/* Property Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            price: "₹2,095 /month",
            location: "Palm Harbor, FL",
            details: "3 🛏 · 2 🛁 · 5.7㎡",
          },
          {
            price: "₹12,000 /month",
            location: "Koramangala, Bangalore",
            details: "2 🛏 · 1 🛁 · 4.2㎡",
          },
          {
            price: "₹8,500 /month",
            location: "Salt Lake City, Kolkata",
            details: "1 🛏 · 1 🛁 · 3.0㎡",
          },
          {
            price: "₹15,000 /month",
            location: "Hinjewadi, Pune",
            details: "2 🛏 · 2 🛁 · 5.0㎡",
          },
          {
            price: "₹10,000 /month",
            location: "Viman Nagar, Pune",
            details: "1 🛏 · 1 🛁 · 3.5㎡",
          },
          {
            price: "₹9,000 /month",
            location: "T. Nagar, Chennai",
            details: "2 🛏 · 1 🛁 · 4.0㎡",
          },
        ].map((card, i) => (
          <div
            key={i}
            className="border rounded-lg p-4 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 bg-white"
          >
            <div className="mb-3 h-40 w-full bg-gray-200 rounded-md"></div>
            <h2 className="font-semibold text-lg text-gray-800 mb-1">{card.price}</h2>
            <p className="text-gray-600 text-sm">{card.location}</p>
            <p className="text-gray-500 text-xs mt-1">{card.details}</p>
            <button className="mt-4 bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600 hover:scale-105 transition-all duration-200">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
