import React from "react";

const services = [
  {
    icon: "/list-home.svg",
    title: "PG Accommodation",
    description:
      "Comfortable and affordable Paying Guest accommodation with all essential amenities for students and professionals.",
  },
  {
    icon: "/smart-home-platform.svg",
    title: "Smart Home Platform",
    description:
      "Integrate and manage your smart home devices seamlessly with our advanced platform.",
  },
  {
    icon: "/digital-home.svg",
    title: "Digital Services",
    description:
      "Explore a range of digital solutions tailored for modern living and convenience.",
  },
];

export default function OurServices() {
  return (
    <section className="w-full bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-gray-100 rounded-lg shadow p-6 flex flex-col items-center"
            >
              <img src={service.icon} alt={service.title} className="w-16 h-16 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-700 text-center">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
