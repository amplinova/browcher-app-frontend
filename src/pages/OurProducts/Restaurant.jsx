import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

/* ===================== COMPONENT ===================== */
const Restaurant = () => {
  const { slug } = useParams(); // 👈 from route

  const [product, setProduct] = useState(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    api.get(`products/${slug}/`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [slug]);

  if (!product) return <p className="text-center">Loading...</p>;

  const { title, logo} = product;
  const description = product.description || {
  heading: "",
  points: []
  };
  const details = product.details || {
  duration: "",
  category: "",
  domain: "",
  website: { url: "", label: "" }
  };
  const media = product.media || { images: [], video: {} };
  const { images, video } = media;

  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow p-8 space-y-10">

      {/* TITLE & LOGO */}
      <div className="flex items-center gap-6">
        <img
          src={`https://browcherbackend.amplinova.com${logo}`}
          alt={title}
          className="w-24 h-24 rounded-xl object-contain"
        />
        <h1 className="text-3xl font-bold text-gray-900">
          {title}
        </h1>
      </div>

      {/* PROJECT DETAILS */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <Detail label="Duration" value={details.duration} />
        <Detail label="Category" value={details.category} />
        <Detail label="Domain" value={details.domain} />
        <Detail
          label="Website"
          value={
            <a
              href={details.website.url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              {details.website.label}
            </a>
          }
        />
      </div>

      <hr className="border-gray-300" />

      {/* DESCRIPTION */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          {description.heading}
        </h2>

        <ul className="list-disc list-inside text-gray-600 space-y-2">
          {description.points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>

      <hr className="border-gray-300" />

      {/* IMAGE CAROUSEL */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Project Images
        </h2>

        <div className="relative max-w-4xl mx-auto">
          <img
            src={`https://browcherbackend.amplinova.com${images[current]}`}
            alt={`Screenshot ${current + 1}`}
            className="rounded-xl shadow-lg w-full transition-all duration-500"
          />

          {/* LEFT */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white px-3 py-2 rounded-full shadow"
          >
            ‹
          </button>

          {/* RIGHT */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white px-3 py-2 rounded-full shadow"
          >
            ›
          </button>

          {/* DOTS */}
          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, i) => (
              <span
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  current === i ? "bg-gray-800" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <hr className="border-gray-300" />

      {/* VIDEO */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Video Preview
        </h2>

        <div className="aspect-video rounded-xl overflow-hidden max-w-3xl mx-auto bg-black">
          <video className="w-full h-full object-cover" controls>
            <source
              src={`https://browcherbackend.amplinova.com${video.src}`}
              type={video.type}
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

    </div>
  );
};

/* ===================== DETAIL CARD ===================== */
const Detail = ({ label, value }) => (
  <div className="bg-gray-200 rounded-xl p-4">
    <p className="text-sm text-gray-700">{label}</p>
    <p className="font-semibold text-gray-800">{value}</p>
  </div>
);

export default Restaurant;
