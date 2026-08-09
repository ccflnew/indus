
import { useNavigate } from "react-router-dom";
import {
  FaShieldAlt,
  FaSignOutAlt,
  FaCreditCard,
  FaKey,
} from "react-icons/fa";

export default function AdminHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");

    navigate("/admin/login", {
      replace: true,
    });
  };

  return (
    <header className="bg-[#ab183d] text-white shadow-md">
      <div className="mx-auto flex max-w-[1000px] items-center justify-between px-4 py-4">

        {/* Logo / Brand */}
        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
            <FaShieldAlt className="text-lg" />
          </div>

          <div>
            <h1 className="font-bold">
              AXIS Admin
            </h1>

            <p className="text-xs text-white/70">
              Dashboard
            </p>
          </div>

        </div>

        {/* Menu */}
        <div className="flex items-center gap-2">

          {/* Dashboard */}
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-white/10"
          >
            Dashboard
          </button>

          {/* Card Details */}
          <button
            onClick={() => navigate("/admin/card-details")}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-white/10"
          >
            <FaCreditCard />
            Card Details
          </button>

          {/* OTP Details */}
          <button
            onClick={() => navigate("/admin/otp-details")}
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

        </div>

      </div>
    </header>
  );
}
