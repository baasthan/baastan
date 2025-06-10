"use client";

import { Button } from "../../../packages/ui/src/components/button";
import { Input } from "../../../packages/ui/src/components/input";
import { Textarea as ShadcnTextarea } from "../../../packages/ui/src/components/textarea";

export default function Footer() {
  return (
    <footer
      className="w-full text-white py-8 mt-12"
      style={{ backgroundColor: "var(--color-primary)" }}
    >
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
              <p className="mb-1">
                Email:{" "}
                <a href="mailto:baasthan@gmail.com" className="underline">
                  baasthan@gmail.com
                </a>
              </p>
              <p>
                Phone:{" "}
                <a href="tel:+1234567890" className="underline">
                  +1 234 567 890
                </a>
              </p>
            </div>
            <form
              className="w-full max-w-sm bg-gray-800 p-4 rounded shadow"
              onSubmit={(e) => e.preventDefault()}
            >
              <h3 className="text-lg font-semibold mb-2">Send us a message</h3>
              <Input
                type="text"
                placeholder="Your Name"
                className="w-full p-2 mb-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
                required
              />
              <Input
                type="email"
                placeholder="Your Email"
                className="w-full p-2 mb-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
                required
              />
              <ShadcnTextarea
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
