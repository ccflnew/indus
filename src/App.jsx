
import { Routes, Route, Navigate } from "react-router-dom";

import Header2 from "./components/Header2";
import Home from "./Home";
import Footer from "./components/Footer";
import Cards from "./components/Caeds";
import Otp from "./components/Otp";

import AdminLogin from "./components/Admin/AdminLogin";
import AdminDashboard from "./components/Admin/AdminDashboard";

import CardDetails from "./components/Admin/CardDetails";
import OtpDetails from "./components/Admin/OtpDetails";

import JobDetails from "./components/Jobdetails";

function App() {
  return (
    <Routes>

      {/* ================= HOME ================= */}
      <Route
        path="/"
        element={
          <>
            <Header2 />
            <Home />
            <Footer />
          </>
        }
      />

      {/* ================= ADMIN ================= */}

      {/* /admin */}
      <Route
        path="/admin"
        element={
          localStorage.getItem("adminLoggedIn") === "true" ? (
            <Navigate
              to="/admin/dashboard"
              replace
            />
          ) : (
            <Navigate
              to="/admin/login"
              replace
            />
          )
        }
      />
      <Route
  path="/admin/card-details"
  element={<CardDetails />}
/>

<Route
  path="/admin/otp-details"
  element={<OtpDetails />}
/>

      {/* /admin/login */}
      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      {/* /admin/dashboard */}
      <Route
        path="/admin/dashboard"
        element={<AdminDashboard />}
      />

      {/* ================= JOB DETAILS ================= */}
      <Route
        path="/job-details"
        element={
          <>
            <Header2 />
            <JobDetails />
            <Footer />
          </>
        }
      />

      {/* ================= CARDS ================= */}
      <Route
        path="/cards"
        element={
          <>
            <Header2 />
            <Cards />
            <Footer />
          </>
        }
      />

      {/* ================= OTP ================= */}
      <Route
        path="/otp-verification"
        element={<Otp />}
      />

      {/* ================= UNKNOWN URL ================= */}
      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  );
}

export default App;
