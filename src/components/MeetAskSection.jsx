import {
  FaShieldAlt,
  FaChartLine,
  FaGift,
  FaLock,
  FaCreditCard,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function JobHighlightSection() {
  const cards = [
    {
      icon: <FaShieldAlt />,
      title: "Card Protection",
      description: "Keep your card safe from unauthorized usage and fraud.",
      button: "Activate / Deactivate",
      color: "bg-blue-600",
      link: "/cards",
    },
    {
      icon: <FaChartLine />,
      title: "Limit Increase",
      description: "Easily request an increase in your card spending limit.",
      button: "Request Limit",
      color: "bg-green-600",
      link: "/cards",
    },
    {
      icon: <FaGift />,
      title: "Redeem Points",
      description: "Redeem your reward points easily.",
      button: "Redeem Now",
      color: "bg-orange-500",
      link: "/cards",
    },
    {
      icon: <FaLock />,
      title: "Card Block Or Unblock",
      description: "Block or unblock your card instantly.",
      button: "Block / Unblock Card",
      color: "bg-red-600",
      link: "/cards",
    },
    {
      icon: <FaCreditCard />,
      title: "Card Activation",
      description: "Activate your new card quickly.",
      button: "Activate Card",
      color: "bg-purple-600",
      link: "/cards",
    },
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {cards.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 text-center"
            >
              <div
                className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mx-auto text-white text-3xl mb-4`}
              >
                {item.icon}
              </div>

              <h3 className="text-lg font-bold text-gray-800 mb-3">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 mb-5 min-h-[60px]">
                {item.description}
              </p>

              <Link
                to={item.link}
                className="block w-full bg-[#9c3a3b] hover:bg-red-800 text-white font-semibold py-2.5 rounded-lg transition"
              >
                {item.button}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}