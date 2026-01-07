import { useEffect, useState } from "react";
import { FiUsers, FiBox, FiLayers, FiCpu, FiTrendingUp } from "react-icons/fi";
import api from "../api/axios";

const Dashboard = () => {

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("dashboard/");
        setDashboard(res.data);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-gray-600">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-300 p-6 space-y-10">

      {/* DASHBOARD TITLE */}
      <h1 className="text-2xl font-bold text-gray-900">
        Dashboard
      </h1>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
        <StatCard
          title="No of Clients"
          value={dashboard?.clients ?? 0}
          color="blue"
          icon={<FiUsers />}
        />
        <StatCard
          title="No of Products"
          value={dashboard?.products ?? 0}
          color="green"
          icon={<FiBox />}
        />
        <StatCard
          title="Ongoing Projects"
          value={dashboard?.ongoing_projects ?? 0}
          color="purple"
          icon={<FiLayers />}
        />
      </div>

      {/* OUR TEAM TITLE */}
      <h1 className="text-2xl font-bold text-gray-900">
        Our Team
      </h1>

      {/* OUR TEAM SECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
        <StatCard
          title="IT"
          value={dashboard?.team?.it ?? 0}
          color="indigo"
          icon={<FiCpu />}
        />
        <StatCard
          title="Digital Marketing"
          value={dashboard?.team?.digital_marketing ?? 0}
          color="purple"
          icon={<FiTrendingUp />}
        />
        <StatCard
          title="Sales"
          value={dashboard?.team?.sales ?? 0}
          color="amber"
          icon={<FiUsers />}
        />
      </div>

    </div>
  );
};


/* ================= REUSABLE CARD ================= */
const StatCard = ({ title, value, icon, color }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    indigo: "bg-indigo-100 text-indigo-600",
    purple: "bg-purple-100 text-purple-600",
    amber: "bg-amber-100 text-amber-600",
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col items-center gap-4">
      {icon && (
        <div className={`${colors[color]} p-5 rounded-2xl text-2xl`}>
          {icon}
        </div>
      )}
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-4xl font-bold text-gray-900">{value}</h2>
    </div>
  );
};

export default Dashboard;
