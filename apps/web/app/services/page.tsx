const services = [
  {
    name: "Free Wi-Fi",
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
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      {/* Hero Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-purple-700">
          Everything You Need
        </h1>
        <p className="text-gray-600 mt-2">
          Our amenities are designed to make your stay convenient and cozy.
        </p>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition"
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h2 className="text-xl font-semibold">{service.name}</h2>
            <p className="text-gray-600 mt-2">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
