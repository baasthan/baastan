'use client';

import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
          <p className="mb-1">Email: <a href="mailto:info@example.com" className="underline">info@example.com</a></p>
          <p>Phone: <a href="tel:+1234567890" className="underline">+1 234 567 890</a></p>
        </div>
        <form className="w-full max-w-sm bg-gray-800 p-4 rounded shadow" onSubmit={e => e.preventDefault()}>
          <h3 className="text-lg font-semibold mb-2">Send us a message</h3>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 mb-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-2 mb-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
            required
          />
          <textarea
            placeholder="Your Message"
            className="w-full p-2 mb-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
            rows={3}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Send
          </button>
        </form>
      </div>
      <div className="text-center text-gray-400 mt-6 text-sm">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  );
}
