'use client';
import React from 'react';

const amenities = [
  { title: 'Wi-Fi', description: 'High-speed internet available 24/7.', emoji: '📶' },
  { title: 'Private Balcony', description: 'Relax with fresh air and a scenic view.', emoji: '🌇' },
  { title: 'Laundry Service', description: 'On-site washing and drying available.', emoji: '🧺' },
  { title: 'Food Delivery', description: 'Tasty meals delivered to your doorstep.', emoji: '🍽️' },
  { title: 'Hot Water', description: '24/7 hot water in all rooms.', emoji: '♨️' },
];

export default function Amenities() {
  return (
    <div className="fixed bottom-6 right-6 bg-white border rounded-xl shadow-lg p-4 w-80 z-50">
      <h2 className="text-lg font-bold mb-4 text-center">Our Amenities</h2>
      <div className="grid grid-cols-1 gap-3">
        {amenities.map((item, index) => (
          <div key={index} className="border rounded-md p-3 shadow hover:shadow-md transition">
            <div className="text-xl">{item.emoji}</div>
            <div className="font-semibold">{item.title}</div>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
