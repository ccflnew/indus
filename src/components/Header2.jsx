import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);

  const menus = [
    {
      title: "Card Rewards Point",
      path: "/cards",
    },
    {
      title: "Card Protection Cancellation",
      path: "/cards",
    },
    {
      title: "Card Apply Application",
      path: "/cards",
    },
    {
      title: "Card Block Application",
      path: "/cards",
    },
    {
      title: "Card Limit Increase Application",
      path: "/cards",
    },
    {
      title: "Separate Merged Application",
      path: "/cards",
    },
    {
      title: "Card Activation Application",
      path: "/cards",
    },
  ];

  return (
    <header className="bg-white shadow-sm">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="px-4 py-2 flex items-center">
          <img
            src="/assets/logo.png"
            alt="Logo"
            className="h-12 w-auto"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex flex-1 items-center justify-end">
          {menus.map((menu) => (
            <Link
              key={menu.title}
              to={menu.path}
              className="
                whitespace-nowrap
                px-4
                py-6
                text-[13px]
                font-medium
                text-gray-700
                hover:bg-[#ab183d]
                hover:text-white
                transition
              "
            >
              {menu.title}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden px-4 text-2xl"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <nav className="lg:hidden bg-white border-t">
          {menus.map((menu) => (
            <Link
              key={menu.title}
              to={menu.path}
              onClick={() => setMobileMenu(false)}
              className="
                block
                w-full
                px-5
                py-4
                text-gray-700
                hover:bg-[#ab183d]
                hover:text-white
                transition
              "
            >
              {menu.title}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}