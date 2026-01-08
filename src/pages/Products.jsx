import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Products = () => {
  const [showForm, setShowForm] = useState(false);

  /* ================= PRODUCTS STATE ================= */
  const [products, setProducts] = useState([]);

  /* ================= FORM STATE ================= */
  const [formData, setFormData] = useState({
    logo: null,
    title: "",
    duration: "",
    category: "",
    domain: "",
    link: "",
    description: [""],
    images: [],
    video: null,
    status: "live",
  });

  const [videoPreview, setVideoPreview] = useState(null);

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImagesChange = (e) => {
    setFormData({ ...formData, images: Array.from(e.target.files) });
  };

  const handleLogoChange = (e) => {
    setFormData({ ...formData, logo: e.target.files[0] });
  };

  /* ================= DESCRIPTION HANDLERS ================= */
  const handleDescriptionChange = (index, value) => {
    const updated = [...formData.description];
    updated[index] = value;
    setFormData({ ...formData, description: updated });
  };

  const addDescriptionPoint = () => {
    setFormData({
      ...formData,
      description: [...formData.description, ""],
    });
  };

  const removeDescriptionPoint = (index) => {
    const updated = formData.description.filter((_, i) => i !== index);
    setFormData({ ...formData, description: updated });
  };

  /* ================= VIDEO ================= */
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData({ ...formData, video: file });
    setVideoPreview(URL.createObjectURL(file));
  };

  /* ================= SAVE PRODUCT (LOCAL UI) ================= */
  const handleSave = async () => {
    if (!formData.title || !formData.category) return;

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("duration", formData.duration);
      data.append("category", formData.category);
      data.append("domain", formData.domain);
      data.append("link", formData.link);
      data.append("status", formData.status);

      if (formData.logo) {
        data.append("logo", formData.logo);
      }

      // description bullets
      formData.description.forEach((point) => {
        data.append("description", point);
      });

      // multiple images
      formData.images.forEach((img) => {
        data.append("images", img);
      });

      // video
      if (formData.video) {
        data.append("video", formData.video);
      }

      await api.post("/products/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // ✅ re-fetch products from DB
      const res = await api.get("/products/");
      setProducts(res.data);

      // reset form
      setFormData({
        logo: null,
        title: "",
        duration: "",
        category: "",
        domain: "",
        link: "",
        description: [""],
        images: [],
        video: null,
        status: "live",
      });

      setVideoPreview(null);
      setShowForm(false);

    } catch (error) {
      console.error("Product save failed:", error);
    }
  };


  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    api.get("/products/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Our Products</h2>
        {/* <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Product
        </button> */}
      </div>

      {/* ADD PRODUCT FORM */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow p-6 mb-10">
          <h3 className="text-lg font-semibold mb-4">Add New Product</h3>
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

            {/* DESCRIPTION BULLETS */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Description Points</label>

              {formData.description.map((point, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    value={point}
                    onChange={(e) =>
                      handleDescriptionChange(index, e.target.value)
                    }
                    placeholder={`Point ${index + 1}`}
                    className="flex-1 border rounded px-3 py-2"
                  />
                  {formData.description.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeDescriptionPoint(index)}
                      className="text-red-500"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addDescriptionPoint}
                className="text-blue-600 text-sm"
              >
                + Add point
              </button>
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

            {/* VIDEO UPLOAD */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Video Upload</label>
              <input type="file" accept="video/*" onChange={handleVideoChange} />

              {videoPreview && (
                <video
                  src={videoPreview}
                  controls
                  className="mt-3 w-full h-56 rounded-lg object-cover"
                />
              )}
            </div>

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

          {/* Save */}
          <div className="flex gap-4 mt-6">
            <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">
              Save Product
            </button>
            <button onClick={() => setShowForm(false)} className="border px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p, i) => (
          <ProjectCard key={i} {...p} />
        ))}
      </div>
    </div>
  );
};

/* ================= INPUT ================= */
const Input = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border rounded px-3 py-2"
    />
  </div>
);

/* ================= PROJECT CARD ================= */
const ProjectCard = ({ logo, title, category, domain, status, slug }) => {
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

      <img src={`https://browcherbackend.amplinova.com${logo}`} alt={title} className="h-24 w-auto object-contain mb-4" />

      <h3 className="text-lg font-semibold text-gray-800">
        {title}
      </h3>
      <div className="mt-1 mb-3">
        <p className="text-sm text-gray-500 capitalize">
          {category}
        </p>
        <p className="text-sm text-gray-500 capitalize">
          {domain}
        </p>
      </div>

      <button
        onClick={() => navigate(`/products/${slug}`)}

        className="text-blue-600 text-sm font-medium hover:underline"
      >
        View Project →
      </button>
    </div>
  );
};



export default Products;
