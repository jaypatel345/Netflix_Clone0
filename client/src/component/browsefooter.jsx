import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#141414] text-[#999] px-20 py-10 flex items-center flex-col  relative ">
      {/* Social Icons */}
      <div className="flex space-x-6 text-white text-[19px] mb-6  absolute left-10">
        <FaFacebookF />
        <FaInstagram />
        <FaTwitter />
        <FaYoutube />
      </div>

      {/* Links Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-6 px-5 text-[12px]">
        <p className="hover:text-gray-500 cursor-pointer"> Audio Description</p>
        <p className="hover:text-gray-500 cursor-pointer">Help Centre</p>
        <p className="hover:text-gray-500 cursor-pointer">Gift Cards</p>
        <p className="hover:text-gray-500 cursor-pointer">Media Centre</p>
        <p className="hover:text-gray-500 cursor-pointer">Investor Relations</p>
        <p className="hover:text-gray-500 cursor-pointer">Jobs</p>
        <p className="hover:text-gray-500 cursor-pointer">Terms of Use</p>
        <p className="hover:text-gray-500 cursor-pointer">Privacy</p>
        <p className="hover:text-gray-500 cursor-pointer">Legal Notices</p>
        <p className="hover:text-gray-500 cursor-pointer">Cookie Preferences</p>
        <p className="hover:text-gray-500 cursor-pointer">Corporate Information</p>
        <p className="hover:text-gray-500 cursor-pointer">Contact Us</p>
      </div>

      {/* Service Code Button */}
      <div className="mb-4">
        <button className="border border-[#999] px-4 py-1 text-sm">
          Service Code
        </button>
      </div>

      {/* Copyright */}
      <p className="text-xs">© 1997–2025 Netflix, Inc.</p>
    </footer>
  );
}

export default Footer;