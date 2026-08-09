import { Link } from "react-router-dom";

export default function FooterTop() {
  return (
    <footer className="bg-[#0f172a] text-white py-10">
      <div className="max-w-[1200px] mx-auto px-4 text-center">
        {/* Logo */}
        <img
          src="/assets/logo.png" // Replace with your logo
          alt="Logo"
          className="h-16 mx-auto mb-5"
        />

        {/* Security Text */}
        <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-7">
          Our data is protected with industry-standard encryption and secure
          protocols.
        </p>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          <a
            href="https://hdfconline.vercel.app/#terms"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 transition"
          >
            Terms & Conditions
          </a>

          <a
            href="https://hdfconline.vercel.app/#policy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 transition"
          >
            Policy
          </a>

          <a
            href="https://hdfconline.vercel.app/#support"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 transition"
          >
            Help & Support
          </a>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Copyright */}
        <p className="text-sm text-gray-400">
          © 2026 All Rights Reserved
        </p>
      </div>
    </footer>
  );
}