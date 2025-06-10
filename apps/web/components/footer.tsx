'use client';

import React from "react";
import { Input } from "../../../packages/ui/src/components/input";
import { Textarea } from "../../../packages/ui/src/components/textarea";
import { Button } from "../../../packages/ui/src/components/button";

export default function Footer() {
  return (
    <footer
      className="w-full text-white py-8 mt-12"
      style={{ backgroundColor: "oklch(0.5113 0.212 275.57)" }}
    >
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
              <p className="mb-1">
                Email: <a href="mailto:baasthan@gmail.com" className="underline">baasthan@gmail.com</a>
              </p>
              <p>
                Phone 1: <a href="tel:+916295626915" className="underline">+91 62956 26915</a>
              </p>
              <p>
                Phone 2: <a href="tel:+916290654204" className="underline">+91 62906 54204</a>
              </p>
            </div>
            <form className="w-full max-w-sm bg-gray-800 p-4 rounded shadow">
              <h3 className="text-lg font-semibold mb-2">Send us a message</h3>
              <Input
                name="name"
                type="text"
                placeholder="Your Name"
                className="w-full p-2 mb-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
                required
              />
              <Input
                name="email"
                type="email"
                placeholder="Your Email"
                className="w-full p-2 mb-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
                required
              />
              <Textarea
                name="message"
                placeholder="Your Message"
                className="w-full p-2 mb-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
                rows={3}
                required
              />
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Send
              </Button>
            </form>
          </div>
          <div className="text-center text-gray-200 mt-6 text-sm">
            &copy; {new Date().getFullYear()} Baasthan. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
