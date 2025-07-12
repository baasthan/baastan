"use client";
import { Button } from "@workspace/ui/components/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Brand from "./Brand";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={`shadow-sm  sticky top-0 z-50 transition-colors duration-300 bg-white`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8  rounded-lg flex items-center justify-center">
              <Brand />
            </div>
            <p className="text-primary font-bold text-4xl">Baasthan</p>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Properties
            </a>
            <Button variant={"outline"}>List Property</Button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              size={"icon"}
              variant={"accent"}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <a
                href="#"
                className="text-gray-700 hover:text-primary font-medium"
              >
                Properties
              </a>
              <div className="pt-2">
                <button className="w-full border  border-primary text-primary bg-transparent px-4 py-2 rounded-md font-medium transition-colors">
                  List Property
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
