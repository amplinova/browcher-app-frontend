import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiGrid,
} from "react-icons/fi";

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-white border-r">

      {/* Navigation */}
      <nav className="px-4 py-6 space-y-2">
        <SidebarItem
          to="/"
          icon={<FiHome />}
          label="Dashboard"
        />

        <SidebarItem
          to="/Products"
          icon={<FiUsers />}
          label="Our Products"
        />

        <SidebarItem
          to="/Clients" 
          icon={<FiGrid />}
          label="Our Clients"
        />
      </nav>
    </aside>
  );
};

const SidebarItem = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition
        ${
          isActive
            ? "bg-blue-100 text-blue-700"
            : "text-gray-600 hover:bg-gray-100"
        }`
      }
    >
      <span className="text-lg">{icon}</span>
      {label}
    </NavLink>
  );
};

export default Sidebar;
