"use client";

import React, { useState } from "react";
import { Input } from "../../../packages/ui/src/components/input";
import { Textarea as ShadcnTextarea } from "../../../packages/ui/src/components/textarea";

export default function Footer() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      // Replace this with your backend API endpoint for sending emails
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("Message sent!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send. Try again later.");
      }
    } catch {
      setStatus("Failed to send. Try again later.");
    }
  };

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
              onSubmit={handleSubmit}
            >
              <h3 className="text-lg font-semibold mb-2">Send us a message</h3>
              <Input
                name="name"
                type="text"
                placeholder="Your Name"
                className="w-full p-2 mb-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
                value={form.name}
                onChange={handleChange}
                required
              />
              <Input
                name="email"
                type="email"
                placeholder="Your Email"
                className="w-full p-2 mb-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
                value={form.email}
                onChange={handleChange}
                required
              />
              <ShadcnTextarea
                name="message"
                placeholder="Your Message"
                className="w-full p-2 mb-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
                rows={3}
                value={form.message}
                onChange={handleChange}
                required
              />
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled={status === "Sending..."}
              >
                {status === "Sending..." ? "Sending..." : "Send"}
              </Button>
              {status && (
                <div className="mt-2 text-center text-sm">{status}</div>
              )}
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
