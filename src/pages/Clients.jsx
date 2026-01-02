import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Clients = () => {
  const [showForm, setShowForm] = useState(false);

  /* ================= PRODUCTS STATE ================= */
  const [clients, setClients] = useState([
    {
      logo: "/restaurant.png",
      title: "Bhagayath Bawarchi",
      category: "Restaurant",
      link: "/ourProducts/restaurant",
      status: "live",
    },
    {
      logo: "/client2.jpg",
      title: "TravelGo",
      category: "Travel & Tourism",
      link: "/project/travelgo",
      status: "ongoing",
    },
  ]);

  /* ================= FORM STATE ================= */
  const [formData, setFormData] = useState({
    logo: null,
    title: "",
    duration: "",
    category: "",
    domain: "",
    link: "",
    description: "",
    images: [],          // multiple
    video: "",
    status: "live",
  });

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImagesChange = (e) => {
    setFormData({
      ...formData,
      images: Array.from(e.target.files),
    });
  };

  const handleLogoChange = (e) => {
    setFormData({
      ...formData,
      logo: e.target.files[0],
    });
  };


  /* ================= SAVE PRODUCT ================= */
  const handleSave = () => {
    if (!formData.title || !formData.category) return;

    const imageUrls = formData.images.map((img) =>
      URL.createObjectURL(img)
    );

    const logoUrl = formData.logo
      ? URL.createObjectURL(formData.logo)
      : "";

    setClients([
      ...clients,
      {
        ...formData,
        logo: logoUrl,
        images: imageUrls,
      },
    ]);

    setFormData({
      logo: null,
      title: "",
      duration: "",
      category: "",
      domain: "",
      link: "",
      description: "",
      images: [],
      video: "",
      status: "live",
    });

    setShowForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Our Clients
        </h2>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Product
        </button>
      </div>

      {/* ADD PRODUCT FORM */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow p-6 mb-10">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Add New Product
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <Input label="Product Name" name="title" value={formData.title} onChange={handleChange} />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Logo
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="w-full"
              />

              {/* LOGO PREVIEW */}
              {formData.logo && (
                <img
                  src={URL.createObjectURL(formData.logo)}
                  alt="logo preview"
                  className="h-16 mt-3 object-contain rounded"
                />
              )}
            </div>

            <Input label="Duration" name="duration" value={formData.duration} onChange={handleChange} />
            <Input label="Category" name="category" value={formData.category} onChange={handleChange} />
            <Input label="Domain" name="domain" value={formData.domain} onChange={handleChange} />
            <Input label="Website Link" name="link" value={formData.link} onChange={handleChange} />

            {/* DESCRIPTION (RESPONSIVE) */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* IMAGES (RESPONSIVE FILE INPUT) */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Images
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImagesChange}
                className="w-full"
              />

              {/* IMAGE PREVIEW */}
              {formData.images.length > 0 && (
                <div className="flex gap-3 mt-3 flex-wrap">
                  {formData.images.map((img, i) => (
                    <img
                      key={i}
                      src={URL.createObjectURL(img)}
                      alt="preview"
                      className="h-20 w-20 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* VIDEO */}
            <Input
              label="Video Preview (YouTube URL)"
              name="video"
              value={formData.video}
              onChange={handleChange}
            />

            {/* STATUS */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="live">Live</option>
                <option value="ongoing">Ongoing</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Save Product
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="border px-5 py-2 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {clients.map((client, index) => (
          <ProjectCard key={index} {...client} />
        ))}
      </div>
    </div>
  );
};

/* ================= INPUT COMPONENT ================= */
const Input = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

/* ================= PROJECT CARD ================= */
const ProjectCard = ({ logo, title, category, link, status }) => {
  const navigate = useNavigate();

  const statusStyles = {
    live: "bg-green-100 text-green-700",
    ongoing: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-sm hover:shadow-md transition aspect-square p-5 flex flex-col items-center justify-center text-center">

      <span
        className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-medium ${statusStyles[status]}`}
      >
        {status === "live" ? "Live" : "Ongoing"}
      </span>

      <img src={logo} alt={title} className="h-24 w-auto object-contain mb-4" />

      <h3 className="text-lg font-semibold text-gray-800">
        {title}
      </h3>

      <p className="text-sm text-gray-500 mb-4">
        {category}
      </p>

      <button
        onClick={() => navigate(link)}
        className="text-blue-600 text-sm font-medium hover:underline"
      >
        View Project →
      </button>
    </div>
  );
};

export default Clients;
