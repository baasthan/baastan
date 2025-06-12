"use client";

const amenities = [
  {
    title: "Wi-Fi",
    description: "High-speed internet available 24/7.",
    emoji: "📶",
  },
  {
    title: "Private Balcony",
    description: "Relax with fresh air and a scenic view.",
    emoji: "🌇",
  },
  {
    title: "Laundry Service",
    description: "On-site washing and drying available.",
    emoji: "🧺",
  },
  {
    title: "Food Delivery",
    description: "Tasty meals delivered to your doorstep.",
    emoji: "🍽️",
  },
  {
    title: "Hot Water",
    description: "24/7 hot water in all rooms.",
    emoji: "♨️",
  },
];

export default function Amenities() {
  return (
    <section className=" flex flex-col gap-10 items-center">
      <h2 className="text-4xl font-semibold text-primary">Our Amenities</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-3">
        {amenities.map((item, index) => (
          <div
            key={index}
            className="border rounded-md p-3 shadow hover:shadow-md transition"
          >
            <div className="flex flex-row gap-4 items-center">
              <span
                className="text-2xl transition-transform duration-300 ease-in-out group-hover:scale-125 group-hover:-translate-y-1"
                style={{ display: "inline-block" }}
              >
                {item.emoji}
              </span>
              <div className="text-2xl font-semibold">{item.title}</div>
            </div>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
