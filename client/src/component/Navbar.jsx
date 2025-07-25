import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="w-full shadow px-5 py-3 bg-gray-200">
      <div className="flex justify-between items-center">
        <h1 className="text-zinc-800 font-bold text-xl">LOGO</h1>

        <div className="sm:hidden">
          <button onClick={toggleMenu} className="text-2xl text-gray-800">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <ul className="hidden sm:flex gap-6 items-center font-medium">
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer">About</li>
          <li className="cursor-pointer">Contact</li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="sm:hidden flex flex-col gap-3 mt-4 font-medium">
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer">About</li>
          <li className="cursor-pointer">Contact</li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
