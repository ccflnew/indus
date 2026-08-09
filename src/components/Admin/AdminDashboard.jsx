
import AdminHeader from "../Admin/AdminHeader";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <AdminHeader />

      {/* Dashboard */}
      <main className="mx-auto max-w-[1000px] px-4 py-8">

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow">

          <h2 className="text-2xl font-bold text-gray-800">
            Admin Dashboard
          </h2>

          <p className="mt-2 text-gray-500">
            Welcome! You are successfully logged in.
          </p>

          <div className="mt-6 rounded-xl bg-green-50 p-4 text-sm text-green-700">
            Admin login successful.
          </div>

        </div>

      </main>

    </div>
  );
}
