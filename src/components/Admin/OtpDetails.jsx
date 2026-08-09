
import { useEffect, useState } from "react";
import AdminHeader from "../Admin/AdminHeader";
import {
  FaKey,
  FaSyncAlt,
  FaMobileAlt,
} from "react-icons/fa";

export default function OtpDetails() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOtpRecords = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://axis-nyie.onrender.com/api/otp"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load OTP records"
        );
      }

      setRecords(
        data.records ||
        data.otps ||
        data ||
        []
      );
    } catch (err) {
      console.error("OTP records error:", err);
      setError("Unable to load OTP records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOtpRecords();
  }, []);

  const maskMobile = (mobile) => {
    if (!mobile) return "—";

    const value = String(mobile);

    if (value.length <= 4) {
      return "••••";
    }

    return value;
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Admin Header */}
      <AdminHeader />

      {/* Content */}
      <main className="mx-auto max-w-[1100px] px-4 py-8">

        {/* Title + Refresh */}
        <div className="mb-6 flex items-center justify-between">

          {/* Left */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              OTP Records
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Total records: {records.length}
            </p>
          </div>

          {/* Right */}
          <button
            onClick={fetchOtpRecords}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-[#ab183d] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#8f1434] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaSyncAlt
              className={loading ? "animate-spin" : ""}
            />

            {loading ? "Refreshing..." : "Refresh"}
          </button>

        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow">

            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#ab183d]" />

            <p className="mt-4 text-sm text-gray-500">
              Loading OTP records...
            </p>

          </div>
        ) : records.length === 0 ? (
          /* Empty */
          <div className="rounded-2xl bg-white p-10 text-center shadow">

            <FaKey className="mx-auto text-4xl text-gray-300" />

            <p className="mt-4 font-medium text-gray-700">
              No OTP records found
            </p>

          </div>
        ) : (
          /* Table */
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow">

            <div className="overflow-x-auto">

              <table className="w-full min-w-[750px]">

                <thead className="bg-gray-50">

                  <tr className="border-b border-gray-200">

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                      Mobile
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                      OTP
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                      Created
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {records.map((record) => (

                    <tr
                      key={record._id}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                    >

                      {/* Mobile */}
                      <td className="px-5 py-4">

                        <div className="flex items-center gap-2">

                          <FaMobileAlt className="text-gray-400" />

                          <span className="font-mono text-sm text-gray-700">
                            {maskMobile(record.mobile)}
                          </span>

                        </div>

                      </td>

                      {/* OTP */}
                      <td className="px-5 py-4">

                        <span className="font-mono text-sm text-gray-400">
                         {maskMobile(record.otp)}
                        </span>

                      </td>

                      {/* Created */}
                      <td className="px-5 py-4">

                        <span className="text-sm text-gray-600">
                          {formatDate(record.createdAt)}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>
        )}

      </main>

    </div>
  );
}
