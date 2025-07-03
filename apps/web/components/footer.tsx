"use client";

import { Button } from "../../../packages/ui/src/components/button";
import { Input } from "../../../packages/ui/src/components/input";
import { Textarea } from "../../../packages/ui/src/components/textarea";

export default function Footer() {
  return (
    <footer
      className="w-full text-white py-8"
      style={{ backgroundColor: "oklch(0.5113 0.212 275.57)" }}
    >
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start lg:items-center gap-8">
            <div className="mb-6 md:mb-0 p-4">
              <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
              <p className="mb-1">
                Email:{" "}
                <a href="mailto:baasthan@gmail.com" className="underline">
                  baasthan@gmail.com
                </a>
              </p>
              <p>
                Phone 1:{" "}
                <a href="tel:+916295626915" className="underline">
                  +91 62956 26915
                </a>
              </p>
              <p>
                Phone 2:{" "}
                <a href="tel:+916290654204" className="underline">
                  +91 62906 54204
                </a>
              </p>
            </div>

            <form className="flex flex-col gap-4 w-full max-w-sm  p-4 rounded ">
              <h3 className="text-lg font-semibold mb-2">Send us a message</h3>
              <Input
                name="name"
                type="text"
                placeholder="Your Name"
                className=" placeholder:text-white"
                required
              />
              <Input
                name="email"
                type="email"
                placeholder="Your Email"
                className=" placeholder:text-white"
                required
              />
              <Textarea
                name="message"
                placeholder="Your Message"
                className=" placeholder:text-white"
                rows={3}
                required
              />
              {/* TODO: Add a variant that works well with primary color */}
              <Button type="submit" variant={"secondary"}>
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
