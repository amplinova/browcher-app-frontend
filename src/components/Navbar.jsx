import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white">
      <div className="px-6 py-4 flex justify-between items-center w-full">
        
        {/* Logo + Company Name */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Company Logo"
            className="h-12 w-auto object-contain"
          />
          <span className="text-xl font-bold text-gray-800">
            Amplinova's Broucher
          </span>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Admin
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
