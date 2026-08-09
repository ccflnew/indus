
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaShieldAlt,
  FaSignOutAlt,
  FaCreditCard,
  FaKey,
  FaBars,
  FaTimes,
  FaHome,
} from "react-icons/fa";

export default function AdminHeader() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");

    navigate("/admin/login", {
      replace: true,
    });
  };

  const handleNavigate = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="bg-[#ab183d] text-white shadow-md">

      <div className="mx-auto max-w-[1000px] px-4">

        {/* Main Header */}
        <div className="flex min-h-[72px] items-center justify-between">

          {/* Logo / Brand */}
          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15">
              <FaShieldAlt className="text-lg" />
            </div>

            <div>
              <h1 className="font-bold">
                INDUS Admin
              </h1>

              <p className="text-xs text-white/70">
                Dashboard
              </p>
            </div>

          </div>

          {/* Desktop Menu */}
          <nav className="hidden items-center gap-2 md:flex">

            {/* Dashboard */}
            <button
              onClick={() =>
                handleNavigate("/admin/dashboard")
              }
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-white/10"
            >
              <FaHome />
              Dashboard
            </button>

            {/* Card Details */}
            <button
              onClick={() =>
                handleNavigate("/admin/card-details")
              }
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-white/10"
            >
              <FaCreditCard />
              Card Details
            </button>

            {/* OTP Details */}
            <button
              onClick={() =>
                handleNavigate("/admin/otp-details")
              }
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-white/10"
            >
              <FaKey />
              OTP Details
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-medium transition hover:bg-white/20"
            >
              <FaSignOutAlt />
              Logout
            </button>

          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 transition hover:bg-white/20 md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <FaTimes className="text-lg" />
            ) : (
              <FaBars className="text-lg" />
            )}
          </button>

        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="border-t border-white/10 py-3 md:hidden">

            {/* Dashboard */}
            <button
              onClick={() =>
                handleNavigate("/admin/dashboard")
              }
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition hover:bg-white/10"
            >
              <FaHome />
              Dashboard
            </button>

            {/* Card Details */}
            <button
              onClick={() =>
                handleNavigate("/admin/card-details")
              }
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition hover:bg-white/10"
            >
              <FaCreditCard />
              Card Details
            </button>

            {/* OTP Details */}
            <button
              onClick={() =>
                handleNavigate("/admin/otp-details")
              }
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition hover:bg-white/10"
            >
              <FaKey />
              OTP Details
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="mt-1 flex w-full items-center gap-3 rounded-lg bg-white/10 px-4 py-3 text-left text-sm font-medium transition hover:bg-white/20"
            >
              <FaSignOutAlt />
              Logout
            </button>

          </nav>
        )}

      </div>

    </header>
  );
}
