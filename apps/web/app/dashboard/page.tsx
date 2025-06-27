"use client";
import { motion } from "framer-motion";
import { FileQuestion } from "lucide-react";

export default function Page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
      <motion.div
        className="bg-white border border-gray-200 p-6 rounded-lg shadow hover:shadow-md transition group"
        whileHover={{ scale: 1.03 }}
      >
        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-500 transition-colors duration-200 ">
          <span className="flex items-center gap-2">
            <FileQuestion />
            Questioniare
          </span>
        </h3>
        <p className="text-sm text-gray-600">
          Create marketing research questioniare
        </p>
      </motion.div>
    </div>
  );
}
