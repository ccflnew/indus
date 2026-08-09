
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaLock,
  FaShieldAlt,
  FaUser,
} from "react-icons/fa";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!username.trim() || !password) {
      setError("Please enter username and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://indus-dxn3.onrender.com/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      console.log("Login response:", data);

      if (!response.ok || !data.success) {
        setError(
          data.message || "Invalid username or password."
        );
        return;
      }

      // Save login status
      localStorage.setItem("adminLoggedIn", "true");

      console.log(
        "Admin logged in:",
        localStorage.getItem("adminLoggedIn")
      );

      // Go to dashboard
      navigate("/admin/dashboard", {
        replace: true,
      });

    } catch (error) {
      console.error("Login error:", error);

      setError(
        "Network error, please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md">

        <div className="mb-6 text-center">

          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#ab183d] shadow-lg">
            <FaShieldAlt className="text-2xl text-white" />
          </div>

          <h1 className="text-2xl font-bold text-gray-800">
            Indus Admin
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Administrator Login
          </p>

        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl sm:p-8">

          <div className="mb-6 text-center">

            <h2 className="text-xl font-bold text-gray-800">
              Admin Login
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Sign in to access the dashboard
            </p>

          </div>

          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Username
              </label>

              <div className="relative">

                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                  placeholder="Enter username"
                  autoComplete="username"
                  disabled={loading}
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#ab183d] focus:bg-white focus:ring-4 focus:ring-[#ab183d]/10 disabled:cursor-not-allowed disabled:opacity-60"
                />

              </div>
            </div>

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Password
              </label>

              <div className="relative">

                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Enter password"
                  autoComplete="current-password"
                  disabled={loading}
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#ab183d] focus:bg-white focus:ring-4 focus:ring-[#ab183d]/10 disabled:cursor-not-allowed disabled:opacity-60"
                />

              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#ab183d] px-4 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#8f1233] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >

              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Signing in...
                </>
              ) : (
                <>
                  <FaLock />
                  Login
                </>
              )}

            </button>

          </form>

        </div>

        <p className="mt-5 text-center text-xs text-gray-400">
          Protected Admin Area
        </p>

      </div>

    </div>
  );
}
