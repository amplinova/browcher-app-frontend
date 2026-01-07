import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="h-20 px-6 flex justify-between items-center w-full">

        {/* Logo + Company Name */}
        <div className="flex items-center gap-3">
          <img
            src="/final.png"
            alt="Company Logo"
            className="h-16 w-auto object-contain"
          />
        </div>

      
        {/* Right actions
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
        >
          Admin
        </button>
       */}
          
      </div>
    </nav>
  );
};

export default Navbar;
