import HomeHero1 from "@/components/home-hero-1";
import HomeHero2 from "@/components/home-hero-2";

export default function Page() {
  return (
    <>
      <HomeHero1 />
      <HomeHero2 />
      {/* Amenities Card - Bottom Right */}
      <div className="fixed bottom-6 right-6 w-80 p-6 bg-white border border-black rounded-lg shadow-md z-50 transition-transform duration-700 ease-out hover:-translate-y-1 hover:shadow-lg">
        <h2 className="text-2xl font-bold text-black mb-4 text-center">
          🔍 Our Amenities
        </h2>
        <ul className="space-y-4">
          {services.map((service, index) => (
            <li key={index} className="flex items-start space-x-3 group">
              <span
                className="text-2xl transition-transform duration-300 ease-in-out group-hover:scale-125 group-hover:-translate-y-1"
                style={{ display: "inline-block" }}
              >
                {service.icon}
              </span>
              <div>
                <h3 className="text-lg font-semibold text-black">
                  {service.name}
                </h3>
                <p className="text-sm text-black">{service.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* Why Baasthan - Bottom Left */}
      <div className="fixed bottom-6 left-6 w-80 p-6 bg-white border border-black rounded-lg shadow-md z-50 transition-transform duration-700 ease-out hover:-translate-y-1 hover:shadow-lg">
        <h2 className="text-2xl font-bold text-black mb-2 flex items-center gap-2">
          Why Baasthan? <span className="text-2xl">❓</span>
        </h2>
        <p className="text-sm text-black leading-relaxed">
          Baasthan is a trustworthy PG service that ensures safety, comfort, and
          reliability for all its residents. We keep your peace of mind as our
          top priority.
        </p>
      </div>
    </>
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
    icon: "🍽️",
  },
  {
    name: "Hot Water",
    description: "24/7 hot water in all rooms.",
    icon: "♨️",
  },
];
