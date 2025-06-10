"use client";

import { motion } from "framer-motion";

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
  {
    title: "Spacious Rooms",
    description: "Enjoy plenty of space to breathe and relax.",
    emoji: "🛏️",
  },
];

export default function Amenities() {
  return (
    <section className="flex flex-col gap-10 items-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-4xl font-semibold text-primary"
      >
        Our Amenities
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {amenities.map((item, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="group border p-6 bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-transform"
          >
            <div className="flex items-center gap-4 mb-2">
              <motion.span
                className="text-3xl"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {item.emoji}
              </motion.span>
              <h3 className="text-xl font-bold group-hover:text-blue-500 transition-colors duration-200">
                {item.title}
              </h3>
            </div>
            <p className="text-sm text-gray-600 transition-all duration-300 group-hover:opacity-90 group-hover:-translate-y-1">
              {item.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
